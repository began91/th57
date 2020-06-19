import React from 'react';
//import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { setValue } from '../actions/Actions';
import './Results.css';
import { getAcftById, getHeaviestAndMostForward } from '../helpers/lists';
import ResultRow from './ResultRow';
import InputRow from './InputRow';

let fuelMoment = fuel => {
    let cg=[110.3,110.7,110.8,110.8,110.8,110.8,110.9,111.5,112.8,113.8,114.6,115.3,115.9,116.4,116.9,117.2,117.6,117.9,118.0];
    let moment;
    if (fuel>90*6.7) {
        return Math.round(fuel*118.0)/100;
    }
    if (fuel<=5*6.7) {
        return Math.round(fuel*110.3)/100;
    }
    cg.forEach((arm, i, cgArr) => {
        let lowerFuel = 33.5*(i+1);
        if (fuel >= lowerFuel && fuel < lowerFuel+33.5) {
            //interpolate between cg values
            moment = fuel * (arm + (cg[i+1]-arm) * (fuel-lowerFuel) / (33.5))
        }
    })
    return Math.round(moment)/100;
};

let cgHighLimit = (weight, series) => {
    if (weight > 3200) {
        return Math.round((weight*-4/1000 + 124.2)*10)/10;
    } else if (weight > 2900) {
        return Math.round((weight*-11/3000 + 1847/15)*10)/10;
    } else if (weight > 2450 && series==='C') {
        return 112.5;
    } else if (weight > 2000 && series==='C') {
        return Math.round((weight/300 + 313/3)*10)/10;
    } else if (weight > 2350 && series==='B') {
        return Math.round((weight*-17/5500 + 13361/110)*10)/10;
    } else if (weight > 2000 && series==='B') {
        return 114.2;
    }
}

class Results extends React.Component {
    constructor(props) {
        super(props);

        const fnsToBind = ['powerCalcs','handleFuelChange','handleOtherFuel','handleExtOps','handleInput','handleMaxExtFuel'];
        fnsToBind.forEach(fn => this[fn] = this[fn].bind(this));
    }

    powerCalcs() {
        let aircraft = getAcftById(this.props.aircraftID);
        let pax = Number(this.props.pax);
        let paxExternal = Number(this.props.paxExternal);
        let extLoad = this.props.extLoad;
        let extFuel = this.props.extFuelGal*6.7;
        let baggage = Number(this.props.baggage);
        let fuel = Math.round(this.props.fuelGal * 6.7 *10)/10;
        let crewFwd = Number(this.props.instWt) + Number(this.props.studWt);
        let da = this.props.da;
        let heavWt, fwdWt, basicMoment;

        if (aircraft.side !== 'unk') {
            heavWt = aircraft.weight;
            fwdWt = aircraft.weight;
            basicMoment = aircraft.moment;
        } else {
            [heavWt, fwdWt, basicMoment] = getHeaviestAndMostForward(aircraft.series)
        }
        
        let paxArm = 1.04;
        let bagArm = 1.48;

        //Operating Weight/Moment
        let heavOpWt = heavWt + crewFwd + 12;
        let fwdOpWt = fwdWt + crewFwd + 12;
        let opMoment = Math.round((basicMoment + crewFwd * 0.65 + 22)*100)/100;
        
        //Takeoff Weight/Moment
        let heavGW = Math.round((heavOpWt + fuel + pax + baggage)*10)/10;
        let fwdGW = Math.round((fwdOpWt + fuel + pax + baggage)*10)/10;
        let takeoffMoment = Math.round((opMoment + fuelMoment(fuel) + pax * paxArm + baggage * bagArm)*100)/100;
        let takeoffArm = Math.round( takeoffMoment / fwdGW * 1000)/10;
        let maxFuel = Math.min(Math.floor((3200 - heavOpWt - pax - baggage) / 6.7), 91);

        //Externals
        let extGW = Math.round((fwdOpWt + extFuel + paxExternal + extLoad)*10)/10;
        let extMoment = Math.round((opMoment + fuelMoment(extFuel) + paxExternal * paxArm + extLoad*1.071)*100)/100;
        let extArm = Math.round(extMoment / extGW * 1000)/10;
        let maxFuelExt = Math.min(
            Math.floor((3350 - fwdOpWt - paxExternal - extLoad) / 6.7), 
            Math.floor((3200 - fwdOpWt - paxExternal) / 6.7 ),
            91);

        //Landing Weight/Moment
        let lndWt = fwdOpWt + 67 + pax + baggage;
        let lndMoment = Math.round((opMoment + 74.17 + pax * paxArm + baggage * bagArm)*100)/100;
        let lndArm = Math.round(lndMoment / lndWt * 1000)/10;

        let highGW, maxTakeoffArm, heavier;

        if (this.props.extOps) {
            highGW = heavGW > extGW ? heavGW : extGW;
            maxTakeoffArm = takeoffArm > extArm ? takeoffArm : extArm;
            heavier = heavGW > extGW ? '1' : '2';
        } else {
            highGW = heavGW;
            maxTakeoffArm = takeoffArm;
            heavier = '1';
        }

        let cgLow = aircraft.series==='B' ? '106.00' : '106.75';
        let cgHighTakeoff = cgHighLimit(highGW, aircraft.series);
        let cgHighLand = cgHighLimit(lndWt, aircraft.series);
        let fuelAt2900 = Math.round((2900 - heavGW + fuel + pax + baggage) / 6.7);
        //HIGE/HOGE Derivation
        //HOGE = (ma*GW+ba)*DA^2 + (mb*GW+bb)*DA + (mc*GW+bc)
        let ma = 0.921;
        let ba = 0.2397;
        let mb = 6.5021;
        let bb = -12.079;
        let mc = 35.613;
        let bc = -20.242;
        let smallDA = Number(this.props.da) / 10000;
        let smallGW = highGW / 1000;

        let hoge = Math.round((ma * smallGW + ba) * Math.pow(smallDA, 2) + (mb * smallGW + bb) * smallDA +  (mc * smallGW + bc));
        let hige = Math.round(0.9055 * hoge - 1.8727);

        let side = aircraft.side === 'unk' ? 'FWD CG' : aircraft.id

        return {
            pax, paxExternal, baggage, aircraft, side,
            fuel, crewFwd, da, heavWt, fwdWt, basicMoment, heavOpWt,
            fwdOpWt, opMoment, heavGW, fwdGW, takeoffMoment, takeoffArm, extGW,
            extMoment, extArm, lndWt, lndMoment, lndArm, highGW, cgLow, heavier,
            cgHighTakeoff, cgHighLand, paxArm, bagArm, fuelAt2900, maxTakeoffArm,
            hige, hoge, extLoad, extFuel, maxFuel, maxFuelExt
        };
    }

    handleFuelChange(e) {
        let fuelGal;
        if (e.target.value==='70g') {
            fuelGal = 70;
        } else if (e.target.value==='65g') {
            fuelGal = 65;
        } else if (e.target.value==='__g') {
            fuelGal = this.props.otherFuel;
        }
        this.props.setValue('fuelState', e.target.value);
        this.props.setValue('fuelGal',fuelGal); 
    }

    handleOtherFuel(e) {
        this.props.setValue('otherFuel', e.target.value);
        this.props.setValue('fuelState', '__g');
        this.props.setValue('fuelGal', e.target.value);
    }

    handleExtOps(e) {
        this.props.setValue('extOps',e.target.checked);
    }

    handleInput(e) {
        this.props.setValue([e.target.className], Number(e.target.value));
    }

    handleMaxExtFuel(e) {
        this.props.setValue('extFuelGal', e.target.value);
    }

    render() {
        let result = this.powerCalcs();
        return (
            <div className="results">
                <table>
                    <style>
                        {result.aircraft.side !== 'unk' ? '.col2 {display:none;}' : ''}
                        {this.props.extOps ? '' : '.ext {display:none;}'}
                    </style>
                    <tbody>
                        <tr className="heading"></tr>
                    <tr>
                        <th></th>
                        <th className="col2">Heavy {result.aircraft.series}</th>
                        <th>{result.side}</th>
                        <th>Moment</th>
                    </tr>

                    <ResultRow head="Basic Wt:" 
                    col2={result.heavWt.toFixed(2)} 
                    col3={result.fwdWt.toFixed(2)} 
                    col4={result.basicMoment} />
                    
                    <ResultRow head="Crew Fwd:" 
                    col2={result.crewFwd} 
                    col3={result.crewFwd} 
                    col4={Math.round(result.crewFwd*0.65*100)/100} />

                    <ResultRow head="Oil:" 
                    col2={12} 
                    col3={12} 
                    col4={22} />

                    <ResultRow head="Op Wt:" 
                    col2={result.heavOpWt.toFixed(1)} 
                    col3={result.fwdOpWt.toFixed(1)} 
                    col4={result.opMoment.toFixed(2)} />

                    <tr>
                        <th colSpan="4" className="heading">Takeoff</th>
                    </tr>

                    <ResultRow head="Op Wt:" 
                    col2={result.heavOpWt.toFixed(1)} 
                    col3={result.fwdOpWt.toFixed(1)} 
                    col4={result.opMoment.toFixed(2)} />

                    <tr>
                        <th className="row-head">
                            <div id="fuel-cell">
                                <div id="fuel-head">
                                    <span>Fuel:</span>
                                    <button id="max-fuel-button" className="otherFuel" onClick={this.handleOtherFuel} value={result.maxFuel}>Set Max</button>
                                </div>
                                <div id="fuel-container">
                                    <label className="fuel-radio" htmlFor="70g">
                                        <input type="radio" name="fuel" value="70g" id="70g" onChange={this.handleFuelChange} checked={this.props.fuelState==='70g'}/>
                                        <span>70g</span>
                                    </label>
                                    <label className="fuel-radio" htmlFor="65g">
                                        <input type="radio" name="fuel" value="65g" id="65g" onChange={this.handleFuelChange} checked={this.props.fuelState==='65g'}/>
                                        <span>65g</span>
                                    </label>
                                    <label className="fuel-radio" htmlFor="__g">
                                        <input type="radio" name="fuel" value="__g" id="__g" onChange={this.handleFuelChange} checked={this.props.fuelState==='__g'}/>
                                        <input id="fuel-input" pattern="[0-9]*" type="number" name="otherFuel" className="otherFuel" value={this.props.otherFuel} onChange={this.handleOtherFuel}/>
                                    </label>
                                </div>
                            </div>
                        </th>
                        <td className="col2">{result.fuel}</td>
                        <td>{result.fuel}</td>
                        <td>{fuelMoment(result.fuel).toFixed(2)}</td>
                    </tr>

                    <InputRow head="Crew Aft:" id="pax"
                    col4={Math.round(result.pax * result.paxArm*100)/100} />
                    
                    <InputRow head="Baggage:" id="baggage"
                    col4={Math.round(result.baggage * result.bagArm *100)/100} />
                    
                    <ResultRow head="Gross Wt(1):" 
                    col2={result.heavGW.toFixed(1)} 
                    col3={result.fwdGW.toFixed(1)} 
                    col4={result.takeoffMoment.toFixed(2)+" ("+result.takeoffArm.toFixed(1)+")"}  />

                    <tr>
                        <th colSpan="4" className="heading">
                            <label htmlFor="extOps">
                                <input type="checkbox" id="extOps" onChange={this.handleExtOps} checked={this.props.extOps}/>
                                External OPS
                            </label>
                        </th>
                    </tr>

                    <ResultRow head="Op Wt:" ext={true} gray2={true}
                    col3={result.fwdOpWt}
                    col4={result.opMoment.toFixed(2)} />

                    <tr className="ext">
                        <th className="row-head">
                        <div className="ext-ops-fuel">
                        <div>
                            Fuel:<input type="number" pattern="[0-9]*" className="extFuelGal" value={this.props.extFuelGal} onChange={this.handleInput} />
                        </div>
                        <button id="max-fuel-button-external" onClick={this.handleMaxExtFuel} value={result.maxFuelExt}>Set Max</button>
                        </div>
                        </th>
                        <td className="col2 gray"></td>
                        <td>{Math.round(result.extFuel*10)/10}</td>
                        <td>{fuelMoment(result.extFuel)}</td>
                    </tr>

                    <InputRow head="Crew Aft:" gray2={true} ext={true} id="paxExternal"
                    col4={Math.round(result.paxExternal * result.paxArm *100)/100}/>
                    
                    <InputRow head="Ext Load" gray2={true} ext={true} id="extLoad"
                    col4={Math.round(result.extLoad * 1.071*100)/100}/>

                    <ResultRow head="Gross Wt(2):" gray2={true} ext={true}
                    col3={result.extGW}
                    col4={result.extMoment+" ("+result.extArm+")"} />

                    <tr>  
                        <th colSpan="4" className="heading">Landing</th>
                    </tr>

                    <ResultRow head="Op Wt:" gray2={true}
                    col3={result.fwdOpWt}
                    col4={result.opMoment.toFixed(2)} />

                    <ResultRow head="Fuel (10g):" gray2={true} col3={67} col4={74.17}/>

                    <InputRow head="Crew Aft:" id="pax" gray2={true}
                    col4={Math.round(result.pax * result.paxArm*100)/100} />
                    
                    <InputRow head="Baggage:" id="baggage" gray2={true}
                    col4={Math.round(result.baggage * result.bagArm *100)/100} />

                    <ResultRow head="Gross Wt(3):" gray={true}
                    col3={result.lndWt.toFixed(1)}
                    col4={result.lndMoment.toFixed(2)+" ("+result.lndArm.toFixed(1)+")"} />

                    </tbody>
                    </table>
                    <table>
                    <tbody className="second-table">
                    <tr className="no-borders">
                        <th className="row-head">T/O GW: ({result.heavier})</th>
                        <td colSpan="0" className={(((result.highGW > 3200 && !this.props.extOps) || result.highGW > 3350) ? 'err' : 'good')+ ' light-underline heavy-top'}><span role="img" aria-label="warning">⚠️</span>{result.highGW.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders">
                        <th className="row-head">CG Range:</th>
                        <td colSpan="0" className="light-underline">{result.cgLow} - {result.cgHighTakeoff.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders">
                        <th className="row-head">T/O CG:</th>
                        <td colSpan="0" className={(result.maxTakeoffArm > result.cgHighTakeoff || result.maxTakeoffArm < result.cgLow) ? 'err' : 'good'}><span role="img" aria-label="warning">⚠️</span>{result.maxTakeoffArm.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders"><th colSpan="2"><br/></th></tr>
                    <tr className="no-borders">
                        <th className="row-head">Lnd GW: (3)</th>
                        <td colSpan="0" className={(result.lndWt > 3200 ? 'err' : 'good')+ ' light-underline heavy-top'}><span role="img" aria-label="warning">⚠️</span>{result.lndWt.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders">
                        <th className="row-head">CG Range:</th>
                        <td colSpan="0" className="light-underline">{result.cgLow} - {result.cgHighLand.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders">
                        <th className="row-head">Lnd CG:</th>
                        <td colSpan="0" className={(result.lndArm > result.cgHighLand || result.lndArm < result.cgLow) ? 'err' : 'good'}><span role="img" aria-label="warning">⚠️</span>{result.lndArm.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders"><th colSpan="2"><br/></th></tr>
                    <tr className="no-borders">
                        <th className="row-head"><div id="torque-i">
                        HIGE/HOGE:
                            &#x24D8;
                            <span id="torque-info">Torque values are derived from quadratic regression of NATOPS chart. Error when compared to user chart interpretation is average 0.25% Q. (stdDev 0.75% Q)</span>
                        </div></th>
                        <td colSpan="0" className={'heavy-top light-underline good'+((result.hige >= 85 && result.hige < 100) ? 'caution' : '') + (result.hige >= 100 ? 'err' : '')}><span role="img" aria-label="warning">⚠️</span>{result.hige} / {result.hoge}
                        </td>
                    </tr>
                    <tr className="no-borders">
                        <th className="row-head">Fuel@2900:</th>
                        <td colSpan="0">{result.fuelAt2900}g</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    extOps: state.app.extOps,
    pax: state.app.pax,
    baggage: state.app.baggage,
    paxExternal: state.app.paxExternal,
    extFuelGal: state.app.extFuelGal,
    extLoad: state.app.extLoad,
    otherFuel: state.app.otherFuel,
    fuelGal: state.app.fuelGal,
    maxFuel: state.app.maxFuel,
    maxFuelExt: state.app.maxFuelExt,
    fuelState: state.app.fuelState,
    da: state.app.da,
    instWt: state.app.instWt,
    studWt: state.app.studWt,
    aircraftID: state.app.aircraftID
});

export default connect(mapStateToProps, {setValue})(Results); 
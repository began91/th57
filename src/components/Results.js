import React from 'react';
import './Results.css';

let fuelMoment = fuel => {
    let cg=[110.3,110.7,110.8,110.8,110.8,110.8,110.9,111.5,112.8,113.8,114.6,115.3,115.9,116.4,116.9,117.2,117.6,117.9,118.0];
    let moment;
    if (fuel>=90*6.7) {
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
        this.state = {
            fuelGal: 70,
            fuelState: '70g',
            otherFuel: 91,
            extOps: false,
            paxTakeoff: 0,
            baggageTakeoff: 0,
            paxExternal: 200,
            extLoad: 150,
            extFuelGal: 60,
            paxLand: 0,
            baggageLand: 0
        }

        const fnsToBind = ['powerCalcs','handleFuelChange','handleOtherFuel','handleExtOps','handleInput'];
        fnsToBind.forEach(fn => this[fn] = this[fn].bind(this));
    }

    powerCalcs() {
        let paxTakeoff = this.state.paxTakeoff
        let paxLand = this.state.paxLand;
        let paxExternal = this.state.paxExternal;
        let extLoad = this.state.extLoad;
        let extFuel = this.state.extFuelGal*6.7;
        let baggageTakeoff = this.state.baggageTakeoff;
        let baggageLand = this.state.baggageLand;
        let fuel = Math.round(this.state.fuelGal * 6.7 *10)/10;
        let crewFwd = this.props.crewFwd;
        let aircraft = this.props.aircraft;
        let da = this.props.da;
        let heavWt, fwdWt, basicMoment;

        if (aircraft.side !== 'N/A') {
            heavWt = aircraft.weight;
            fwdWt = aircraft.weight;
            basicMoment = aircraft.moment;
        } else if (aircraft.series === 'C') {
            heavWt = 2179.9;
            fwdWt = 2153.4;
            basicMoment = 2484.0;
        } else {
            heavWt = 2007.7;
            fwdWt = 1961.1;
            basicMoment = 2286.3;
        }
        
        let paxArm = 1.04;
        let bagArm = 1.48;

        //Operating Weight/Moment
        let heavOpWt = heavWt + crewFwd + 12;
        let fwdOpWt = fwdWt + crewFwd + 12;
        let opMoment = Math.round((basicMoment + crewFwd * 0.65 + 22)*100)/100;
        
        //Takeoff Weight/Moment
        let heavGW = Math.round((heavOpWt + fuel + paxTakeoff + baggageTakeoff)*10)/10;
        let fwdGW = Math.round((fwdOpWt + fuel + paxTakeoff + baggageTakeoff)*10)/10;
        let takeoffMoment = Math.round((opMoment + fuelMoment(fuel) + paxTakeoff * paxArm + baggageTakeoff * bagArm)*100)/100;
        let takeoffArm = Math.round( takeoffMoment / fwdGW * 1000)/10;

        //Externals
        let extGW = Math.round((fwdOpWt + extFuel - 100 + paxExternal + extLoad)*10)/10;
        let extMoment = Math.round((opMoment + fuelMoment(extFuel) + paxExternal * paxArm + extLoad*1.071)*100)/100;
        let extArm = Math.round(extMoment / extGW * 1000)/10;

        //Landing Weight/Moment
        let lndWt = fwdOpWt + 67 + paxLand + baggageLand;
        let lndMoment = Math.round((opMoment + 74.17 + paxLand * paxArm + baggageLand * bagArm)*100)/100;
        let lndArm = Math.round(lndMoment / lndWt * 1000)/10;

        let highGW, maxTakeoffArm, heavier;

        if (this.state.extOps) {
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

        let fuelAt2900 = Math.round((2900 - heavGW + fuel) / 6.7);
        //HIGE/HOGE Derivation
        //HOGE = (ma*GW+ba)*DA^2 + (mb*GW+bb)*DA + (mc*GW+bc)
        let ma = 0.921;
        let ba = 0.2397;
        let mb = 6.5021;
        let bb = -12.079;
        let mc = 35.613;
        let bc = -20.242;
        let smallDA = this.props.da / 10000;
        let smallGW = highGW / 1000;

        let hoge = Math.round((ma * smallGW + ba) * Math.pow(smallDA, 2) + (mb * smallGW + bb) * smallDA +  (mc * smallGW + bc));
        let hige = Math.round(0.9055 * hoge - 1.8727);

        return {
            paxTakeoff, paxLand, paxExternal, baggageTakeoff, baggageLand, 
            fuel, crewFwd, aircraft, da, heavWt, fwdWt, basicMoment, heavOpWt,
            fwdOpWt, opMoment, heavGW, fwdGW, takeoffMoment, takeoffArm, extGW,
            extMoment, extArm, lndWt, lndMoment, lndArm, highGW, cgLow, heavier,
            cgHighTakeoff, cgHighLand, paxArm, bagArm, fuelAt2900, maxTakeoffArm,
            hige, hoge, extLoad, extFuel
        };
    }

    handleFuelChange(e) {
        let fuelGal;
        if (e.target.value==='70g') {
            fuelGal = 70;
        } else if (e.target.value==='65g') {
            fuelGal = 65;
        } else if (e.target.value==='__g') {
            fuelGal = this.state.otherFuel;
        } 
        this.setState({fuelState: e.target.value, fuelGal: fuelGal});
    }

    handleOtherFuel(e) {
        this.setState({
            otherFuel: e.target.value, 
            fuelState: '__g',
            fuelGal: e.target.value
        });
    }

    handleExtOps(e) {
        this.setState({extOps: e.target.checked});
    }

    handleInput(e) {
        this.setState({[e.target.className]: Number(e.target.value)});
    }

    render() {
        let result = this.powerCalcs();
        return (
            <div className="results">
                <table>
                    <style>
                        {this.props.aircraft.side !== 'N/A' ? '.col2 {display:none;}' : ''}
                        {this.state.extOps ? '' : '.ext {display:none;}'}
                    </style>
                    <tbody>
                        <tr className="heading"></tr>
                    <tr>
                        <th></th>
                        <th className="col2">Heavy {this.props.aircraft.series}</th>
                        <th>{this.props.aircraft.side === 'N/A' ? 'FWD CG' : this.props.aircraft.display}</th>
                        <th>Moment</th>
                    </tr>
                    <tr>
                        <th className="row-head">Basic Wt:</th>
                        <td className="col2">{result.heavWt}</td>
                        <td>{result.fwdWt}</td>
                        <td>{result.basicMoment}</td>
                    </tr>
                    <tr>
                        <th className="row-head">Crew Fwd:</th>
                        <td className="col2">{result.crewFwd}</td>
                        <td>{result.crewFwd}</td>
                        <td>{Math.round(result.crewFwd*0.65*100)/100}</td>
                    </tr>
                    <tr>
                        <th className="row-head">Oil:</th>
                        <td className="col2">12</td>
                        <td>12</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <th className="row-head">Op Wt:</th>
                        <td className="col2">{result.heavOpWt.toFixed(1)}</td>
                        <td>{result.fwdOpWt}</td>
                        <td>{result.opMoment.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th colSpan="4" className="heading">Takeoff</th>
                    </tr>
                    <tr>
                        <th className="row-head">Op Wt:</th>
                        <td className="col2">{result.heavOpWt.toFixed(1)}</td>
                        <td>{result.fwdOpWt.toFixed(1)}</td>
                        <td>{result.opMoment.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th id="fuel-cell" className="row-head">Fuel:
                            <div id="fuel-container">
                                <label className="fuel-radio" htmlFor="70g">
                                    <input  type="radio" name="fuel" value="70g" id="70g" onChange={this.handleFuelChange} checked={this.state.fuelState==='70g'}/>
                                    <span>70g</span>
                                </label>
                                <label className="fuel-radio" htmlFor="65g">
                                    <input type="radio" name="fuel" value="65g" id="70g" onChange={this.handleFuelChange} checked={this.state.fuelState==='65g'}/>
                                    <span>65g</span>
                                </label>
                                <label className="fuel-radio" htmlFor="__g">
                                    <input type="radio" name="fuel" value="__g" id="__g" onChange={this.handleFuelChange} checked={this.state.fuelState==='__g'}/>
                                    <input id="fuel-input" type="number" name="otherFuel" value={this.state.otherFuel} onChange={this.handleOtherFuel}/>
                                </label>
                            </div>
                        </th>
                        <td className="col2">{result.fuel}</td>
                        <td>{result.fuel}</td>
                        <td>{fuelMoment(result.fuel).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th className="row-head">Crew Aft:</th>
                        <td className="col2"><input type="number" className="paxTakeoff" value={this.state.paxTakeoff} onChange={this.handleInput} /></td>
                        <td><input type="number" className="paxTakeoff" value={this.state.paxTakeoff} onChange={this.handleInput} /></td>
                        <td>{Math.round(result.paxTakeoff * result.paxArm*100)/100}</td>
                    </tr>
                    <tr>
                        <th className="row-head">Baggage:</th>
                        <td className="col2"><input type="number" className="baggageTakeoff" value={this.state.baggageTakeoff} onChange={this.handleInput} /></td>
                        <td><input type="number" className="baggageTakeoff" value={this.state.baggageTakeoff} onChange={this.handleInput} /></td>
                        <td>{Math.round(result.baggageTakeoff * result.bagArm *100)/100}</td>
                    </tr>
                    <tr>
                        <th className="row-head">Gross Wt(1):</th>
                        <td className="col2">{result.heavGW.toFixed(1)}</td>
                        <td>{result.fwdGW.toFixed(1)}</td>
                        <td>{result.takeoffMoment.toFixed(2)} ({result.takeoffArm.toFixed(1)})</td>
                    </tr>
                    <tr>
                        <th colSpan="4" className="heading">
                            <label htmlFor="extOps">
                                <input type="checkbox" id="extOps" onChange={this.handleExtOps} checked={this.state.extOps}/>
                                External OPS
                            </label>
                        </th>
                    </tr>
                    <tr className="ext">
                        <th className="row-head">Op Wt:</th>
                        <td className="col2 gray"></td>
                        <td>{result.fwdOpWt}</td>
                        <td>{result.opMoment.toFixed(2)}</td>
                    </tr>
                    <tr className="ext">
                        <th className="row-head">Fuel:<input type="number" className="extFuelGal" value={this.state.extFuelGal} onChange={this.handleInput} /></th>
                        <td className="col2 gray"></td>
                        <td>{Math.round(result.extFuel*10)/10}</td>
                        <td>{fuelMoment(result.extFuel)}</td>
                    </tr>
                    <tr className="ext">
                        <th className="row-head">Crew Aft:</th>
                        <td className="col2 gray"></td>
                        <td><input type="number" className="paxExternal" value={this.state.paxExternal} onChange={this.handleInput} /></td>
                        <td>{Math.round(result.paxExternal * result.paxArm *100)/100}</td>
                    </tr>
                    <tr className="ext">
                        <th className="row-head">Ext Load:</th>
                        <td className="col2 gray"></td>
                        <td><input type="number" className="extLoad" value={this.state.extLoad} onChange={this.handleInput} /></td>
                        <td>{Math.round(result.extLoad * 1.071*100)/100}</td>
                    </tr>
                    <tr className="ext">
                        <th className="row-head">Gross Wt(2):</th>
                        <td className="col2 gray"></td>
                        <td>{result.extGW}</td>
                        <td>{result.extMoment} ({result.extArm})</td>
                    </tr>
                    <tr>  
                        <th colSpan="4" className="heading">Landing</th>
                    </tr>
                    <tr>
                        <th className="row-head">Op Wt:</th>
                        <td className="col2 gray"></td>
                        <td>{result.fwdOpWt}</td>
                        <td>{result.opMoment.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th className="row-head">Fuel (10g):</th>
                        <td className="col2 gray"></td>
                        <td>67</td>
                        <td>74.17</td>
                    </tr>
                    <tr>
                        <th className="row-head">Crew Aft:</th>
                        <td className="col2 gray"></td>
                        <td><input type="number" className="paxLand" value={this.state.paxLand} onChange={this.handleInput} /></td>
                        <td>{Math.round(result.paxLand * result.paxArm * 100)/100}</td>
                    </tr>
                    <tr>
                        <th className="row-head">Baggage:</th>
                        <td className="col2 gray"></td>
                        <td><input type="number" className="baggageLand" value={this.state.baggageLand} onChange={this.handleInput} /></td>
                        <td>{Math.round(result.baggageLand * result.bagArm*100)/100}</td>
                    </tr>
                    <tr>
                        <th className="row-head">Gross Wt(3):</th>
                        <td className="col2 gray"></td>
                        <td>{result.lndWt.toFixed(1)}</td>
                        <td>{result.lndMoment.toFixed(2)} ({result.lndArm.toFixed(1)})</td>
                    </tr>
                    <tr className="heading"></tr>
                    </tbody>
                    </table>
                    <table>
                    <tbody>
                    <tr className="no-borders">
                        <th className="row-head">T/O GW: ({result.heavier})</th>
                        <td colSpan="0" className={result.highGW > 3200 ? 'err' : ''}>{result.highGW.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders">
                        <th className="row-head">CG Range:</th>
                        <td colSpan="0">{result.cgLow} - {result.cgHighTakeoff.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders">
                        <th className="row-head">T/O CG:</th>
                        <td colSpan="0" className={(result.maxTakeoffArm > result.cgHighTakeoff || result.maxTakeoffArm < result.cgLow) ? 'err' : ''}>{result.maxTakeoffArm.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders">
                        <th className="row-head">Lnd GW: (3)</th>
                        <td colSpan="0" className={result.landWt > 3200 ? 'err' : ''}>{result.lndWt.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders">
                        <th className="row-head">CG Range:</th>
                        <td colSpan="0" >{result.cgLow} - {result.cgHighLand.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders">
                        <th className="row-head">Lnd CG:</th>
                        <td colSpan="0" className={(result.lndArm > result.cgHighLand || result.lndArm < result.cgLow) ? 'err' : ''}>{result.lndArm.toFixed(1)}</td>
                    </tr>
                    <tr className="no-borders">
                        <th className="row-head"><div id="torque-i">
                        HIGE/HOGE:
                            &#x24D8;
                            <span id="torque-info">Torque values are derived from quadratic regression of NATOPS chart. Error when compared to user chart interpretation is average 0.25% Q. (stdDev 0.75% Q)</span>
                        </div></th>
                        <td colSpan="0" className={((result.hige >= 85 && result.hige < 100) ? 'caution' : '') + (result.hige >= 100 ? 'err' : '')}>{result.hige} / {result.hoge}
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

export default Results;
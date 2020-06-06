import React from 'react';
import './Results.css';

let fuelMoment = fuel => {
    let cg=[110.3,110.7,110.8,110.8,110.8,110.8,110.9,111.5,112.8,113.8,114.6,115.3,115.9,116.4,116.9,117.2,117.6,117.9,118.0];
    let moment;
    if (fuel>=90*6.7) {
        return fuel*1.180;
    }
    if (fuel<=5*6.7) {
        return fuel*1.103;
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
        return weight*-4/1000 + 124.2
    } else if (weight > 2900) {
        return weight*-11/3000 + 1847/15
    } else if (weight > 2450 && series==='C') {
        return 112.5;
    } else if (weight > 2000 && series==='C') {
        return weight/300 + 313/3;
    } else if (weight > 2350 && series==='B') {
        return weight*-17/5500 + 13361/110;
    } else if (weight > 2000 && series==='B') {
        return 114.2;
    }
}

class Results extends React.Component {
    constructor(props) {
        super(props);
        
        this.powerCalcs = this.powerCalcs.bind(this);
        this.handleFuelChange = this.handleFuelChange.bind(this);
        this.handleOtherFuel = this.handleOtherFuel.bind(this);

        this.state = {
            fuelGal: 70,
            fuelState: '70g',
            otherFuel: 91
        }
    }

    powerCalcs() {
        let paxTakeoff = 0;
        let paxLand = 0;
        let paxExternal = 0;
        let baggageTakeoff = 0;
        let baggageLand = 0;
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
        let opMoment = Math.round(basicMoment + crewFwd * 0.65 + 22);
        
        //Takeoff Weight/Moment
        let heavGW = Math.round((heavOpWt + fuel + paxTakeoff + baggageTakeoff)*10)/10;
        let fwdGW = Math.round((fwdOpWt + fuel + paxTakeoff + baggageTakeoff)*10)/10;
        let takeoffMoment = Math.round((opMoment + fuelMoment(fuel) + paxTakeoff * paxArm + baggageTakeoff * bagArm)*100)/100;
        let takeoffArm = Math.round( takeoffMoment / fwdGW * 1000)/10;

        //Externals
        let extGW = Math.round((fwdOpWt + fuel - 100 + paxExternal + 150)*10)/10;
        let extMoment = Math.round((opMoment + fuelMoment(fuel-100) + paxExternal * paxArm + 160.65)*100)/100;
        let extArm = Math.round(extMoment / extGW * 1000)/10;

        //Landing Weight/Moment
        let lndWt = fwdOpWt + 67 + paxLand + baggageLand;
        let lndMoment = Math.round((opMoment + 74.17 + paxLand * paxArm + baggageLand * bagArm)*100)/100;
        let lndArm = Math.round(lndMoment / lndWt * 1000)/10;

        let highGW = heavGW > extGW ? heavGW : extGW;

        let cgLow = aircraft.series==='B' ? 106.0 : 106.75;
        let cgHighTakeoff = cgHighLimit(highGW, aircraft.series);
        let cgHighLand = cgHighLimit(lndWt, aircraft.series);

        return {
            paxTakeoff, paxLand, paxExternal, baggageTakeoff, baggageLand, 
            fuel, crewFwd, aircraft, da, heavWt, fwdWt, basicMoment, heavOpWt,
            fwdOpWt, opMoment, heavGW, fwdGW, takeoffMoment, takeoffArm, extGW,
            extMoment, extArm, lndWt, lndMoment, lndArm, highGW, cgLow,
            cgHighTakeoff, cgHighLand, paxArm, bagArm
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

    render() {
        let result = this.powerCalcs();
        return (
            <div className="results">
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>Heaviest A/C</th>
                        <th>FWD CG / Actual A/C</th>
                        <th>Moment</th>
                    </tr>
                    <tr>
                        <th>Basic Weight:</th>
                        <td>{result.heavWt}</td>
                        <td>{result.fwdWt}</td>
                        <td>{result.basicMoment}</td>
                    </tr>
                    <tr>
                        <th>Crew Forward:</th>
                        <td>{result.crewFwd}</td>
                        <td>{result.crewFwd}</td>
                        <td>{Math.round(result.crewFwd*0.65*100)/100}</td>
                    </tr>
                    <tr>
                        <th>Oil:</th>
                        <td>12</td>
                        <td>12</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <th>Operating Wt:</th>
                        <td>{result.heavOpWt}</td>
                        <td>{result.fwdOpWt}</td>
                        <td>{result.opMoment}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <th>Takeoff</th>
                    </tr>
                    <tr>
                        <th>Operating Wt:</th>
                        <td>{result.heavOpWt}</td>
                        <td>{result.fwdOpWt}</td>
                        <td>{result.opMoment}</td>
                    </tr>
                    <tr>
                        <th>Fuel:
                            <label className="fuel-radio" htmlFor="70g">
                                <input  type="radio" name="fuel" value="70g" id="70g" onChange={this.handleFuelChange} checked={this.state.fuelState==='70g'}/>
                                70g
                            </label>
                            <label className="fuel-radio" htmlFor="65g">
                                <input type="radio" name="fuel" value="65g" id="70g" onChange={this.handleFuelChange} checked={this.state.fuelState==='65g'}/>
                                65g
                            </label>
                            <label className="fuel-radio" htmlFor="__g">
                                <input type="radio" name="fuel" value="__g" id="__g" onChange={this.handleFuelChange} checked={this.state.fuelState==='__g'}/>
                                <input id="fuel-input" type="number" name="otherFuel" value={this.state.otherFuel} onChange={this.handleOtherFuel}/>
                            </label>
                        </th>
                        <td>{result.fuel}</td>
                        <td>{result.fuel}</td>
                        <td>{fuelMoment(result.fuel)}</td>
                    </tr>
                    <tr>
                        <th>Crew/Pax Aft:</th>
                        <td>{result.paxTakeoff}</td>
                        <td>{result.paxTakeoff}</td>
                        <td>{result.paxTakeoff * result.paxArm}</td>
                    </tr>
                    <tr>
                        <th>Baggage:</th>
                        <td>{result.baggageTakeoff}</td>
                        <td>{result.baggageTakeoff}</td>
                        <td>{result.baggageTakeoff * result.bagArm}</td>
                    </tr>
                    <tr>
                        <th>Gross Weight (1):</th>
                        <td>{result.heavGW}</td>
                        <td>{result.fwdGW}</td>
                        <td>{result.takeoffMoment} ({result.takeoffArm})</td>
                    </tr>
                    <tr>
                        <td></td>
                        <th>External OPS</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Operating Wt:</th>
                        <td></td>
                        <td>{result.fwdOpWt}</td>
                        <td>{result.opMoment}</td>
                    </tr>
                    <tr>
                        <th>Fuel:</th>
                        <td></td>
                        <td>{Math.round((result.fuel - 100)*10)/10}</td>
                        <td>{fuelMoment(result.fuel-100)}</td>
                    </tr>
                    <tr>
                        <th>Crew Aft:</th>
                        <td></td>
                        <td>{result.paxExternal}</td>
                        <td>{result.paxExternal * result.paxArm}</td>
                    </tr>
                    <tr>
                        <th>External Load:</th>
                        <td></td>
                        <td>150</td>
                        <td>160.65</td>
                    </tr>
                    <tr>
                        <th>Gross Weight (2):</th>
                        <td></td>
                        <td>{result.extGW}</td>
                        <td>{result.extMoment} ({result.extArm})</td>
                    </tr>
                    <tr>
                        <td></td>
                        <th>Landing</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Operating Wt:</th>
                        <td></td>
                        <td>{result.fwdOpWt}</td>
                        <td>{result.opMoment}</td>
                    </tr>
                    <tr>
                        <th>Fuel (10g):</th>
                        <td></td>
                        <td>67</td>
                        <td>74.17</td>
                    </tr>
                    <tr>
                        <th>Crew/Pax Aft:</th>
                        <td></td>
                        <td>{result.paxLand}</td>
                        <td>{result.paxLand * result.paxArm}</td>
                    </tr>
                    <tr>
                        <th>Baggage:</th>
                        <td></td>
                        <td>{result.baggageLand}</td>
                        <td>{result.baggageLand * result.bagArm}</td>
                    </tr>
                    <tr>
                        <th>Gross Wt (3):</th>
                        <td></td>
                        <td>{result.lndWt}</td>
                        <td>{result.lndMoment} ({result.lndArm})</td>
                    </tr>
                    </tbody>
                </table>
                
            </div>
        );
    }
}

export default Results;
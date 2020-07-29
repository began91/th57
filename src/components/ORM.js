import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setValue } from '../actions/Actions';
import './ORM.css'

const RiskSelector = props => {
    const dispatch = useDispatch();
    const selectedRisk = useSelector(state => state.app[props.category])

    
    const handleSelect = e => {
        dispatch(setValue(props.category, e.target.value));
    }
    
    return (<td>
        <button value="L" className={`risk-button-low ${selectedRisk==='L' ? 'selected': ''}`} onClick={handleSelect}>L</button>
        <button value="M" className={`risk-button-med ${selectedRisk==='M' ? 'selected': ''}`} onClick={handleSelect}>M</button>
        <button value="H" className={`risk-button-hgh ${selectedRisk==='H' ? 'selected': ''}`} onClick={handleSelect}>H</button>
    </td>)
}

const HighestRiskEntry = props => {
    const dispatch = useDispatch();
    const hr = useSelector(state => state.app[`hr${props.index}`])
    const hc = useSelector(state => state.app[`hc${props.index}`])

    const handleRisk = e => {
        dispatch(setValue(`hr${props.index}`, e.target.value))
    }
    
    const handleControl = e => {
        dispatch(setValue(`hc${props.index}`, e.target.value))
    }
    
    return (<div className="high-risk" id={props.id}>
        <textarea value={hr} onChange={handleRisk} maxLength="40"></textarea>
        <textarea value={hc} onChange={handleControl} maxLength="80"></textarea>
    </div>)
}

const ORM = props => {
    // const dispatch = useDispatch();
    // const pic = useSelector(state => state.app.pic);
    // const sna = useSelector(state => state.app.sna);
    // const weather = useSelector(state => state.app.weather);
    // const night = useSelector(state => state.app.night);
    // const highestRisks = useSelector(state => state.app.highestRisks);

    return (
        <div id="ORM-view">
            <em>"Get Lucky"</em>
            <br/>
            Operational Risk Management Worksheet
            <table id="ORM-table">
                <tbody>
                    <tr>
                        <th>Hazard Types</th>
                        <th>Mitigated <br/>Risk Level</th>
                    </tr>
                    {/* General */}
                    <tr>
                        <th colSpan="2">
                            Personal Risk Assessment/Human Factors
                            <br/>
                            <span style={{fontWeight:400}}>(Work distractions / Illness / Etc...)</span>
                        </th>
                    </tr>
                    <tr>
                        <td>PIC</td>
                        <RiskSelector category="picGen" />
                    </tr>
                    <tr>
                        <td>SNA/SNA/IP/Aircrew</td>
                        <RiskSelector category="snaGen" />
                    </tr>
                    {/* Sleep */}
                    <tr>
                        <th colSpan="2">
                            Sleep
                        </th>
                    </tr>
                    <tr>
                        <td>PIC</td>
                        <RiskSelector category="picSlp" />
                    </tr>
                    <tr>
                        <td>SNA/SNA/IP/Aircrew</td>
                        <RiskSelector category="snaSlp" />
                    </tr>
                    {/* Weather */}
                    <tr>
                        <th colSpan="2">
                            Weather
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <strong>Ceilings</strong>
                            <br/>
                            {"(VMC: L) | (<1000 or <3SM: M) | (<INST MINS: H)"}
                        </td>
                        <RiskSelector category="ceil" />
                    </tr>
                    <tr>
                        <td>
                            <strong>Wind</strong>
                            <br/>
                            {"(>5kts below RWOP: L) | (<5kts below RWOP: M) | (>RWOP: H)"}
                        </td>
                        <RiskSelector category="wind"/>
                    </tr>
                    <tr>
                        <td>
                            <strong>SIGMET</strong>
                            <br/>
                            {"Reasonable probability of entry?"}
                            <br/>
                            {"Yes: M | No: L"}
                        </td>
                        <RiskSelector category="sigmet" />
                    </tr>
                    {/* Night */}
                    <tr>
                        <th colSpan="2">
                            Night
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <strong>IMC</strong>
                            <br/>
                            {"Reasonable probability of night IMC?"}
                            <br/>
                            {"Yes: M | No: L"}
                        </td>
                        <RiskSelector category="imc" />
                    </tr>
                    <tr>
                        <td>
                            <strong>Illumination</strong>
                            <br/>
                            {"Low Light: M | High Light: L"}
                        </td>
                        <RiskSelector category="illum"/>
                    </tr>
                    {/* CrewProf */}
                    <tr>
                        <th colSpan="2">
                            Crew Proficiency for Assigned Event (IP Only)
                        </th>
                    </tr>
                    <tr>
                        <td>PIC</td>
                        <RiskSelector category="picProf" />
                    </tr>
                    <tr>
                        <td>IP/Aircrew</td>
                        <RiskSelector category="snaProf" />
                    </tr>          
                    {/* Pressure */}
                    <tr>
                        <th colSpan="2">
                            Pressure to Complete Mission
                        </th>
                    </tr>
                    <tr>
                        <td>PIC</td>
                        <RiskSelector category="picPres" />
                    </tr>
                    <tr>
                        <td>SNA/SNA/IP/Aircrew</td>
                        <RiskSelector category="snaPres" />
                    </tr>
                </tbody>
            </table>
            <div id="highest-risks">
                <strong>Highest Risks and Associated Controls</strong>
                <HighestRiskEntry id="high-risk-0" index={0}/>
                <HighestRiskEntry id="high-risk-1" index={1}/>
                <HighestRiskEntry id="high-risk-2" index={2}/>
            </div>
        </div>
    );
}

export default ORM;
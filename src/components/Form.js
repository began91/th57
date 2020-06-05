import React from 'react';
import './Form.css';


let eventName="C4001";
let aircraft="123";
let spot="H/S";
let curwx="BKN008";
let fcst="SKC";
let studName="I.M. Stud";
let studWt=195;
let mxTmp=31;
let pa=124;
let da=1689;

function InputItem(props) {
    return (
        <div className={props.id}>
            <label for={props.id}>{props.title}:</label>
            <input type="text" id={props.id} name={props.id} value={props.input}/>
        </div>
    );
}

function Instructor(props) {
    return (
        <div className="instructor">
            <div className="instructor-name">
                <label for="instructor">Instructor:</label>
                <input type="text" id="instructor" name="instructor" value={props.name} />
            </div>
            <div className="vest">
                <input type="radio" id="dry" name="vest" value="dry" checked={props.vest==='dry'} />
                <label for="dry">Dry</label>
                <input type="radio" id="wet" name="vest" value="wet" checked={props.vest==='wet'} />
                <label for="wet">Wet</label>

                <label for="instructorWeight">Weight:</label>
                <input type="text" id="instructorWeight" name="instructorWeight" value={props.weight} />
            </div>
        </div>
    );
}

function Student(props) {
    return (
        <div className="student">
            <div className="student-name">
                <label for="studentName">Student:</label>
                <input type="text" id="studentName" name="studentName" value={props.name} />
            </div>
            <div className="student-weight">
               <label for="studentWeight">Weight:</label>
                <input type="text" id="studentWeight" name="studentWeight" value={props.weight} /> 
            </div>
        </div>
    );
}

function Aircraft(props) {
    return (
        <div className="aircraft">
            <label for="side">Aircraft:</label>
            <input type="text" id="side" name="side" value={props.aircraft} />
            <label for="spot">Spot:</label>
            <input type="text" id="spot" name="spot" value={props.spot} />
        </div>
    );
}

class Form extends React.Component {
    render() {
        return (
            <div className="form">
                <div className="left-header header">
                    <InputItem title="Event" input={eventName} id="fltEvent"/>
                    <Instructor name="Egan" vest="dry" 
                    weight="210"/>
                    <Aircraft aircraft={aircraft} spot={spot}/>
                    <InputItem title="Current Wx" input={curwx} id="curwx"/>
                    <InputItem title="Forecast Wx" input={fcst} id="fcst"/>
                </div>
                <div className="right-header header">
                    <InputItem title="Date" input={new Date().toDateString()} id="date"/>
                    <Student name={studName} weight={studWt} />
                    <InputItem title="Max Temp" input={mxTmp} id="mxTmp" />
                    <InputItem title="Max PA" input={pa} id="pa"/>
                    <InputItem title="Max DA" input={da} id="da"/>
                </div>
            </div>
        );
    }
}

export default Form;
/*
<Event id={eventName} />
                    <Instructor name="Egan" vest="Dry" weight="210"/>
                    <Aircraft side="123" spot="A1" />
                    <Weather current="curwx" forecast="fcst" />
                </div>
                <div className="right-header">
                    <Date date={new Date().toDateString()} />
                    <Student name="I.M. Stud" weight="210" />
                    <Temp temp="21C" />
                    <PA pa="+210" />
                    <DA da="+1545" />



${new Date().toDateString()}

div className="form">
                <h4 className="event">Event</h4>
                <input className="event">{this.props.event}</input>
            </div>
*/
import React from 'react';
import './Form.css';
import Instructor from './Instructor.js';
import Aircraft from './Aircraft.js';

class InputItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: this.props.value};

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        this.setState({value: e.target.value});
        //Event, wx, and date have no effect on calculations
        //need separate handling if change is made to DA. (affects TRQ only)
    }

    render() {
        return (
            <div className={this.props.id}>
                <label htmlFor={this.props.id}>{this.props.label}:</label>
                <input type="text" id={this.props.id} name={this.props.id} value={this.state.value} onChange={this.handleChange}/>
            </div>
        );
    }
}

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            weight: this.props.weight
        }

        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleWeightChange(e) {
        this.setState({weight: Number(e.target.value)});
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    render() {
        return (
            <div className="student">
                <div className="student-name">
                    <label htmlFor="studentName">Student:</label>
                    <input type="text" id="studentName" name="studentName" value={this.state.name} onChange={this.handleNameChange} />
                </div>
                <div className="student-weight">
                <label htmlFor="studentWeight">Weight:</label>
                    <input type="number" id="studentWeight" name="studentWeight" value={this.state.weight} onChange={this.handleWeightChange} /> 
                </div>
            </div>
        );
    }
}



/*
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
*/

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: 'C4001',
            aircraft: '123',
            spot: 'H/S',
            curwx: 'BKN008',
            fcst: 'SKC',
            instructorName: 'Egan',
            instructorVest: 'dry',
            instructorWt: 210,
            studName: 'I. M. Stud',
            studWt: 195,
            mxTmp: 31,
            pa: 124,
            da: 1689,
            date: new Date().toDateString()
        }
    }
    
    
    render() {
        return (
            <div className="form">
                <div className="left-header header">
                    <InputItem label="Event" value={this.state.eventName} id="fltEvent"/>
                    <Instructor name={this.state.instructorName} vest={this.state.instructorVest} 
                    weight={this.state.instructorWt} />
                    <Aircraft aircraft={this.state.aircraft} spot={this.state.spot}/>
                    <InputItem label="Current Wx" value={this.state.curwx} id="curwx"/>
                    <InputItem label="Forecast Wx" value={this.state.fcst} id="fcst"/>
                </div>
                <div className="right-header header">
                    <InputItem label="Date" value={this.state.date} id="date"/>
                    <Student name={this.state.studName} weight={this.state.studWt} />
                    <InputItem label="Max Temp" value={this.state.mxTmp} id="mxTmp" />
                    <InputItem label="Max PA" value={this.state.pa} id="pa"/>
                    <InputItem label="Max DA" value={this.state.da} id="da"/>
                </div>
            </div>
        );
    }
}

export default Form;
/*
Results >>>
<div className="operating">
                    <div className="fields">

                    </div>
                    <div className="heaviest">

                    </div>
                    <div className="fwd-actual">

                    </div>
                    <div className="moment">

                    </div>
                </div>
                <div className="takeoff">
                    <div className="fields">

                    </div>
                    <div className="heaviest">

                    </div>
                    <div className="fwd-actual">

                    </div>
                    <div className="moment">

                    </div>
                </div>
                <div className="external">
                    <div className="fields">

                    </div>
                    <div className="heaviest">

                    </div>
                    <div className="fwd-actual">

                    </div>
                    <div className="moment">

                    </div>
                </div>
                <div className="landing">
                    <div className="fields">

                    </div>
                    <div className="heaviest">

                    </div>
                    <div className="fwd-actual">

                    </div>
                    <div className="moment">

                    </div>
                </div>
                <div className="checks">

                </div>




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
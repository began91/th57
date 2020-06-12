import React from 'react';
import './Form.css';
import Instructor from './Instructor.js';
import Aircraft from './Aircraft.js';
import moment from 'moment';

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

class InputNum extends React.Component {
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
                <input type="number" pattern="[0-9]*" id={this.props.id} name={this.props.id} value={this.state.value} onChange={this.handleChange}/>
            </div>
        );
    }
}

class InputDA extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(Number(e.target.value));
    }

    render() {
        return (
            <div className={this.props.id}>
                <label htmlFor={this.props.id}>{this.props.label}:</label>
                <input type="number" pattern="[0-9]*" id={this.props.id} name={this.props.id} value={this.props.value} onChange={this.handleChange} />
            </div>
        );
    }
}

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }

        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleWeightChange(e) {
        this.props.onWtChange(Number(e.target.value));
        //this.setState({weight: Number(e.target.value)});
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    render() {
        return (
            <div className="student">
                <div className="student-name">
                    <label htmlFor="studentName">Stud<span className="shorten">ent</span>:</label>
                    <input type="text" id="studentName" name="studentName" value={this.state.name} onChange={this.handleNameChange} />
                </div>
                <div className="student-weight">
                <label htmlFor="studentWeight">Weight:</label>
                    <input type="number" pattern="[0-9]*" id="studentWeight" name="studentWeight" value={this.props.weight} onChange={this.handleWeightChange} /> 
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
            eventName: '',
            curwx: '',
            fcst: '',
            studName: '',
            mxTmp: 0,
            pa: 0,
            date: new moment().format('DD MMM YY')
        }
    }
    
    render() {
        return (
            <div className="form">
                <div className="left-header header">
                    <InputItem label="Event" value={this.state.eventName} id="fltEvent"/>
                    <Instructor weight={this.props.instWt} onWtChange={this.props.onInstWtChange} />
                    <Aircraft aircraft={this.props.aircraft} onAircraftChange={this.props.onAircraftChange} />
                    <InputItem label="Crnt Wx" value={this.state.curwx} id="curwx"/>
                    <InputItem label="Fcst Wx" value={this.state.fcst} id="fcst"/>
                </div>
                <div className="right-header header">
                    <InputItem label="Date" value={this.state.date} id="date"/>
                    <Student name={this.state.studName} weight={this.props.studWt} onWtChange={this.props.onStudWtChange} />
                    <InputNum label="Max Tmp" value={this.state.mxTmp} id="mxTmp" />
                    <InputNum label="Max PA" value={this.state.pa} id="pa"/>
                    <InputDA label="Max DA" value={this.props.da} id="da" onChange={this.props.onDAChange}/>
                </div>
            </div>
        );
    }
}

export default Form;
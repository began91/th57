import React from 'react';
import { connect } from 'react-redux';
import { setValue } from '../actions/Actions';
import './Form.css';
import Instructor from './Instructor.js';
import Aircraft from './Aircraft.js';

class InputItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        this.props.setValue(this.props.id, e.target.value);
        //Event, wx, and date have no effect on calculations
        //need separate handling if change is made to DA. (affects TRQ only)
    }

    render() {
        return (
            <div className={this.props.id}>
                <label htmlFor={this.props.id}>{this.props.label}:</label>
                <input type="text" id={this.props.id} name={this.props.id} value={this.props[this.props.id]} onChange={this.handleChange}/>
            </div>
        );
    }
}

class InputNum extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        this.props.setValue(this.props.id, e.target.value);
    }

    render() {
        return (
            <div className={this.props.id}>
                <label htmlFor={this.props.id}>{this.props.label}:</label>
                <input type="number" pattern="[0-9]*" id={this.props.id} name={this.props.id} value={this.props[this.props.id]} onChange={this.handleChange}/>
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
        this.props.setValue('da',Number(e.target.value));
    }

    render() {
        return (
            <div className="maxDA">
                <label htmlFor="maxDA">Max DA:</label>
                <input type="number" pattern="[0-9]*" id="maxDA" name="maxDA" value={this.props.da} onChange={this.handleChange} />
            </div>
        );
    }
}

class Student extends React.Component {
    constructor(props) {
        super(props);

        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleWeightChange(e) {
        this.props.setValue('studWt',Number(e.target.value));
    }

    handleNameChange(e) {
        this.props.setValue('stud',e.target.value);
    }

    render() {
        return (
            <div className="student">
                <div className="student-name">
                    <label htmlFor="studentName">Stud<span className="shorten">ent</span>:</label>
                    <input type="text" id="studentName" name="studentName" value={this.props.stud} onChange={this.handleNameChange} />
                </div>
                <div className="student-weight">
                <label htmlFor="studentWeight">Weight:</label>
                    <input type="number" pattern="[0-9]*" id="studentWeight" name="studentWeight" value={this.props.studWt} onChange={this.handleWeightChange} /> 
                </div>
            </div>
        );
    }
}


InputItem = connect(state => ({eventName: state.app.eventName, curwx: state.app.curwx, fcst: state.app.fcst, date: state.app.date}), {setValue})(InputItem);
Student = connect(state => ({studWt: state.app.studWt, stud: state.app.stud}), {setValue})(Student);
InputNum = connect(state => ({mxTmp: state.app.mxTmp, pa: state.app.pa}), {setValue})(InputNum);
InputDA = connect(state => ({da: state.app.da}), {setValue})(InputDA);

class Form extends React.Component {
    render() {
        return (
            <div className="form">
                <div className="left-header header">
                    <InputItem label="Event" id="eventName"/>
                    <Instructor />
                    <Aircraft />
                    <InputItem label="Crnt Wx" id="curwx"/>
                    <InputItem label="Fcst Wx" id="fcst"/>
                </div>
                <div className="right-header header">
                    <InputItem label="Date" id="date"/>
                    <Student />
                    <InputNum label="Max Tmp" id="mxTmp"/>
                    <InputNum label="Max PA" id="pa"/>
                    <InputDA />
                </div>
            </div>
        );
    }
}


export default Form;
import React from 'react';
import { connect } from 'react-redux';
import { setValue } from '../actions/Actions';
import './Instructor.css';
import {instructorList, getInstById} from '../helpers/lists.js'

class Instructor extends React.Component {
    constructor(props) {
        super(props);

        const fnsToBind = ['handleInput','handleVestChange','handleWeightChange','instructorFilter','selectInstructor'];
        fnsToBind.forEach(fn => this[fn] = this[fn].bind(this));
    }

    handleInput(e) {
        this.props.setValue('inst', e.target.value);
    }

    selectInstructor(e, instructor) {
        this.props.setValue('inst',instructor.id);
        this.props.setValue('instWt',instructor[this.props.vest]);
    }

    handleVestChange(e) {
        this.props.setValue('vest', e.target.value);
        if (getInstById(this.props.inst)) {
            this.props.setValue('instWt',getInstById(this.props.inst)[e.target.value])
        } else {
            this.props.setValue('instWt',Number(this.props.instWt) + (e.target.value ==='dry' ? -8 : 8));
        }
    }

    handleWeightChange(e) {
        this.props.setValue('instWt',Number(e.target.value));
    }

    instructorFilter(instructor) {
        if (this.props.inst === '' || getInstById(this.props.inst)) {
            return false;
        } else {
            return (instructor.id.substr(0,this.props.inst.length).toLowerCase() === this.props.inst.toLowerCase());
        }
    }

    render() {
        return (
            <div className="instructor">
                <div className="instructor-name">
                    <label htmlFor="instructor">
                        Inst<span className="shorten">ructor</span>:
                        <div className="autocomplete">
                            <input type="text" className="instructor" value={this.props.inst} onChange={this.handleInput} />
                            <div className="autocomplete-items">
                                {instructorList.filter(this.instructorFilter)
                                .map(instructor => {
                                    return (
                                        <div className="autocomplete-item" key={instructor.id} onClick={e => this.selectInstructor(e, instructor)}>
                                            {instructor.id}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </label>
                </div>
                <div className="vest">
                    <label htmlFor="dry">
                        <input type="radio" id="dry" name="vest" value="dry" checked={this.props.vest==='dry'} onChange={this.handleVestChange} />
                        Dry
                    </label>
                    <label htmlFor="wet">
                        <input type="radio" id="wet" name="vest" value="wet" checked={this.props.vest==='wet'} onChange={this.handleVestChange}/>
                        Wet
                    </label>

                    <label className="instructorWeight" htmlFor="instructorWeight">Weight:</label>
                    <input type="number" pattern="[0-9]*" id="instructorWeight" name="instructorWeight" value={this.props.instWt} onChange={this.handleWeightChange} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    inst: state.app.inst,
    instWt: state.app.instWt,
    vest: state.app.vest
})

export default connect(mapStateToProps, {setValue})(Instructor);
import React from 'react';
import './Instructor.css';
import {instructorList} from '../helpers/lists.js'


class Instructor extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            instructor: instructorList[0],
            display: '',
            vest: 'wet'
        }

        const fnsToBind = ['handleInput','handleVestChange','handleWeightChange','instructorFilter','selectInstructor'];
        fnsToBind.forEach(fn => this[fn] = this[fn].bind(this));
    }

    handleInput(e) {
        this.setState({
            display: e.target.value,
        });
    }

    selectInstructor(e, instructor) {
        this.setState({
            instructor,
            display: instructor.display
        });
        this.props.onChange('inst',instructor.display)
        this.props.onChange('instWt',instructor[this.state.vest]);
    }

    handleVestChange(e) {
        this.setState({
            vest: e.target.value
        });
        this.props.onChange('vest',e.target.value)
        this.props.onChange('instWt',this.state.instructor[e.target.value])
    }

    handleWeightChange(e) {
        this.props.onChange('instWt',Number(e.target.value));
    }

    instructorFilter(instructor) {
        if (this.state.display === '' || this.state.display === this.state.instructor.display) {
            return false;
        } else {
            return (instructor.display.substr(0,this.state.display.length).toLowerCase() === this.state.display.toLowerCase());
        }
    }

    render() {
        return (
            <div className="instructor">
                <div className="instructor-name">
                    <label htmlFor="instructor">
                        Inst<span className="shorten">ructor</span>:
                        <div className="autocomplete">
                            <input type="text" className="instructor" value={this.state.display} onChange={this.handleInput} />
                            <div className="autocomplete-items">
                                {instructorList.filter(this.instructorFilter)
                                .map(instructor => {
                                    return (
                                        <div className="autocomplete-item" key={instructor.id} onClick={e => this.selectInstructor(e, instructor)}>
                                            {instructor.display}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </label>
                </div>
                <div className="vest">
                    <label htmlFor="dry">
                        <input type="radio" id="dry" name="vest" value="dry" checked={this.state.vest==='dry'} onChange={this.handleVestChange} />
                        Dry
                    </label>
                    <label htmlFor="wet">
                        <input type="radio" id="wet" name="vest" value="wet" checked={this.state.vest==='wet'} onChange={this.handleVestChange}/>
                        Wet
                    </label>

                    <label className="instructorWeight" htmlFor="instructorWeight">Weight:</label>
                    <input type="number" pattern="[0-9]*" id="instructorWeight" name="instructorWeight" value={this.props.weight} onChange={this.handleWeightChange} />
                </div>
            </div>
        );
    }
}

export default Instructor;
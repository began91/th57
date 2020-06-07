import React from 'react';
import './Instructor.css';
import {instructorList} from '../data/lists.js'


class Instructor extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            instructor: instructorList[0],
            display: instructorList[0].display,
            vest: 'dry'
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleVestChange = this.handleVestChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
    }

    handleNameChange(e) {
        this.setState({
            display: e.target.value,
            instructor: JSON.parse(e.target.value)
        });
        this.props.onWtChange(JSON.parse(e.target.value)[this.state.vest]);
    }

    handleVestChange(e) {
        this.setState({
            vest: e.target.value
        });
        this.props.onWtChange(this.state.instructor[e.target.value])
    }

    handleWeightChange(e) {
        this.props.onWtChange(Number(e.target.value));
        //this.setState({weight: Number(e.target.value)});
    }


    render() {
        return (
            <div className="instructor">
                <div className="instructor-name">
                    <label htmlFor="instructor">
                        Inst<span className="shorten">ructor</span>:
                        <select className="instructor-selector" value={this.state.display} onChange={this.handleNameChange}>
                            {instructorList.map(instructor => {
                                return (
                                <option value={JSON.stringify(instructor)} key={instructor.id}>{instructor.display}</option>
                                );
                            })}
                        </select>
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
                    <input type="number" id="instructorWeight" name="instructorWeight" value={this.props.weight} onChange={this.handleWeightChange} />
                </div>
            </div>
        );
    }
}

export default Instructor;
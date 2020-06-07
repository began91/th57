import React from 'react';
import './Aircraft.css';
import {aircraftList} from '../data/lists.js';

class Aircraft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: this.props.aircraft.display,
            spot: ''
        }

        this.handleSpotChange = this.handleSpotChange.bind(this);
        this.handleAircraftChange = this.handleAircraftChange.bind(this);
    }

    handleSpotChange(e) {
        this.setState({spot: e.target.value});
    }

    handleAircraftChange(e) {
        this.setState({
            display: e.target.value
        });
        this.props.onAircraftChange(JSON.parse(e.target.value));
        //lookup aircraft number for weight and moment
        //if no side number given, calculate heaviest/most fwd
    }
    
    render() {
        return (
            <div className="aircraft">
                <label htmlFor="aircraft">Aircraft:</label>
                <select className="aircraft-selector" id="aircraft" value={this.state.display} onChange={this.handleAircraftChange}>
                    {aircraftList.map(aircraft => {
                        return (
                        <option value={JSON.stringify(aircraft)} key={aircraft.id}>{aircraft.display}</option>
                        );
                    })}
                </select>
                <label htmlFor="spot">Spot:</label>
                <input type="text" id="spot" name="spot" value={this.state.spot} onChange={this.handleSpotChange} />
            </div>
        );
    }
}

export default Aircraft;
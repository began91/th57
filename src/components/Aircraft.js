import React from 'react';
import './Aircraft.css';
import {aircraftList} from '../helpers/lists.js';

class Aircraft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spot: ''
        }

        this.handleSpotChange = this.handleSpotChange.bind(this);
        this.handleAircraftChange = this.handleAircraftChange.bind(this);
    }

    handleSpotChange(e) {
        this.setState({spot: e.target.value});
    }

    handleAircraftChange(e) {
        this.props.onChange('aircraftID', e.target.value);
    }
    
    render() {
        return (
            <div className="aircraft">
                <label htmlFor="aircraft">Aircraft:</label>
                <select className="aircraft-selector" id="aircraft" value={this.props.aircraftID} onChange={this.handleAircraftChange}>
                    {aircraftList.map(aircraft => {
                        return (
                        <option value={aircraft.id} key={aircraft.id}>{aircraft.id}</option>
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
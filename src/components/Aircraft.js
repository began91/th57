import React from 'react';
import { connect } from 'react-redux';
import { setValue } from '../actions/Actions';
import './Aircraft.css';
import {aircraftList} from '../helpers/lists.js';

class Aircraft extends React.Component {
    constructor(props) {
        super(props);

        this.handleSpotChange = this.handleSpotChange.bind(this);
        this.handleAircraftChange = this.handleAircraftChange.bind(this);
    }

    handleSpotChange(e) {
        this.props.setValue('spot', e.target.value);
    }

    handleAircraftChange(e) {
        this.props.setValue('aircraftID', e.target.value);
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
                <input type="text" id="spot" name="spot" value={this.props.spot} onChange={this.handleSpotChange} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    spot: state.app.spot,
    aircraftID: state.app.aircraftID
})

export default connect(mapStateToProps, {setValue})(Aircraft);
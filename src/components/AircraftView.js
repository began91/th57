import React from 'react';
import './AircraftView.css'
import {aircraftList} from '../data/lists.js';

function AircraftView() {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Side</th>
                    <th>Series</th>
                    <th>Weight</th>
                    <th>Moment</th>
                    <th>Arm</th>
                </tr>
                {aircraftList.map(aircraft => {
                    return (
                        <tr key={aircraft.id}>
                            <td>{aircraft.side}</td>
                            <td>{aircraft.series}</td>
                            <td>{aircraft.weight}</td>
                            <td>{aircraft.moment}</td>
                            <td>{aircraft.arm}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default AircraftView;
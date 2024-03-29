import React from 'react';
import './AircraftView.css'
import {aircraftList} from '../helpers/lists.js';

function AircraftView() {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Side</th>
                        <th>Series</th>
                        <th>Weight</th>
                        <th>Moment</th>
                        <th>Arm</th>
                    </tr>
                    {aircraftList.filter(aircraft => (aircraft.series==='C' && aircraft.side<96)).map(aircraft => {
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
            <table>
                <tbody>
                    <tr>
                        <th>Side</th>
                        <th>Series</th>
                        <th>Weight</th>
                        <th>Moment</th>
                        <th>Arm</th>
                    </tr>
                    {aircraftList.filter(aircraft => (aircraft.series==='C' && aircraft.side>=96)).map(aircraft => {
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
            <table>
                <tbody>
                    <tr>
                        <th>Side</th>
                        <th>Series</th>
                        <th>Weight</th>
                        <th>Moment</th>
                        <th>Arm</th>
                    </tr>
                    {aircraftList.filter(aircraft => aircraft.series==='B')
                    .map(aircraft => {
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
            <p>Updated: October 2021</p>
        </div>
    );
}

export default AircraftView;
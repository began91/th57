import React from 'react';
import './InstructorView.css';
import {instructorList} from '../data/lists.js';

function InstructorView() {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Last</th>
                    <th>First</th>
                    <th>Weight</th>
                    <th>Dry</th>
                    <th>Wet</th>
                    <th>Squadron</th>
                </tr>
                {instructorList.map(instructor => {
                    return (
                        <tr key={instructor.id}>
                            <td>{instructor.lname}</td>
                            <td>{instructor.fname}</td>
                            <td>{instructor.weight}</td>
                            <td>{instructor.dry}</td>
                            <td>{instructor.wet}</td>
                            <td>{instructor.sqd}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default InstructorView;
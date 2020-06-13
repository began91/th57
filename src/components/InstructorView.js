import React from 'react';
import './InstructorView.css';
import {instructorList} from '../helpers/lists.js';

class InstructorView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instructorList,
            sortedBy: ''
        };
        this.onSort = this.onSort.bind(this);
    }

    onSort(e) {
        let sortMe = this.state.instructorList;
        if (this.state.sortedBy !== e.target.className) {
            sortMe.sort((a,b) => (a[e.target.className] > b[e.target.className]));
            this.setState({sortedBy: e.target.className})
        } else {
            //sort in reverse and unset sortedBy
            sortMe.sort((a,b) => (a[e.target.className] < b[e.target.className]));
            this.setState({sortedBy: ''})
        }
        this.setState({instructorList: sortMe});
    }

    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th onClick={this.onSort} className="name">Name</th>
                        <th onClick={this.onSort} className="weight">Weight</th>
                        <th onClick={this.onSort} className="dry">Dry</th>
                        <th onClick={this.onSort} className="wet">Wet</th>
                        <th onClick={this.onSort} className="sqd">Squadron</th>
                    </tr>
                    {instructorList.map(instructor => {
                        return (
                            <tr key={instructor.id}>
                                <td>{instructor.name}</td>
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
}

export default InstructorView;
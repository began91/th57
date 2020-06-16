import React from 'react';
import { connect } from 'react-redux';
import './ViewButtons.css';
import {setValue} from '../actions/Actions';


class ViewButtons extends React.Component {
    constructor(props) {
        super(props);
        this.handleViewChange = this.handleViewChange.bind(this);
    }

    handleViewChange(e) {
        this.props.setValue('view',e.target.value);
    }
// AC-view INST-view
    render() {
        return (
            <div className="change-display">
                <button className={this.props.view === "WB" ? 'selected' : ''} value="WB" onClick={this.handleViewChange}>Weight &amp;<br/>Balance</button>
                <button className={this.props.view === "AC" ? 'selected' : ''} value="AC" onClick={this.handleViewChange}>Aircraft<br/>List</button>
                <button className={this.props.view === "INST" ? 'selected' : ''} value="INST" onClick={this.handleViewChange}>Instructor<br/>List</button>
                <button className={this.props.view === "ABOUT" ? 'selected' : ''} value="ABOUT" onClick={this.handleViewChange}>How To<br/>Use</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    view: state.app.view
});

export default connect(mapStateToProps, {setValue})(ViewButtons);
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
                <button className={this.props.view === "WB" ? 'selected' : ''} value="WB" onClick={this.handleViewChange}>Wt &amp;<br/>Bal</button>
                {/* <button className={this.props.view === "ORM" ? 'selected' : ''} value="ORM" onClick={this.handleViewChange}>HT-28<br/>ORM</button> */}
                <button className={this.props.view === "AC" ? 'selected' : ''} value="AC" onClick={this.handleViewChange}>A/C<br/>List</button>
                <button className={this.props.view === "INST" ? 'selected' : ''} value="INST" onClick={this.handleViewChange}>Inst<br/>List</button>
                <button className={this.props.view === "ABOUT" ? 'selected' : ''} value="ABOUT" onClick={this.handleViewChange}>How To<br/>Use</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    view: state.app.view
});

export default connect(mapStateToProps, {setValue})(ViewButtons);
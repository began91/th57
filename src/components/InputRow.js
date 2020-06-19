import React from 'react';
import {connect} from 'react-redux';
import { setValue } from '../actions/Actions';

class InputRow extends React.Component {
    constructor(props) {
        super(props);

        this.col2 = this.col2.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.props.setValue([e.target.className], Number(e.target.value));
    }

    col2() {
        if (this.props.gray2) {
            return (<td className="col2 gray"></td>);
        } else {
            return <td className="col2">{this.col3()}</td>
        }
    }

    col3() {
        return (<input type="number" pattern="[0-9]*" className={this.props.id} value={this.props[this.props.id]} onChange={this.handleInput} />)
    }

    render() {
        return (
            <tr className={(this.props.ext ? "ext" : "")}>
                <th className="row-head">{this.props.head}</th>
                {this.col2()}
                <td>{this.col3()}</td>
                <td>{this.props.col4}</td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    pax: state.app.pax,
    baggage: state.app.baggage,
    paxExternal: state.app.paxExternal,
    extLoad: state.app.extLoad,
});

export default connect(mapStateToProps, {setValue})(InputRow);

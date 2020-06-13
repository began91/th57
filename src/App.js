import React from 'react';
import { connect } from 'react-redux';
import { setValue, setURL } from './actions/Actions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';
import Form from './components/Form.js';
import Results from './components/Results.js';
import AircraftView from './components/AircraftView.js';
import InstructorView from './components/InstructorView.js';

//console.log(window.location.search);
//console.log(new URLSearchParams(window.location.search))
//console.log(parsePath(window.location.search));

class App extends React.Component {
  constructor(props) {
    super(props);

    const fnsToBind=['handleViewChange','updatePermalink'];
    fnsToBind.forEach(fn => {
        this[fn] = this[fn].bind(this);
      }
    )
  }

  handleViewChange(e) {
    this.props.setValue('view', e.target.value);
  }

  updatePermalink() {
    let url = window.location.origin + '/th57?';
    console.log(this.props.results);
    console.log(this.props.form);
    console.log(this.props.app);
    Object.entries(this.props.form).forEach(([key,value]) => {
      url += (key + '=' + value + '&');
    })
    Object.entries(this.props.results).forEach(([key,value]) => {
      url += (key + '=' + value + '&');
    })
    Object.entries(this.props.app).forEach(([key,value]) => {
      url += (key + '=' + value + '&');
    })
    console.log(url)
    this.props.setURL(url);
    //window.location.search = url;
  }

  componentDidMount() {
    this.updatePermalink();
  }

  componentDidUpdate() {
    this.updatePermalink();
  }

  render() {
    return (
      <div className="App">
        <style>
          {'.WB-view, .AC-view, .INST-view {display:none;}'}
          {'.'+this.props.app.view + '-view {display:block;}'}
        </style>
        <header className="App-header">
          <div className="logo-holder">
            <img src={require('./images/helo.png')} alt="" className="helo" />
            <img src={require('./images/rotor.png')} alt="" className="rotor App-logo" />
          </div>
          <span>TH-57 Weight and Balance</span>
        </header>
        <div className="WB-view">
          <Form/>
          <Results/>
        </div>
        <div className="change-display AC-view INST-view">
          <button className={this.props.app.view === "WB" ? 'selected' : ''} value="WB" onClick={this.handleViewChange}>W&amp;B</button>
          <button className={this.props.app.view === "AC" ? 'selected' : ''} value="AC" onClick={this.handleViewChange}>A/C List</button>
          <button className={this.props.app.view === "INST" ? 'selected' : ''} value="INST" onClick={this.handleViewChange}>Inst List</button>
        </div>
        <div className="AC-view">
          <AircraftView />
        </div>
        <div className="INST-view">
          <InstructorView />
        </div>
        <div className="change-display">
          <button className={this.props.app.view === "WB" ? 'selected' : ''} value="WB" onClick={this.handleViewChange}>W&amp;B</button>
          <button className={this.props.app.view === "AC" ? 'selected' : ''} value="AC" onClick={this.handleViewChange}>A/C List</button>
          <button className={this.props.app.view === "INST" ? 'selected' : ''} value="INST" onClick={this.handleViewChange}>Inst List</button>
        </div>
        <CopyToClipboard className="permalink" text={this.props.url}>
          <button>Copy Permalink</button>
        </CopyToClipboard>  
          <p>{this.props.url}</p>
        <footer>
          <p>Not currently an approved source of weight and balance for TW-5 TH-57 aircrews. Report any discrepancies, bugs, or feature requests to <a href="mailto:began91@yahoo.com?subject=TH-57 Weight and Balance Notification&amp;body=Please note the following discrepancy, bug, or feature request:">began91@yahoo.com</a>.</p>
          <p>&copy; 2020</p>
        </footer>
      </div>
    );
  }
}

export default connect(state => state, {setValue, setURL})(App);

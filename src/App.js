import React from 'react';
import { connect } from 'react-redux';
import { setValue, setURL, resetState } from './actions/Actions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';
import Form from './components/Form';
import Results from './components/Results';
import AircraftView from './components/AircraftView';
import InstructorView from './components/InstructorView';
import ViewButtons from './components/ViewButtons';
import ScrollingWrapper from './components/ScrollingWrapper';
import { presets } from './helpers/initialState';

//console.log(window.location.search);
//console.log(new URLSearchParams(window.location.search))
//console.log(parsePath(window.location.search));

class App extends React.Component {
  constructor(props) {
    super(props);

    const fnsToBind=['handleViewChange','updatePermalink','resetForm','setViewWB'];
    fnsToBind.forEach(fn => {
        this[fn] = this[fn].bind(this);
      }
    )
  }

  handleViewChange(e) {
    this.props.setValue('view', e.target.value);
  }

  setViewWB(e) {
    this.props.setValue('view', 'WB');
  }

  updatePermalink() {
    //console.log('updating permalink')
    let url = window.location.origin + '?';
    Object.entries(this.props.app).forEach(([key,value]) => {
      if (presets[key] !== value) {
        url += (key + '=' + value + '&');
      }
    });
    url = encodeURI(url);
    this.props.setURL(url);
    window.history.pushState(this.props.app,this.props.app.stud + ' ' +this.props.app.inst, url);
  }

  resetForm(e) {
    this.props.resetState();
  }

  componentDidMount() {
    this.updatePermalink();
    //console.log('mount');
  }
  
  componentDidUpdate() {
    //console.log('update');
    this.updatePermalink();
  }

  render() {
    return (
      <div className="App">
        <style>
          {'.WB-view, .AC-view, .INST-view {display:none;}'}
          {'.'+this.props.app.view + '-view {display:block;}'}
        </style>
        <header className="App-header" onClick={this.setViewWB}>
          <div className="logo-holder">
            <img src={require('./images/helo.png')} alt="" className="helo" />
            <img src={require('./images/rotor.png')} alt="" className="rotor App-logo" />
          </div>
          <span>TH-57 Weight and Balance</span>
        </header>
        <ViewButtons/>
        <div className="WB-view">
          <Form/>
          <Results/>
        </div>
        <div className="AC-view">
          <AircraftView />
        </div>
        <div className="INST-view">
          <InstructorView />
        </div>
        <CopyToClipboard className="permalink App-button" text={this.props.url}>
          <button>Copy Permalink</button>
        </CopyToClipboard> 

        <button className="App-button" onClick={this.resetForm}>Reset Form</button>
        <footer>
          <p>Not currently an approved source of weight and balance for TW-5 TH-57 aircrews. Report any discrepancies, bugs, or feature requests to <a href="mailto:admin@th57.us?subject=TH-57 Weight and Balance Notification&amp;body=Please note the following discrepancy, bug, or feature request:">admin@th57.us</a>.</p>
          <p>&copy; 2020</p>
        </footer>
        <ScrollingWrapper/>
      </div>
    );
  }
}

export default connect(state => state, {setValue, setURL, resetState})(App);

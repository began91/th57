import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Form from './components/Form.js';
import Results from './components/Results.js';
import AircraftView from './components/AircraftView.js';
import InstructorView from './components/InstructorView.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instWt: 210,
      studWt: 195,
      aircraft: {
        side: 'N/A',
        series: 'B',
        weight: 0,
        moment: 0,
        display: 'N/A B',
        id: 'N/AB'
      },
      da: 1423,
      view: 'INST'
    }
    const fnsToBind=['onDAChange','onStudWtChange','onInstWtChange','onAircraftChange','handleViewChange'];
    fnsToBind.forEach(fn => {
        this[fn] = this[fn].bind(this);
      }
    )
  }

  onDAChange(da) {
    this.setState({da: da});
  }

  onStudWtChange(weight) {
    this.setState({studWt: weight});
  }

  onInstWtChange(weight) {
    this.setState({instWt: weight});
  }

  onAircraftChange(aircraft) {
    this.setState({aircraft: aircraft});
  }

  handleViewChange(e) {
    this.setState({view: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <style>
          {'.WB-view, .AC-view, .INST-view {display:none;}'}
          {'.'+this.state.view + '-view {display:block;}'}
        </style>
        <header className="App-header">
          <div className="logo-holder">
            <img src={require('./images/helo.png')} alt="" className="helo" />
            <img src={require('./images/rotor.png')} alt="" className="rotor App-logo" />
          </div>
          <span>TH-57 Weight and Balance</span>
        </header>
        <div className="WB-view">
          <Form 
          da={this.state.da} 
          onDAChange={this.onDAChange} 
          studWt={this.state.studWt} onStudWtChange={this.onStudWtChange} 
          instWt={this.state.instWt}
          onInstWtChange={this.onInstWtChange}
          aircraft={this.state.aircraft}
          onAircraftChange={this.onAircraftChange} />
          
          <Results da={this.state.da} crewFwd={this.state.studWt + this.state.instWt} aircraft={this.state.aircraft} />
        </div>
        <div className="change-display AC-view INST-view">
          <button className={this.state.view === "WB" ? 'selected' : ''} value="WB" onClick={this.handleViewChange}>W&amp;B</button>
          <button className={this.state.view === "AC" ? 'selected' : ''} value="AC" onClick={this.handleViewChange}>A/C List</button>
          <button className={this.state.view === "INST" ? 'selected' : ''} value="INST" onClick={this.handleViewChange}>Inst List</button>
        </div>
        <div className="AC-view">
          <AircraftView />
        </div>
        <div className="INST-view">
          <InstructorView />
        </div>
        <div className="change-display">
          <button className={this.state.view === "WB" ? 'selected' : ''} value="WB" onClick={this.handleViewChange}>W&amp;B</button>
          <button className={this.state.view === "AC" ? 'selected' : ''} value="AC" onClick={this.handleViewChange}>A/C List</button>
          <button className={this.state.view === "INST" ? 'selected' : ''} value="INST" onClick={this.handleViewChange}>Inst List</button>
        </div>  
        <footer>
          <p>Not currently an approved source of weight and balance for TW-5 TH-57 aircrews. Report any discrepancies, bugs, or feature requests to <a href="mailto:began91@yahoo.com?subject=TH-57 Weight and Balance Notification&amp;body=Please note the following discrepancy, bug, or feature request:">began91@yahoo.com</a>.</p>
          <p>&copy; 2020</p>
        </footer>
      </div>
    );
  }
}

export default App;

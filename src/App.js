import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Form from './components/Form.js';
//import Survey from './components/Survey.js';
import Results from './components/Results.js';

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
      view: 'WB'
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
    console.log(this.state.view);
    console.log(e.target.value);
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
          TH-57 Weight and Balance
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
        <div className="AC-view">
          aircraft
        </div>
        <div className="INST-view">
          instructors
        </div>
        <footer>
          <div id="change-display">
            <button id="show-results" className={this.state.view === "WB" ? 'selected' : ''} value="WB" onClick={this.handleViewChange}>W&B</button>
            <button id="show-aircraft" className={this.state.view === "AC" ? 'selected' : ''} value="AC" onClick={this.handleViewChange}>A/C List</button>
            <button id="show-instructors" className={this.state.view === "INST" ? 'selected' : ''} value="INST" onClick={this.handleViewChange}>Inst List</button>
          </div>  
          <p>Not currently an approved source of weight and balance for TW-5 TH-57 aircrews. Report any discrepancies, bugs, or feature requests to <a href="mailto:began91@yahoo.com?subject=TH-57 Weight and Balance Notification&body=Please note the following discrepancy, bug, or feature request:">began91@yahoo.com</a>.</p>
        </footer>
      </div>
    );
  }
}

export default App;

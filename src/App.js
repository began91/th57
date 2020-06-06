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
      da: 1423
    }
    const fnsToBind=['onDAChange','onStudWtChange','onInstWtChange','onAircraftChange'];
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          TH-57 Weight and Balance
        </header>
        
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
    );
  }
}

export default App;

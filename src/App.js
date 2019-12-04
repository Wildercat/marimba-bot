import React from 'react';
import Header from './Header';
import Song from './Song';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: null
    }
  }

  initArray(width, height) {
    // Initialize empty 2d array
    let arr = [];
    for (let idx = 0; idx < height; idx++) {
      let jrr = [];
      for (let jdx = 0; jdx < width; jdx++) {
        jrr.push(0);
      }
      arr.push(jrr);
    }
    return arr;
  }

  render() {
    return (
      //React Router currently not necessary, but will be needed in the future
      <Router>
        <div className='container' >
          <Header />
          <Switch>
            <Route exact path="/">
              <Song song_id={null} array={this.initArray(5, 16)} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

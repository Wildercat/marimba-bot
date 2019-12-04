import React from 'react';
import axios from 'axios';
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

  async createHistory(song_id) {
    let response;
    const post = { song_id: song_id }
    try {
      response = await axios.post('https://marimba-bot-259814.appspot.com/api/history', post)
    } catch (error) {
      // Error 
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error);
    }
  }

  async getSong(song_id) {
    let response;
    try {
      response = await axios.get('http://127.0.0.1:8000/api/songs/' + song_id)
    } catch (error) {
      // Error 
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error);
    }
    this.setState({ song: JSON.parse(response.data.data) });
  }

  initArray(width, height) {
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

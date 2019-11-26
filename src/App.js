import React from 'react';
import axios from 'axios';
import Home from './Home';
import Song from './Song';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
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
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
    console.log(response.data);
  }

  async getSong(song_id) {
    let response;
    try {
      response = await axios.get('http://127.0.0.1:8000/api/songs/' + song_id)
    } catch (error) {
      // Error 
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
    console.log(response.data);
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
    // console.log(arr);
    return arr;
  }

  // songViewer() {
  //   console.log(this.state.song);
  //   let { song_id } = useParams();
  //   console.log(song_id);
  //   if (this.state.song) {
  //     return (
  //       <Song song_id={null} array={this.state.song} />
  //     )
  //   } else {
  //     this.getSong(song_id);
  //     return <h1>loading</h1>
  //   }
  // }

  render() {
    // this.createHistory(43);
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            {/* <Route path="/songs/53">
              {this.songViewer(53)}
            </Route> */}
            <Route exact path="/">
              <Song song_id={null} array={this.initArray(5, 16)} />
            </Route>
            {/* <Route path="/:id" children={this.songViewer()} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

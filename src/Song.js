import React from 'react';
import axios from 'axios';

import Grid from './Grid';

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: this.props.array,
            song_id: this.props.song_id
        }
        this.handleSubmitSong = this.handleSubmitSong.bind(this);
        this.handlePlaySong = this.handlePlaySong.bind(this);
    }

    async createSong(song_array) {
        let response;
        const post = { data: JSON.stringify(song_array) }
        try {
            response = await axios.post('http://127.0.0.1:8000/api/songs', post)
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
        this.setState({song_id: response.data.id})
    }

    handleClick(i, j) {
        console.log({ i, j });
        let arr = this.state.arr;
        arr[i][j] = arr[i][j] ? 0 : 1;
        this.setState({ arr: arr });
    }


    handleSubmitSong() {
        console.log(this.state.arr);
        this.createSong(this.state.arr);
    }

    async createHistory() {
        let response;
        const post = { song_id: this.state.song_id }
        try {
            response = await axios.post('http://127.0.0.1:8000/api/history', post)
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

    handlePlaySong() {
        this.createHistory();
    }

    playButton() {
        return this.state.song_id ? (
            <button onClick={this.handlePlaySong} type='button' className="btn btn-danger">Play Song</button>
        ) : null;
    }

    // PlayButton() {
    //     const id = this.state.song_id;
    //     return id ? (
    //         <p>{id}</p>
    //     ) : (

    //     );
    // }

    render() {
        const Renderedarray = this.state.arr;

        return (
            <>
                <p>songhere</p>
                <Grid onClick={(i, j) => this.handleClick(i, j)} array={Renderedarray} size={2} />
                <button onClick={this.handleSubmitSong} type="button" className="btn btn-primary">Save Song</button>
                {this.playButton()}
                {/* <button onClick={this.handlePlaySong} type='button' className="btn btn-danger">Play Song</button> */}
            </>
        );
    }
}
 

export default Song;
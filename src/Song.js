import React from 'react';
import axios from 'axios';
import Tone from 'tone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

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
        this.handleTestSong = this.handleTestSong.bind(this);
        this.handleStopSong = this.handleStopSong.bind(this);

        this.notes = [
            'C4',
            'D4',
            'E4',
            'G4',
            'A4'
        ]
    }

    async createSong(song_array) {
        let response;
        const post = { data: JSON.stringify(song_array) }
        try {
            response = await axios.post('https://marimba-bot-259814.appspot.com/api/songs', post)
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
        this.setState({ song_id: response.data.id })
    }

    handleClick(i, j) {
        console.log({ i, j });
        let arr = this.state.arr;
        arr[i][j] = arr[i][j] ? 0 : 1;
        this.triggerSynth(this.notes[j]);
        this.setState({ arr: arr });
    }

    async submitAndPlay() {
        await this.createSong(this.state.arr);
        this.createHistory();
    }


    handleSubmitSong() {
        this.submitAndPlay();
        // console.log(this.state.arr);
        // this.createSong(this.state.arr);
    }

    async createHistory() {
        let response;
        const post = { song_id: this.state.song_id }
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

    handlePlaySong() {
        this.createHistory();
    }

    // --------- Visual/Styling -----------

    renderArray() {
        let rendered = this.state.arr.map((item, idx) => {
            return item.map((jtem, jdx) => {
                return (
                    <div style={{
                        background: `${!jtem ? '#3fc1c9' : '#fc5185'}`,
                        height: '100%'
                    }} ></div>
                )
            })
        });
        return rendered;
    }

    // PlayButton() {
    //     const id = this.state.song_id;
    //     return id ? (
    //         <p>{id}</p>
    //     ) : (

    //     );
    // }

    // -------- Local Music Playback -----------
    triggerSynth(note) {
        let synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(note, '8n', undefined, .5);
    }

    handleTestSong() {
        let keys = new Tone.Players({
            "C": "/tones/c.wav",
            "D": "/tones/d.wav",
            "E": "/tones/e.wav",
            "G": "/tones/g.wav",
            "A": "/tones/a.wav",
        }, {
            "volume": -10,
            "fadeOut": "64n",
        }).toMaster();
        console.log('just checking');
        // const ns = this.notes;
        const ns = ['C', 'D', 'E', 'G', 'A'];
        let synth = new Tone.Synth().toMaster();
        let songArr = this.state.arr;
        var loop = new Tone.Sequence(function (time, col) {
            songArr[col].map((item, idx) => {
                if (item) {
                    console.log(idx);
                    var vel = Math.random() * 0.5 + 0.5;
                    keys.get(ns[idx]).start(time, 0, '16n', 0, vel);
                    // synth.triggerAttackRelease(ns[idx], '8n', time);
                }
            })
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "8n").start(0);
        Tone.Transport.start();
    }

    handleStopSong() {
        Tone.Transport.stop();
    }

    render() {
        const Renderedarray = this.renderArray();
        console.log(Renderedarray);
        return (
            <>
                <div className='row justify-content-center m-0 p-3'>

                    <Grid onClick={(i, j) => this.handleClick(i, j)} array={Renderedarray} size={2} />
                </div>
                {/* <button onClick={this.handleTestSong} type="button" className="btn btn-warning">Test Song</button>
                <button onClick={this.handleStopSong} type="button" className="btn btn-warning">Stop Song</button> */}
                <div className='row justify-content-center' >


                    <button onClick={this.handleSubmitSong} type="button" className="btn btn-danger">
                        Play Song
                    </button>
                </div>

            </>
        );
    }
}


export default Song;
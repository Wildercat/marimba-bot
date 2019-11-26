import React from 'react';
import axios from 'axios';
import Tone from 'tone';

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


    handleSubmitSong() {
        console.log(this.state.arr);
        this.createSong(this.state.arr);
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

    // -------- Local Music Playback -----------
    triggerSynth(note) {
        let synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(note, '8n');
    }

    handleTestSong() {
        let keys = new Tone.Players({
            "C": "/tones/c.wav",
            "D": "/tones/d.wav",
            "E": "/tones/e.wav",
            "G": "/tones/g.wav",
            "A": "/tones/a.wav",
        }, {
            "volume": 0,
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
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "4n").start(0);
        Tone.Transport.start();
    }

    exampleSequence() {
        //setup a polyphonic sampler
        var keys = new Tone.Players({
            "A": "./audio/casio/A1.[mp3|ogg]",
            "C#": "./audio/casio/Cs2.[mp3|ogg]",
            "E": "./audio/casio/E2.[mp3|ogg]",
            "F#": "./audio/casio/Fs2.[mp3|ogg]",
        }, {
            "volume": -10,
            "fadeOut": "64n",
        }).toMaster();
        //the notes
        var noteNames = ["F#", "E", "C#", "A"];
        var loop = new Tone.Sequence(function (time, col) {
            var column = document.querySelector("tone-step-sequencer").currentColumn;
            column.forEach(function (val, i) {
                if (val) {
                    //slightly randomized velocities
                    var vel = Math.random() * 0.5 + 0.5;
                    keys.get(noteNames[i]).start(time, 0, "32n", 0, vel);
                }
            });
            //set the columne on the correct draw frame
            // Tone.Draw.schedule(function(){
            // 	document.querySelector("tone-step-sequencer").setAttribute("highlight", col);
            // }, time);
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);
        //bind the interface
        // document.querySelector("tone-transport").bind(Tone.Transport);
        // Tone.Transport.on("stop", () => {
        // 	setTimeout(() => {
        // 		document.querySelector("tone-step-sequencer").setAttribute("highlight", "-1");
        // 	}, 100);
        // });
    }

    render() {
        const Renderedarray = this.state.arr;
        return (
            <>
                <p>songhere</p>
                <Grid onClick={(i, j) => this.handleClick(i, j)} array={Renderedarray} size={2} />
                <button onClick={this.handleTestSong} type="button" className="btn btn-warning">Test Song</button>
                <button onClick={this.handleSubmitSong} type="button" className="btn btn-primary">Save Song</button>
                {this.playButton()}
                {/* <button onClick={this.handlePlaySong} type='button' className="btn btn-danger">Play Song</button> */}
            </>
        );
    }
}


export default Song;
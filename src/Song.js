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

        this.notes = [
            'C4',
            'D4',
            'E4',
            'G4',
            'A4'
        ]
    }

    
    async createSong(song_array) {
        // Create a new song entry, then store it's ID in state
        let response;
        const post = { data: JSON.stringify(song_array) }
        try {
            response = await axios.post('https://marimba-bot-259814.appspot.com/api/songs', post)
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
        this.setState({ song_id: response.data.id })
    }

    handleClick(i, j) {
        // When a tile is clicked, flip it's value
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
    }

    async createHistory() {
        // Create a new history entry using the current song ID
        let response;
        const post = { song_id: this.state.song_id }
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

    handlePlaySong() {
        this.createHistory();
    }

    // --------- Visual/Styling -----------

    renderArray() {
        // from the data array, create the array with the correct contents to be passed to the Grid component
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

    // -------- Local Music Playback -----------
    triggerSynth(note) {
        let synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(note, '8n', undefined, .5);
    }

    render() {
        const Renderedarray = this.renderArray();
        return (
            <>
                <div className='row justify-content-center m-0 p-3'>

                    <Grid onClick={(i, j) => this.handleClick(i, j)} array={Renderedarray} size={2} />
                </div>
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
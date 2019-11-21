import React from 'react';
import axios from 'axios';

import Grid from './Grid';

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: this.initArray()
        }
    }

    handleClick(i,j) {
        console.log({i,j});
        let arr = this.state.arr;
        arr[i][j] = !arr[i][j];
        this.setState({arr: arr});
    }
    initArray() {
        let width = this.props.width;
        let height = this.props.height;

        let arr = [];
        for (let idx = 0; idx < height; idx++) {
            let jrr = [];
            for (let jdx = 0; jdx < width; jdx++) {
                jrr.push(0);
            }
            arr.push(jrr);
        }
        console.log(arr);
        return arr;
    }
    componentDidMount() {
        this.setState({arr: this.initArray()})
    }
    render() {
        const Renderedarray = this.state.arr;

        return (
            <>
            <p>songhere</p>
            <Grid onClick={(i, j) => this.handleClick(i, j)} array={Renderedarray} size={2} />
            </>
        );
    }
}
 
export default Song;
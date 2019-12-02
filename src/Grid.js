import React from 'react';

class Col extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const dims = this.props.dims;
        let styling = {
            height: dims.height * dims.size / dims.height + 'em',
            width: dims.width * dims.size / dims.width + 'em',
            overflow: 'hidden'
        }
        return (
            <div onClick={this.props.onClick} data-j={this.props.idx} className='col p-0 border grid_tile rounded' style={styling}>
                {this.props.children}
            </div>
        );
    }
}

class Row extends React.Component {
    constructor(props) {
        super(props);
    }
    makeCols() {        
        return this.props.array.map((item, idx) => {
            return (
                <Col onClick={() => this.props.onClick(idx)} idx={idx} key={idx} dims={this.props.dims}>
                    {item}
                    </Col>
            );
        })
    }
    render() {
        return (
            <div data-i={this.props.idx} className='row p-0 m-0' style={{width: this.props.dims.width * this.props.dims.size + 'em'}}>
                {this.makeCols()}
            </div>
        )
    }
}


class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.dims = {
            height: this.props.array.length,
            width: this.props.array[0].length,
            size: this.props.size
        }
    }

    makeRows() {
        return this.props.array.map((item, idx) => {
            return (
                <Row onClick={(j) => this.props.onClick(idx,j)} key={idx} idx={idx} dims={this.dims} array={item} />
            )
        })
        
    }
    render() {
        let styling = {
            height: this.dims.height * this.dims.size + 'em',
            width: this.dims.width * this.dims.size + 'em',
        }
        return (
            <div className='container p-0' style={styling}>
                {this.makeRows()}
            </div>
        );
    }
}

export default Grid;
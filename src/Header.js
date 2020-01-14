import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <>
                <div className='row justify-content-center pt-2'>
                    <h1 className='display-4 text-primary'>MarimBot</h1>
                </div>
                <div className='row justify-content-center'>
                    <p className='text-primary m-0 mb-4'>Click on the squares and press play!</p>
                </div>
                <div className='row justify-content-center'>
                    <div className="jumbotron jumbotron-fluid mb-2 py-2 rounded-lg">
                        <div className="container">
                            <h1 className="display-4">Welcome!</h1>
                            <p className="lead">MarimBot is offline for the holidays.</p>
                            <p>If you would like to learn more about it, watch the <a className="text-secondary" href="https://youtu.be/M4Lw0h49BzY" target="_blank" rel="noopener noreferrer">demo video</a>.</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Header;
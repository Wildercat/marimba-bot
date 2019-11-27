import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <>
            <div className='row justify-content-center'>
                <h1 className='display-2 text-primary'>Marimbot</h1>
            </div>
            <div className='row justify-content-center'>
                <p className='text-primary'>Click on the squares and press play</p>
            </div>
            </>
        );
    }
}

export default Header;
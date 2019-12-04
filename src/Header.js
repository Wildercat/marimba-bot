import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <>
            <div className='row justify-content-center pt-2'>
                <h1 className='display-4 text-primary'>Marimbot</h1>
            </div>
            <div className='row justify-content-center'>
                <p className='text-primary m-0'>Click on the squares and press play!</p>
            </div>
            </>
        );
    }
}

export default Header;
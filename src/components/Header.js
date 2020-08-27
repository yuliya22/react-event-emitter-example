import React from 'react'

import '../styles/Header.css';

class Header extends React.Component {
    state = { header: 'Default header' };

    

    render() {
        return (
            <header className="header">
                <h1>{this.state.header}</h1>
                <div>Header listens only to the first occurrence new input.</div>
            </header>
        )
    }
}

export default Header
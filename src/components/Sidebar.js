import React from 'react'

import '../styles/Sidebar.css';

class Sidebar extends React.Component {
    state = { sidebar: 'Default sidebar' };

   

    render() {
        return (
            <div className="sidebar">
                <h3>{this.state.sidebar}</h3>
                <div>Sidebar listens on new input all the time. Don't forget clean up when destoy component.</div>
            </div>
        )
    }
}

export default Sidebar
import React from 'react';
import Login from './Login';

function Root(props) {
    if (!props.username) {
        return (
            <Login/>
        );
    } else return <p>Username found</p>
}

export default Root;
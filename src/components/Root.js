import React from 'react';
import '../index.css';
import Input from './Input';
import fetch from 'cross-fetch';

class Root extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    render() {
        if (this.state.username === '') {
            return (
                <Input className="login" 
                       buttonText='Login' 
                       onSubmitUsername={this.setUsername} />
            );
        } else return (
            <div>
                <p>Username found: {this.state.username} </p>
            </div>
        );
    }

    setUsername = (name) => {
        postData('http://localhost:3001', { username: name })
            .then(data => {
                this.setState({ ...this.state, ...data });
                console.log(JSON.stringify(data));
            }) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
    }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
function postData(url = '', data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => response.json()); // parses JSON response into native Javascript objects 
}

export default Root;
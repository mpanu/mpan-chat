import React from 'react';
import Login from './Login';

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
                <div>{this.state.username}
                    <Login onSubmitUsername={this.setUsername}/>
                </div>
            );
        } else return (
            <div>
                <p>Username found: {this.state.username} </p>
            </div>
        );
    }

    setUsername = (name) => {
        this.setState({...this.state, username: name});
    }
}

export default Root;
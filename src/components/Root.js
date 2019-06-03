import React from 'react';
import '../index.css';
import Input from './Input';
import MessageList from './MessageList';
import { postData } from '../utils.js';

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
                <MessageList messages={this.state.messages}/>
                <Input className="message" 
                        buttonText='Send' 
                        onSubmitUsername={console.log('todo, msg send')} />
            </div>
        );
    }

    setUsername = (name) => {
        postData('http://localhost:3001', { username: name })
            .then(data => {
                this.setState({ ...this.state, ...data });                
            })
            .catch(error => console.error(error));
    }
}
export default Root;
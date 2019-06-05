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
          onSubmit={this.doLogin} />
      );
    } else return (
      <div>
        <MessageList messages={this.state.messages} />
        <Input className="message"
          buttonText='Send'
          onSubmit={this.sendMessage} />
      </div>
    );
  }

  doLogin = (name) => {
    postData('http://localhost:3001', { username: name })
      .then(data => {
        this.setState({ ...this.state, ...data });
        var exampleSocket = new WebSocket('ws://localhost:3001/ws');
        exampleSocket.onopen = function (event) {
          console.log('ws is open');
          exampleSocket.send("Here's some text that the server is urgently awaiting!"); 
        };
      })
      .catch(error => console.error(error));
  }

  sendMessage = (msg) => {
    postData('http://localhost:3001/msg', { message: msg })
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error(error));
  }

}
export default Root;
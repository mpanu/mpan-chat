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
      .then(data => { // receive old messages
        this.setState({ ...this.state, ...data });
        this.connectWebsocket();
      })
      .catch(error => console.error(error));
  }

  connectWebsocket() {
    const ws = new WebSocket('ws://localhost:3001/ws');
    // TODO send username to register at server
    ws.onmessage = this.receiveMessage;
  };

  receiveMessage(event) {
    console.log(event.data);
  }

  sendMessage = (msg) => {
    postData('http://localhost:3001/msg', { message: msg });
  };

}
export default Root;
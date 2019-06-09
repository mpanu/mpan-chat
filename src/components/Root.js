import React from 'react';
import '../index.css';
import Input from './Input';
import MessageList from './MessageList';
import { postData } from '../utils.js';

const LOGIN_REQUIRED = 'login required';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wsStatus: LOGIN_REQUIRED};
    this.receiveMessage=this.receiveMessage.bind(this);
  }

  render() {
    if (this.state.wsStatus === LOGIN_REQUIRED) {
      return (
        <Input className="login"
          buttonText='Login'
          onSubmit={this.doLogin} />
      );
    } 
    else 
      return (
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
        this.setState({...data, wsStatus: 'CONNECTED'});
        console.log('doLogin: ' + JSON.stringify(data));
        this.connectWebsocket();
      })
      .catch(error => console.error(error));
  }

  connectWebsocket() {
    const ws = new WebSocket('ws://localhost:3001/ws');    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'init-ws',
        username: this.state.username,
        channel: this.state.channel
      }));
    };
    ws.onmessage = this.receiveMessage;
  };

  receiveMessage(wsMsgEvent) {
    console.log('receiveMessage old state: ' + JSON.stringify(this.state));
    const newState = {...this.state};
    newState.messages = [...this.state.messages, JSON.parse(wsMsgEvent.data)];   
    console.log('receiveMessage: ' + JSON.stringify(newState));
    this.setState(newState);
  }

  sendMessage = (input) => {
    const msg = {
      username: this.state.username,
      channel: this.state.channel,
      date: new Date(),
      text: input,
    };
    postData('http://localhost:3001/msg', msg);
  };

}
export default Root;
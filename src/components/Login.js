import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  render = () =>
    <div>
      <input
        onChange={(e) =>
          this.setState({ username: e.target.value })} />
      <button
        onClick={() =>
          this.props.onSubmitUsername(this.state.username)}>
        Login</button>
    </div>
}

export default Login;
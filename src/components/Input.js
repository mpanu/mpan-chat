import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render = () =>
    <div className={this.props.className}>
      <input
        onChange={(e) =>
          this.setState({ text: e.target.value })} />
      <button
        onClick={() =>
          this.props.onSubmit(this.state.text)}>
        {this.props.buttonText}</button>
    </div>
}

export default Input;
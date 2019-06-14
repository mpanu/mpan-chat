import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render = () =>
    <div className={this.props.className}>
      <input
        value={this.state.text} 
        onChange={(e) =>
          this.setState({ text: e.target.value })} />
      <button
        onClick={() => {
          this.props.onSubmit(this.state.text);
          this.setState({ text: '' });
        }}>
        {this.props.buttonText}
      </button>
    </div>
}

Input.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  buttonText: PropTypes.string
};

export default Input;
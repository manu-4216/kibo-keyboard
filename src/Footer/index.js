import React, { Component } from 'react';
import Button from './../Button';

export default class Footer extends Component {
  handleDelete = () => {
    this.props.updateSymbol('DELETE');
  };
  handleSpace = () => {
    this.props.updateSymbol(' ');
  };

  render() {
    return (
      <div>
        <div className="bottom-controls">
          <Button onClick={this.handleDelete}>Delete</Button>
          <Button onClick={this.handleSpace}>Space</Button>
        </div>

        <div>
          <Button>Train</Button>
          <Button>Type</Button>
        </div>
      </div>
    );
  }
}

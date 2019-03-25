import React, { Component } from 'react';
import Symbol from './../Symbol';
import Button from './../Button';

export default class index extends Component {
  handleDelete = () => {
    this.props.updateSymbol('DELETE');
  };
  handleSpace = () => {
    this.props.updateSymbol(' ');
  };

  render() {
    const { updateSymbol } = this.props;
    const unknownSymbol = this.props.typedSymbol === undefined;

    return (
      <div className="keyboard">
        Keyboard:
        <div className="main-area">
          <Button onClick={this.handleDelete}>Delete</Button>
          <Symbol size="70" interactive updateSymbol={updateSymbol} />
          <Button onClick={this.handleSpace}>Space</Button>
        </div>
        <div />
        <div className={unknownSymbol ? 'unrecognized' : 'unrecognized hidden'}>
          Unrecognized pattern
        </div>
      </div>
    );
  }
}

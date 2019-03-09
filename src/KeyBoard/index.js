import React, { Component } from 'react';
import Symbol from './../Symbol';

export default class index extends Component {
  render() {
    const unknownSymbol = this.props.typedSymbol === undefined;

    return (
      <div className="keyboard">
        Keyboard:
        <Symbol size="70" interactive updateSymbol={this.props.updateSymbol} />
        <div />
        <div className={unknownSymbol ? 'unrecognized' : 'unrecognized hidden'}>
          Unrecognized pattern
        </div>
      </div>
    );
  }
}

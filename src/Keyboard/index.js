import React, { Component } from 'react';
import Symbol from './../Symbol';

export default class index extends Component {
  render() {
    return (
      <div className="keyboard">
        Keyboard:
        <Symbol size="70" interactive updateSymbol={this.props.updateSymbol} />
        {this.props.typedSymbol !== null ? (
          <div>{this.props.typedSymbol || 'Unrecognized pattern'}</div>
        ) : (
          <div>Use the keyboard to type symbols</div>
        )}
      </div>
    );
  }
}

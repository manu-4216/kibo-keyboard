import React, { Component } from 'react';
import Symbol from './../Symbol';

export default class index extends Component {
  render() {
    return (
      <div className="keyboard">
        Keyboard:
        <Symbol size="70" interactive />
      </div>
    );
  }
}

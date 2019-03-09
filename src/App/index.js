import React, { Component } from 'react';
import Keyboard from './../Keyboard';
import Footer from './../Footer';
import Header from './../Header';
import './App.css';

class App extends Component {
  state = { typedSymbol: null, text: '' };

  updateSymbol = typedSymbol => {
    if (typedSymbol === 'DELETE') {
      this.setState({
        typedSymbol: null,
        text: this.state.text.substring(0, this.state.text.length - 1)
      });
      return;
    }

    this.setState({
      typedSymbol
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.text === prevState.text && this.state.typedSymbol) {
      this.setState(({ text, typedSymbol }) => {
        return { text: text + typedSymbol };
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header typedSymbol={this.state.typedSymbol} />

        <Keyboard
          typedSymbol={this.state.typedSymbol}
          updateSymbol={this.updateSymbol}
        />
        <div>Text: {this.state.text}</div>

        <Footer updateSymbol={this.updateSymbol} />
      </div>
    );
  }
}

export default App;

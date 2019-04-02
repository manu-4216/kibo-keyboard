import React, { Component } from 'react';
import Keyboard from './../Keyboard';
import Footer from './../Footer';
import Header from './../Header';
import LettersList from './../LettersList';
import './App.css';

class App extends Component {
  state = { typedSymbol: null, text: '', needsSequenceReset: false };

  updateSymbol = typedSymbol => {
    const getNeedsSequenceReset = symbol => [' '].includes(symbol);

    if (typedSymbol === 'DELETE') {
      this.setState({
        typedSymbol: null,
        text: this.state.text.substring(0, this.state.text.length - 1),
        needsSequenceReset: true
      });
      return;
    }

    this.setState({
      typedSymbol,
      needsSequenceReset: getNeedsSequenceReset(typedSymbol)
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.text === prevState.text && this.state.typedSymbol) {
      // Reinitialize the blink animation
      document
        .querySelector('.Text-LettersList .alphabet')
        .classList.remove('Text-Blink');
      document
        .querySelector('.Text-LettersList .alphabet')
        .classList.add('Text-Blink');

      this.setState(({ text, typedSymbol }) => {
        return { text: text + typedSymbol };
      });
    }
  }

  render() {
    const formatedText = text => {
      return text.replace(/ /g, '\u00a0').split('');
    };

    return (
      <div className="App">
        <Header typedSymbol={this.state.typedSymbol} />
        <div className="Text-Label">Text:</div>

        <div className="Text-LettersList">
          <LettersList letters={formatedText(this.state.text)} />
        </div>

        <Keyboard
          typedSymbol={this.state.typedSymbol}
          updateSymbol={this.updateSymbol}
          needsSequenceReset={this.state.needsSequenceReset}
        />

        <Footer updateSymbol={this.updateSymbol} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Keyboard from './../Keyboard';
import Footer from './../Footer';
import Header from './../Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Keyboard />

        <Footer />
      </div>
    );
  }
}

export default App;

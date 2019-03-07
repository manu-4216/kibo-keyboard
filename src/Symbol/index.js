import React, { Component } from 'react';

const mapedLetterToEncoding = {
  ' ': '000000',
  // 1 dot
  a: '100000',
  b: '010000',
  c: '001000',
  d: '000100',
  e: '000010',
  f: '000001',
  // 2 dots horisontally
  g: '110000',
  h: '001100',
  i: '000011',
  // 2 dots vertically
  j: '101000',
  k: '010100',
  l: '001010',
  m: '000101',
  // 3 dots vertically
  n: '101010',
  o: '010101',
  // 3 dots (2, then 1)
  p: '111000',
  q: '110100',
  r: '001110',
  s: '001101',
  // 3 dots (1, then 2)
  t: '101100',
  u: '011100',
  v: '001011',
  w: '000111',
  // 4 dots
  x: '111010',
  y: '110101',
  z: '101011'
};

const Cell = ({ index, letter = ' ', size = '5', handleDragEnter }) => {
  const isFilled = mapedLetterToEncoding[letter][+index] === '1';
  const cellStyle = {
    height: `${size}px`,
    width: `${size}px`
  };
  return (
    <td
      onMouseEnter={handleDragEnter}
      data-index={index}
      style={cellStyle}
      className={isFilled ? 'cell-filled' : ''}
    />
  );
};

class Symbol extends Component {
  state = {
    touching: false,
    sequence: []
  };
  handleTouchStart = event => {
    const index = event.target.dataset.index;

    this.setState({ touching: true, sequence: [index] });
    // console.log('Start ', index);
  };

  handleTouchEnd = event => {
    const index = event.target.dataset.index;

    this.setState({ touching: false });
    // console.log('End ', index);
    this.identifySequence();
  };
  handleDragEnd = event => {
    const index = event.target.dataset.index;

    this.setState({ touching: false });
    // console.log('Drag End ', index);
    this.identifySequence();
  };

  handleDragEnter = event => {
    const index = event.target.dataset.index;

    if (this.state.touching) {
      this.setState({
        touching: true,
        sequence: this.state.sequence.concat(index)
      });

      // console.log('enter ', index);
    }
  };

  // Go from a sequence such as [1, 3, 2] to
  identifySequence = () => {
    // Don't do anything for the non-interactive symbols
    if (!this.props.interactive) {
      return;
    }

    let encoding = '';
    let originalSymbol;

    for (let i = 0; i < 6; i++) {
      if (this.state.sequence.includes(i.toString())) {
        encoding += '1';
      } else {
        encoding += '0';
      }
    }
    // console.log('encoding ', encoding);

    originalSymbol = Object.keys(mapedLetterToEncoding).filter(symbol => {
      return mapedLetterToEncoding[symbol] === encoding;
    })[0];
    console.log('Symbol:', originalSymbol);
  };

  render() {
    const { letter, size, interactive } = this.props;

    // Add a handler that will be passed to all the cells
    const newProps = { ...this.props, handleDragEnter: this.handleDragEnter };

    return (
      <table
        onMouseDown={this.handleTouchStart}
        onMouseUp={this.handleTouchEnd}
        onDragEnd={this.handleDragEnd}
      >
        <tbody>
          <tr>
            <Cell index="0" {...newProps} />
            <Cell index="1" {...newProps} />
          </tr>
          <tr>
            <Cell index="2" {...newProps} />
            <Cell index="3" {...newProps} />
          </tr>
          <tr>
            <Cell index="4" {...newProps} />
            <Cell index="5" {...newProps} />
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Symbol;

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
  // 2 dots horizontally
  t: '110000',
  h: '001100',
  u: '000011',
  // 2 dots vertically
  i: '101000',
  j: '010100',
  m: '001010',
  n: '000101',
  // 3 dots vertically
  k: '101010',
  l: '010101',
  // 3 dots (2, then 1)
  r: '111000',
  w: '110100',
  s: '001110',
  q: '001101',
  // 3 dots (1, then 2)
  v: '101100',
  g: '011100',
  o: '001011',
  p: '000111',
  // 4 dots
  x: '111010',
  y: '010111',
  z: '110101'
};

const Cell = ({ index, letter = '\u00a0', size, handleMove, touched }) => {
  let cellStyle = {};

  if (letter === '\u00a0') {
    letter = ' ';
  }

  const isFilled = mapedLetterToEncoding[letter][+index] === '1';

  if (size) {
    cellStyle = {
      height: `${size}px`,
      width: `${size}px`
    };
  }

  let className = '';

  if (isFilled) {
    className += ' cell-filled';
  }

  if (touched) {
    className += ' cell-touched';
  }
  return (
    <td
      onMouseEnter={handleMove}
      onMouseMove={handleMove}
      onDragOver={handleMove}
      onMouseOver={handleMove}
      onTouchMove={handleMove}
      onPointerMove={handleMove}
      onPointerOver={handleMove}
      onDragEnter={handleMove}
      data-index={index}
      style={cellStyle}
      className={className}
    />
  );
};

class Symbol extends Component {
  constructor(props) {
    super(props);

    this.keyboardRef = React.createRef();

    this.state = {
      touching: false,
      sequence: [],
      previousIndex: null
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.interactive) {
      return;
    }

    if (!prevProps.needsSequenceReset && this.props.needsSequenceReset) {
      this.setState({ sequence: [] });
    }
  }

  handleStart = event => {
    const index = event.target.dataset.index;

    this.setState({
      touching: true,
      sequence: [+index],
      previousIndex: +index
    });
  };

  handleDoubleClick = event => {};

  handleEnd = event => {
    // Needed to avoid having the end event triggered twice to touch devices
    if (event.type === 'touchend') {
      event.preventDefault();
    }

    this.setState({ touching: false, previousIndex: null });
    this.identifySequence();
  };

  handleMove = event => {
    let x = event.pageX;
    let y = event.pageY;

    if (event.type === 'touchmove') {
      x = event.touches[0].pageX;
      y = event.touches[0].pageY;
    }

    const index = this.getCellIndex(x, y);

    if (this.state.touching && this.state.previousIndex !== index) {
      this.setState({
        sequence: this.state.sequence.concat(index),
        previousIndex: +index
      });
    }
  };

  // get the cell index from the pageX and pageY
  getCellIndex = (x, y) => {
    const keyboardOrigin = this.keyboardRef.current.getBoundingClientRect();
    const cellSize = +this.props.size;
    let dx, dy, cellXIndex, cellYIndex;

    dx = x - keyboardOrigin.left;
    dy = y - keyboardOrigin.top;

    cellXIndex = Math.floor(dx / cellSize);
    cellYIndex = Math.floor(dy / cellSize);

    return 2 * cellYIndex + cellXIndex;
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
      if (this.state.sequence.includes(i)) {
        encoding += '1';
      } else {
        encoding += '0';
      }
    }

    originalSymbol = Object.keys(mapedLetterToEncoding).filter(symbol => {
      return mapedLetterToEncoding[symbol] === encoding;
    })[0];

    this.props.updateSymbol(originalSymbol);
  };

  isTouched = (index, sequence) => {
    return this.props.interactive && sequence.includes(index);
  };

  render() {
    const { letter, typedSymbol } = this.props;

    // Add a handler that will be passed to all the cells
    const newProps = {
      ...this.props,
      handleMove: this.handleMove
    };

    const isTyped = typedSymbol && typedSymbol === letter;

    return (
      <table
        className={isTyped ? 'typed-letter' : ''}
        onMouseDown={this.handleStart}
        onTouchStart={this.handleStart}
        onTouchEnd={this.handleEnd}
        onDragEnd={this.handleEnd}
        onMouseUp={this.handleEnd}
        onDoubleClick={this.handleDoubleClick}
        ref={this.keyboardRef}
      >
        <tbody>
          <tr>
            <Cell
              index="0"
              {...newProps}
              touched={this.isTouched(0, this.state.sequence)}
            />
            <Cell
              index="1"
              {...newProps}
              touched={this.isTouched(1, this.state.sequence)}
            />
          </tr>
          <tr>
            <Cell
              index="2"
              {...newProps}
              touched={this.isTouched(2, this.state.sequence)}
            />
            <Cell
              index="3"
              {...newProps}
              touched={this.isTouched(3, this.state.sequence)}
            />
          </tr>
          <tr>
            <Cell
              index="4"
              {...newProps}
              touched={this.isTouched(4, this.state.sequence)}
            />
            <Cell
              index="5"
              {...newProps}
              touched={this.isTouched(5, this.state.sequence)}
            />
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Symbol;

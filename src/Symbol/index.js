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

const Cell = ({ index, letter = ' ', size = '5' }) => {
  const isFilled = mapedLetterToEncoding[letter][+index] === '1';
  const cellStyle = {
    height: `${size}px`,
    width: `${size}px`
  };
  return <td style={cellStyle} className={isFilled ? 'cell-filled' : ''} />;
};
class Symbol extends Component {
  render() {
    const { letter, size } = this.props;
    console.log(letter);

    return (
      <table>
        <tr>
          <Cell index="0" {...this.props} />
          <Cell index="1" {...this.props} />
        </tr>
        <tr>
          <Cell index="2" {...this.props} />
          <Cell index="3" {...this.props} />
        </tr>
        <tr>
          <Cell index="4" {...this.props} />
          <Cell index="5" {...this.props} />
        </tr>
      </table>
    );
  }
}

export default Symbol;

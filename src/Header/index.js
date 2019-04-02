import React from 'react';
import LettersList from './../LettersList';

const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

const Header = ({ typedSymbol }) => (
  <div className="Header">
    <LettersList letters={letters} typedSymbol={typedSymbol} />
  </div>
);
export default Header;

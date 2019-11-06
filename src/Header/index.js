import React from 'react';
import LettersList from './../LettersList';
import Button from '../Button';

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

const handleToggleHints = () => {
  const textAreaElem = document.querySelector('.Text-LettersList');

  textAreaElem.classList.toggle('hide-letters');
};

const Header = ({ typedSymbol }) => (
  <div className="Header">
    <LettersList letters={letters} typedSymbol={typedSymbol} />
    <Button onClick={handleToggleHints}>Toggle letters</Button>
  </div>
);
export default Header;

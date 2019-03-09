import React from 'react';
import Symbol from './../Symbol';

const Alphabet = ({ letters, typedSymbol }) => (
  <ul className="alphabet">
    {letters.map(letter => (
      <li key={letter} className="letter-pair">
        <span className="letter">{letter}</span>
        <span className="converted">
          <Symbol letter={letter} typedSymbol={typedSymbol} />
        </span>
      </li>
    ))}
  </ul>
);

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
  <div>
    Help:
    <Alphabet letters={letters} typedSymbol={typedSymbol} />
  </div>
);
export default Header;

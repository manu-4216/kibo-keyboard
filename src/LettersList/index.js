import React from 'react';
import Symbol from './../Symbol';

const getClasses = letter => {
  if (letter === '\u00a0') {
    return 'letter-pair space';
  } else {
    return 'letter-pair';
  }
};

const LettersList = ({ letters, typedSymbol }) => (
  <ul className="alphabet">
    {letters.map((letter, index) => (
      <li key={index} className={getClasses(letter)}>
        <span className="letter">{letter}</span>
        <span className="converted">
          <Symbol letter={letter} typedSymbol={typedSymbol} />
        </span>
      </li>
    ))}
  </ul>
);

export default LettersList;

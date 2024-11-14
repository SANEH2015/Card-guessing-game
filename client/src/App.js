import React, { useState, useEffect } from 'react';
import Card from '../src/component/Card';

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const alphabetPairs = Array.from({ length: 18 }, (_, i) =>
      String.fromCharCode(65 + i)
    );
    let cardValues = [...alphabetPairs, ...alphabetPairs]; // Create pairs of A–R
    cardValues.sort(() => Math.random() - 0.5); // Shuffle

    setCards(cardValues.map(value => ({ value, isFlipped: false, isMatched: false })));
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  const handleCardClick = index => {
    if (flippedCards.length === 2 || cards[index].isFlipped) return;

    const newFlippedCards = [...flippedCards, index];
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (updatedCards[first].value === updatedCards[second].value) {
        updatedCards[first].isMatched = true;
        updatedCards[second].isMatched = true;
        setMatchedPairs(matchedPairs + 1);
      } else {
        setTimeout(() => {
          updatedCards[first].isFlipped = false;
          updatedCards[second].isFlipped = false;
          setCards([...updatedCards]);
        }, 1000);
      }
      setFlippedCards([]);
    } else {
      setFlippedCards(newFlippedCards);
    }
    setCards([...updatedCards]);
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 100px)',
    gap: '10px',
    justifyContent: 'center'
  };

  const appStyle = {
    textAlign: 'center'
  };

  return (
    <div style={appStyle}>
      <h1>Card Guessing Game</h1>
      <button onClick={initializeGame} style={{ margin: '20px', padding: '10px' }}>
        Reset Game
      </button>
      {matchedPairs === 18 && <p>Congratulations! You've matched all pairs!</p>}
      <div style={gridStyle}>
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            handleClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

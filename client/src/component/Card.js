import React from 'react';

const Card = ({ card, index, handleClick }) => {
  const cardStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: card.isFlipped || card.isMatched ? 'white' : 'lightblue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    userSelect: 'none',
    border: '1px solid #ddd',
    borderRadius: '8px',
  };

  return (
    <div style={cardStyle} onClick={() => handleClick(index)}>
      {card.isFlipped || card.isMatched ? card.value : 'X'}
    </div>
  );
};

export default Card;

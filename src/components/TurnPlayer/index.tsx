import React from 'react';

import './styles.scss';

interface Props {
  titleX?: string;
  titleO?: string;
  typeTurn?: 'X' | 'O';
}

function TurnPlayer({ titleX = 'Player lorem 1 lorem', titleO = 'Player lorem 2', typeTurn }: Props) {
  const typeXActive = typeTurn === 'X' ? 'Active' : '';
  const typeOActive = typeTurn === 'O' ? 'Active' : '';

  return (
    <div className="turnPlayers">
      <div className={`turnLeft${typeXActive}`}>
        <span className={`turnTypeX${typeXActive}`}>X</span>
        <p>{titleX}</p>
      </div>
      <div className={`turnRight${typeOActive}`}>
        <span className={`turnTypeO${typeOActive}`}>O</span>
        <p>{titleO}</p>
      </div>
    </div>
  );
}

export default TurnPlayer;

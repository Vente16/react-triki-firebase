import React from 'react';

import SquareItem, { Item } from './SquareItem';

import { Square, TrikiRows } from '@interfaces/trikiInterfaces';

import './styles.scss';

interface Props {
  data: TrikiRows;
  onHandleClickItem?: (item: Item) => void;
}

function GameContainer({ data, onHandleClickItem }: Props) {
  const [row1, row2, row3] = data;
  const handleClickSquare = (item: Item) => {
    if (onHandleClickItem) {
      onHandleClickItem(item);
    }
  };
  return (
    <div className="wrapper">
      {row1.map((square: Square, index: number) => (
        <SquareItem
          key={`i_${square.id}_p_${0}`}
          {...square}
          index={index}
          indexParent={0}
          handleClick={handleClickSquare}
        />
      ))}
      {row2.map((square: Square, index: number) => (
        <SquareItem
          key={`i_${square.id}_p_${1}`}
          {...square}
          index={index}
          indexParent={1}
          handleClick={handleClickSquare}
        />
      ))}
      {row3.map((square: Square, index: number) => (
        <SquareItem
          key={`i_${square.id}_p_${2}`}
          {...square}
          index={index}
          indexParent={2}
          handleClick={handleClickSquare}
        />
      ))}
    </div>
  );
}

export default GameContainer;

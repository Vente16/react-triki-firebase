import * as Factory from 'factory.ts';

import { GameI, Square, TrikiRows } from '@interfaces/trikiInterfaces';
import { getRandomString } from '@utils/stringUtils';

export const squareFactory = Factory.Sync.makeFactory<Square>({
  id: Factory.each(i => `${i}`),
  isSelected: false
});

const columnsByRow = 3;
const initialSquares = squareFactory.buildList(columnsByRow);

const trikiRows: TrikiRows = [initialSquares, initialSquares, initialSquares];

export const gameFactory = Factory.Sync.makeFactory<GameI>({
  id: getRandomString(),
  triki: trikiRows,
  playerX: null,
  playerO: null,
  winner: null,
  owner: null,
  status: {
    isPlaying: false,
    status: 'Waiting'
  }
});

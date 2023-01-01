import { GenericObjectInterface, Nullable } from './globalInterfaces';

export interface User {
  id: string;
  name: string;
}

export type TypeUser = 'X' | 'O';

export interface Square {
  id?: string;
  isSelected?: boolean;
  type?: TypeUser;
  user?: Player;
}

export interface UserSquareSelected {
  selected: string[];
  user: User;
}

export type TrikiRows = [Square[], Square[], Square[]];
export type UserSquares = GenericObjectInterface<UserSquareSelected>;

export type Player = { type: TypeUser } & User;

type Status = 'Tie' | 'Winner' | 'Waiting' | 'Playing';

export interface StatusGame {
  isPlaying: boolean;
  status: Status;
  winner?: Player;
}

export interface GameI {
  id: string;
  playerX: Nullable<Player>;
  playerO: Nullable<Player>;
  winner: Nullable<Player>;
  triki: TrikiRows;
  turn?: TypeUser;
  owner: Nullable<Player>;
  status?: StatusGame;
}

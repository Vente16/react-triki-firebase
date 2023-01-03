import { Nullable } from '@interfaces/globalInterfaces';
import { Player, StatusGame, TrikiRows } from '@interfaces/trikiInterfaces';

type NullablePlayer = Nullable<Player>;

export const statusMessages = (title = '', subTitle = '') => ({
  title,
  subTitle
});

export const checkStatusGame = (statusGame: Nullable<StatusGame>) => ({
  finalStatusGame: statusGame?.status === 'Tie' || statusGame?.status === 'Winner',
  gameisBeingPlayed: statusGame?.status === 'Playing'
});

export const checkUserTypeExits = (
  player: NullablePlayer,
  playerX: NullablePlayer,
  playerO: NullablePlayer
) => ({
  checkUserTypeX: player && playerX !== null && playerX.id === player.id,
  checkUserTypeO: player && playerO !== null && playerO.id === player.id
});

export const emptyTriki: TrikiRows = [[], [], []];

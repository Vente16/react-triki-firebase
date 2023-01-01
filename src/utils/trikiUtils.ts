import { Nullable } from '@interfaces/globalInterfaces';
import { Player, StatusGame, TrikiRows, UserSquares } from '@interfaces/trikiInterfaces';

/* horizontals winner
  [0, 0] - [0, 1] - [0, 2]
  [1, 0] - [1, 1] - [1, 2]
  [2, 0] - [2, 1] - [2, 2]
*/

const horizontalPosibilities = ['[0,0]-[0,1]-[0,2]', '[1,0]-[1,1]-[1,2]', '[2,0]-[2,1]-[2,2]'];

const verticalPosibilities = ['[0,0]-[1,0]-[2,0]', '[0,1]-[1,1]-[2,1]', '[0,2]-[1,2]-[2,2]'];

const acrossPosibilities = ['[0,0]-[1,1]-[2,2]', '[0,2]-[1,1]-[2,0]'];

export const getSquareSelectedByUser = (trikiData: TrikiRows): UserSquares => {
  const dataByUser: UserSquares = {};
  trikiData.forEach((currentRow, currentRowIndex) => {
    currentRow.forEach(({ isSelected, ...square }, indexSquare) => {
      if (isSelected && square.user) {
        const keyObject = square.user.id;
        const { user } = square;
        const squareSelected = `[${currentRowIndex},${indexSquare}]`;
        if (keyObject in dataByUser) {
          const key = dataByUser[keyObject];
          key.selected = [...key.selected, squareSelected];
        } else {
          dataByUser[keyObject] = {
            selected: [squareSelected],
            user
          };
        }
      }
    }, []);
  }, []);

  return dataByUser;
};

export const checkWinner = (trikiData: TrikiRows): Nullable<Player> => {
  const dataSelected = getSquareSelectedByUser(trikiData);
  let isHorizontal = false;
  let isVertical = false;
  let isAcross = false;
  let user = null;
  Object.keys(dataSelected).forEach(key => {
    const { user: userData, selected } = dataSelected[key];
    const infoSelected = selected.join('-');

    isHorizontal = horizontalPosibilities.some(el => infoSelected.includes(el));
    isVertical = verticalPosibilities.some(el => infoSelected.includes(el));
    isAcross = acrossPosibilities.some(el => infoSelected.includes(el));

    if (isHorizontal || isVertical || isAcross) {
      user = userData;
    }
  });

  return user;
};

export const getGameStatus = (trikiData: TrikiRows): StatusGame => {
  const statusGame: StatusGame = {
    isPlaying: true,
    status: 'Playing'
  };
  const hasWinner = checkWinner(trikiData);
  if (hasWinner) {
    statusGame.isPlaying = false;
    statusGame.status = 'Winner';
    statusGame.winner = hasWinner;
    return statusGame;
  }

  if (!hasWinner) {
    const myReduce = trikiData.reduce((prev, current) => prev.concat(current), []);
    const itemsSelected = myReduce.filter(el => el.isSelected);
    if (myReduce.length === itemsSelected.length) {
      statusGame.isPlaying = false;
      statusGame.status = 'Tie';
      return statusGame;
    }
  }
  return statusGame;
};

/* eslint-disable max-lines */
import { Square, TrikiRows } from '@interfaces/trikiInterfaces';
import { checkWinner, getGameStatus, getSquareSelectedByUser } from '@utils/trikiUtils';

const player1: Square = {
  isSelected: true,
  type: 'X',
  user: {
    id: 'da94e53e-001e-428c-9952-c14cfa9cd289',
    name: 'John',
    type: 'X'
  }
};

const player2: Square = {
  isSelected: true,
  type: 'O',
  user: {
    id: '8889caa6-ddff-4271-969c-d44e7d982f99',
    name: 'Timmy',
    type: 'O'
  }
};

describe('Triki game with no winner', () => {
  test('Check with no data', () => {
    const trikiData: TrikiRows = [[], [], []];
    expect(checkWinner(trikiData)).toBe(null);
  });

  test('Check with data first row', () => {
    const trikiData: TrikiRows = [
      [player1, player1, {}],
      [{}, {}, {}],
      [{}, {}, {}]
    ];
    expect(checkWinner(trikiData)).toBe(null);
  });

  test('Check with data second row', () => {
    const trikiData: TrikiRows = [
      [{}, {}, {}],
      [player1, player1, {}],
      [{}, {}, {}]
    ];
    expect(checkWinner(trikiData)).toBe(null);
  });

  test('Check with data third row', () => {
    const trikiData: TrikiRows = [
      [{}, {}, {}],
      [{}, {}, {}],
      [player1, player1, {}]
    ];
    expect(checkWinner(trikiData)).toBe(null);
  });

  test('Check with data full rows', () => {
    const trikiData: TrikiRows = [
      [player2, player1, player2],
      [player1, player1, player2],
      [player2, player2, player1]
    ];
    expect(checkWinner(trikiData)).toBe(null);
  });
});
describe('Triki game horizontal winner', () => {
  test('Check first row', () => {
    const trikiData: TrikiRows = [
      [player1, player1, player1],
      [{}, {}, {}],
      [{}, {}, {}]
    ];
    expect(checkWinner(trikiData)).toBe(player1.user);
  });

  test('Check second row', () => {
    const trikiData: TrikiRows = [
      [{}, {}, {}],
      [player1, player1, player1],
      [{}, {}, {}]
    ];
    expect(checkWinner(trikiData)).toBe(player1.user);
  });

  test('Check third row', () => {
    const trikiData: TrikiRows = [
      [{}, {}, {}],
      [{}, {}, {}],
      [player1, player1, player1]
    ];
    expect(checkWinner(trikiData)).toBe(player1.user);
  });
});
describe('Triki game vertical', () => {
  test('Check first column', () => {
    const trikiData: TrikiRows = [
      [player1, {}, {}],
      [player1, {}, {}],
      [player1, {}, {}]
    ];
    expect(checkWinner(trikiData)).toBe(player1.user);
  });

  test('Check second column', () => {
    const trikiData: TrikiRows = [
      [{}, player1, {}],
      [{}, player1, {}],
      [{}, player1, {}]
    ];
    expect(checkWinner(trikiData)).toBe(player1.user);
  });

  test('Check third column', () => {
    const trikiData: TrikiRows = [
      [{}, {}, player1],
      [{}, {}, player1],
      [{}, {}, player1]
    ];
    expect(checkWinner(trikiData)).toBe(player1.user);
  });
});

describe('Triki game across', () => {
  test('Check left to right', () => {
    const trikiData: TrikiRows = [
      [player1, {}, {}],
      [{}, player1, {}],
      [{}, {}, player1]
    ];
    expect(checkWinner(trikiData)).toBe(player1.user);
  });
  test('Check right to left', () => {
    const trikiData: TrikiRows = [
      [{}, {}, player1],
      [{}, player1, {}],
      [player1, {}, {}]
    ];
    expect(checkWinner(trikiData)).toBe(player1.user);
  });
});

describe('Get items selected by player [row, column] (rows)', () => {
  const { user } = player1 || {};
  const playerId1 = user?.id || '';

  describe('first row [0, n]', () => {
    test('Item selected index [0,0]', () => {
      const trikiData: TrikiRows = [
        [player1, {}, {}],
        [{}, {}, {}],
        [{}, {}, {}]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[0,0]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });
    test('Item selected index [0,1]', () => {
      const trikiData: TrikiRows = [
        [{}, player1, {}],
        [{}, {}, {}],
        [{}, {}, {}]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[0,1]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });

    test('Item selected index [0,2]', () => {
      const trikiData: TrikiRows = [
        [{}, {}, player1],
        [{}, {}, {}],
        [{}, {}, {}]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[0,2]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });
    test('All items selected in row 1  [[0,0],[0,1],[0,2]]', () => {
      const trikiData: TrikiRows = [
        [player1, player1, player1],
        [{}, {}, {}],
        [{}, {}, {}]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[0,0]', '[0,1]', '[0,2]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });
  });

  describe('second row [1, n]', () => {
    test('Item selected index [1,0]', () => {
      const trikiData: TrikiRows = [
        [{}, {}, {}],
        [player1, {}, {}],
        [{}, {}, {}]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[1,0]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });
    test('Item selected index [1,1]', () => {
      const trikiData: TrikiRows = [
        [{}, {}, {}],
        [{}, player1, {}],
        [{}, {}, {}]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[1,1]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });

    test('Item selected index [1,2]', () => {
      const trikiData: TrikiRows = [
        [{}, {}, {}],
        [{}, {}, player1],
        [{}, {}, {}]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[1,2]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });
    test('All items selected in row 2  [[1,0],[1,1],[1,2]]', () => {
      const trikiData: TrikiRows = [
        [{}, {}, {}],
        [player1, player1, player1],
        [{}, {}, {}]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[1,0]', '[1,1]', '[1,2]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });
  });

  describe('third row [2, n]', () => {
    test('Item selected index [2,0]', () => {
      const trikiData: TrikiRows = [
        [{}, {}, {}],
        [{}, {}, {}],
        [player1, {}, {}]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[2,0]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });
    test('Item selected index [2,1]', () => {
      const trikiData: TrikiRows = [
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, player1, {}]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[2,1]'],
          user
          // eslint-disable-next-line max-lines
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });

    test('Item selected index [2,2]', () => {
      const trikiData: TrikiRows = [
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, {}, player1]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[2,2]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });
    test('All items selected in row 3  [[2,0],[2,1],[2,2]]', () => {
      const trikiData: TrikiRows = [
        [{}, {}, {}],
        [{}, {}, {}],
        [player1, player1, player1]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[2,0]', '[2,1]', '[2,2]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });
  });
});

describe('Get items selected by player [column, row] (column)', () => {
  const { user } = player1 || {};
  const playerId1 = user?.id || '';

  describe('first  column [0, n]', () => {
    const formatEl = (el: string) => `[${el.match(/\d+/g)?.[1]},${el.match(/\d+/g)?.[0]}]`;
    test('Items selected in first column [0,0][1,0][1,2]', () => {
      const trikiData: TrikiRows = [
        [player1, {}, {}],
        [player1, {}, {}],
        [player1, {}, {}]
      ];

      const result = {
        [`${playerId1}`]: {
          selected: ['[0,0]', '[1,0]', '[2,0]'],
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });
    test('Items selected in second column [1,0][1,1][1,2]', () => {
      const trikiData: TrikiRows = [
        [{}, player1, {}],
        [{}, player1, {}],
        [{}, player1, {}]
      ];

      // the function will return always [row , column]
      const selectedInversed = ['[1,0]', '[1,1]', '[1,2]'].map(formatEl);

      const result = {
        [`${playerId1}`]: {
          selected: selectedInversed,
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });

    test('Items selected in third column [2,0][2,1][2,2]', () => {
      const trikiData: TrikiRows = [
        [{}, {}, player1],
        [{}, {}, player1],
        [{}, {}, player1]
      ];

      // the function will return always [row , column]
      const selectedInversed = ['[2,0]', '[2,1]', '[2,2]'].map(formatEl);

      const result = {
        [`${playerId1}`]: {
          selected: selectedInversed,
          user
        }
      };
      expect(getSquareSelectedByUser(trikiData)).toStrictEqual(result);
    });
  });
});

describe('Get status game', () => {
  test('Status -> Playing', () => {
    const statusGame = {
      isPlaying: true,
      status: 'Playing'
    };
    const trikiData: TrikiRows = [
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}]
    ];
    expect(getGameStatus(trikiData)).toStrictEqual(statusGame);
  });

  test('Status -> Tie', () => {
    const statusGame = {
      isPlaying: false,
      status: 'Tie'
    };
    const trikiData: TrikiRows = [
      [player1, player2, player1],
      [player1, player2, player1],
      [player2, player1, player2]
    ];
    expect(getGameStatus(trikiData)).toStrictEqual(statusGame);
  });

  test('Status -> Winner', () => {
    const { user: winner } = player1;
    const statusGame = {
      isPlaying: false,
      status: 'Winner',
      winner
    };
    const trikiData: TrikiRows = [
      [player1, {}, {}],
      [{}, player1, {}],
      [{}, {}, player1]
    ];
    expect(getGameStatus(trikiData)).toStrictEqual(statusGame);
  });
});

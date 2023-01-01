import { Square, TrikiRows } from '../src/interfaces/trikiInterfaces';
import { checkWinner } from '../src/utils/trikiUtils';

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

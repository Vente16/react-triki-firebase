import i18next from '@config/i18n';

i18next.addResources('es', 'Game', {
  symbol: 'Este será tu símbolo',
  winner: '¡{{name}}\n ha ganado! 🎉',
  tie: '¡Empate! 🥊',
  roomFull: 'La sala está llena 😔',
  namePlayer: '👉 Tu nombre: '
});

i18next.addResources('en', 'Game', {
  symbol: 'This one will be your symbol',
  winner: '{{name}}\n has won! 🎉',
  tie: 'Tie! 🥊',
  roomFull: 'The room is full 😔',
  namePlayer: '👉 Your name: '
});

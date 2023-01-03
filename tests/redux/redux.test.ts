import store, { RootState } from '@appRedux/store';
import { setUser } from '@appRedux/actions/user';
import { setLanguage } from '@appRedux/actions/language';
import { Player } from '@interfaces/trikiInterfaces';

describe('Redux tests', () => {
  const defaultStore: RootState = {
    user: { data: null },
    language: { language: 'es' }
  };
  test('Initial store', () => {
    expect(store.getState()).toStrictEqual(defaultStore);
  });

  test('Set user action', () => {
    const player: Player = {
      id: 'xxxxxx',
      name: 'John',
      type: 'X'
    };
    store.dispatch(setUser(player));
    const { data } = store.getState().user;
    expect(data).toStrictEqual(player);
  });

  test('Set language action', () => {
    const newLanguage = 'en';
    store.dispatch(setLanguage(newLanguage));
    const { language } = store.getState().language;
    expect(language).toStrictEqual(newLanguage);
  });
});

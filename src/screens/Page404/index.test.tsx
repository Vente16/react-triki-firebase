/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import '@mocks/reacti18nextMock';

import Page404 from '.';

const reactI18next = jest.requireMock('react-i18next');

describe('Page404 component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test('Render component', () => {
    const changeLanguage = jest.fn();
    const spy = jest.spyOn(reactI18next, 'useTranslation').mockReturnValue({
      t: (key: string) => key,
      i18n: {
        changeLanguage,
        language: 'es'
      }
    });

    const { container } = render(<Page404 />);

    const title = 'Page404:title';
    const boxContainer = container.getElementsByClassName('containerBadQuest');
    const h1 = container.getElementsByTagName('h1');

    expect(boxContainer.length).toBe(1);
    expect(container.textContent).toBe(title);
    expect(h1.length).toBe(1);

    spy.mockClear();
  });
});

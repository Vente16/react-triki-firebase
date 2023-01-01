// eslint-disable-next-line import/no-unresolved
import { setLanguage } from '@appRedux/actions/language';

import LanguageButton from './components/LanguageButton';
import { ButtonLanguageI, buttonsLanguages } from './constants';

import { useAppDispatch } from '@hooks/redux';
import './styles.scss';

function Header() {
  const dispatch = useAppDispatch();
  const handleLanguageButton = ({ value }: ButtonLanguageI) => {
    dispatch(setLanguage(value));
  };
  return (
    <div className="header">
      <p>
        Triki<span> Game 🕹️</span>
      </p>
      <div className="language-buttons">
        {buttonsLanguages.map(button => (
          <LanguageButton key={`${button.id}`} {...button} handleClick={handleLanguageButton} />
        ))}
      </div>
    </div>
  );
}

export default Header;

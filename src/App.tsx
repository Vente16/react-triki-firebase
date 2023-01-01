import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from '@components/Header';
import { useAppSelector } from '@hooks/redux';
import './styles.app.scss';

function App() {
  const { i18n } = useTranslation();
  const { language } = useAppSelector(state => state.language);

  useEffect(() => {
    i18n.changeLanguage(language);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

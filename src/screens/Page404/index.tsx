import { useTranslation } from 'react-i18next';

import './styles.scss';
import './i18n';

function Page404() {
  const { t } = useTranslation();
  return (
    <div className="containerBadQuest">
      <h1>{t('Page404:title')}</h1>
    </div>
  );
}

export default Page404;

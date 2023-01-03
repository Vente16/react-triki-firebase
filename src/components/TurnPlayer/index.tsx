import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './i18n';
import './styles.scss';

const disabledButtonTime = 3000;

interface Props {
  titleX?: string;
  titleO?: string;
  typeTurn?: 'X' | 'O';
}

function TurnPlayer({ titleX, titleO, typeTurn }: Props) {
  const { t } = useTranslation();
  const typeXActive = typeTurn === 'X' ? 'Active' : '';
  const typeOActive = typeTurn === 'O' ? 'Active' : '';
  const hasNotTwoPlayers = titleX === undefined || titleO === undefined;
  const {
    location: { href }
  } = window;
  const [linkCopied, setLinkCopied] = useState(false);
  const onCopyLink = () => {
    setLinkCopied(true);
    const changeDisabled = () => setLinkCopied(false);
    setTimeout(changeDisabled, disabledButtonTime);
  };

  return (
    <>
      <div className="turnPlayers">
        <div className={`turnLeft${typeXActive}`}>
          <span className={`turnTypeX${typeXActive}`}>X</span>
          <p>{titleX || t('TurnPlayer:turnPlayerPlaceholder')}</p>
        </div>
        <div className={`turnRight${typeOActive}`}>
          <span className={`turnTypeO${typeOActive}`}>O</span>
          <p>{titleO || t('TurnPlayer:turnPlayerPlaceholder')}</p>
        </div>
      </div>
      {hasNotTwoPlayers ? (
        <div className="waitPlayer">
          <p>{t('TurnPlayer:waitingPlayer')}</p>
          <CopyToClipboard text={href} onCopy={onCopyLink}>
            <button className="copy" type="button" disabled={linkCopied}>
              {linkCopied ? t('TurnPlayer:linkCopied') : t('TurnPlayer:copyLink')}
            </button>
          </CopyToClipboard>
        </div>
      ) : null}
    </>
  );
}

export default TurnPlayer;

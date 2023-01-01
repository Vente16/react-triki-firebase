import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import TypePlayer, { Option } from './components/TypePlayer';
import { MIN_LENGHT_NAME } from './constants';

import { NullableNumber } from '@interfaces/globalInterfaces';
import { alphanumericRegex } from '@constants/validations';
import { gameFactory } from '@constants/factories';
import { getRandomString } from '@utils/stringUtils';
import { GameI, Player } from '@interfaces/trikiInterfaces';

import './i18n';
import './styles.scss';

interface Props {
  labelItems: string;
  options: Option[];
  optionIndexChecked: NullableNumber;
  onHandleSubmit: (game: GameI, player: Player) => void;
}

function CommonForm({ labelItems, options, optionIndexChecked, onHandleSubmit }: Props) {
  const { t } = useTranslation();
  const [itemChecked, setItemChecked] = useState<NullableNumber>(optionIndexChecked);
  const [fieldName, setFieldName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const handleOptionClick = (value: number) => setItemChecked(value);

  const handleSubmit = () => {
    const typePlater = options[itemChecked || 0].label;
    const dynamicId = getRandomString();
    const playerData: Player = {
      id: dynamicId,
      name: fieldName,
      type: typePlater
    };
    const player =
      typePlater === 'X'
        ? {
            playerX: playerData,
            owner: playerData
          }
        : {
            playerO: playerData,
            owner: playerData
          };
    const game = gameFactory.build(player);
    onHandleSubmit(game, playerData);
  };

  useEffect(() => {
    const checkForm = () => {
      const fieldNameSize = fieldName.trim().length;
      if (fieldNameSize >= MIN_LENGHT_NAME && fieldName.match(alphanumericRegex) && itemChecked !== null) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    checkForm();
  }, [fieldName, itemChecked]);

  return (
    <div>
      <form className="form">
        <div className="form-group">
          <label htmlFor="name" className="input-label">
            {t('CommonForm:name')}
          </label>
          <input
            name="name"
            type="text"
            value={fieldName}
            onChange={({ target: { value } }) => setFieldName(value)}
            placeholder={t('CommonForm:namePlaceholder') || ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name" className="input-label">
            {labelItems}
          </label>
          <TypePlayer options={options} indexChecked={itemChecked} handleClickOption={handleOptionClick} />
        </div>
        <button type="button" className="submitButton" onClick={handleSubmit} disabled={!isValid}>
          Test
        </button>
      </form>
    </div>
  );
}

export default CommonForm;

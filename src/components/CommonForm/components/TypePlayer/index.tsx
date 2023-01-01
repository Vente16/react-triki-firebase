import { Nullable } from '@interfaces/globalInterfaces';
import { TypeUser } from '@interfaces/trikiInterfaces';

import './styles.scss';

export interface Option {
  id: string;
  label: TypeUser;
  value: string;
  isChecked?: boolean;
}

interface Props {
  options: Option[];
  handleClickOption?: (value: number) => void;
  indexChecked: Nullable<number>;
}

function TypePlayer({ options, handleClickOption, indexChecked }: Props) {
  const handleClick = (value: number) => {
    if (handleClickOption) {
      handleClickOption(value);
    }
  };
  return (
    <div>
      {options.map(({ id, label }, index) => {
        const isActive = index === indexChecked ? 'Active' : '';
        return (
          <button
            className={`checkButton${isActive}`}
            key={id}
            onClick={() => handleClick(index)}
            // eslint-disable-next-line react/jsx-closing-bracket-location
            type="button">
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default TypePlayer;

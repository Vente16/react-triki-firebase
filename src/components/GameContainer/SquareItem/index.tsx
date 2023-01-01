import { Square } from '@interfaces/trikiInterfaces';

import './styles.scss';

export type Item = {
  index?: number;
  indexParent?: number;
} & Square;

interface Props extends Square {
  index?: number;
  indexParent?: number;
  handleClick?: (item: Item) => void;
}

function SquareItem({ isSelected, type, handleClick, ...square }: Props) {
  const selected = isSelected ? 'Selected' : '';
  const hasHandleClick = () => {
    if (!isSelected && handleClick) {
      handleClick({ isSelected, type, ...square });
    }
  };
  return (
    <button className={`item${selected}`} onClick={hasHandleClick} type="button">
      {type}
    </button>
  );
}

export default SquareItem;

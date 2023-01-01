import './styles.scss';

export interface Props {
  id?: string;
  label: string;
  value: 'es' | 'en';
  handleClick?: (item: Props) => void;
}

function LanguageButton({ id, label, value, handleClick }: Props) {
  const buttonClicked = () => {
    if (handleClick) {
      handleClick({ id, label, value });
    }
  };
  return (
    <button className="lang-button" type="button" onClick={buttonClicked}>
      {label}
    </button>
  );
}

export default LanguageButton;

import './styles.scss';

interface Props {
  title?: string;
  subTitle?: string;
}

function GameMessage({ title, subTitle }: Props) {
  return (
    <div className="gameMessageContent">
      <h1>{title}</h1>
      <h1>{subTitle}</h1>
    </div>
  );
}

export default GameMessage;

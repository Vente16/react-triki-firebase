import { onValue, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'lodash';

// eslint-disable-next-line import/no-unresolved
import { Option } from '../Home/components/TypePlayer';

import { checkStatusGame, checkUserTypeExits, emptyTriki, statusMessages } from './constants';

import { setUser } from '@appRedux/actions/user';
import { TypeUser, GameI, Player, StatusGame } from '@interfaces/trikiInterfaces';
import { getItemLocalStorage, setItemLocalStorage } from '@utils/localStorageUtils';
import CommonForm from '@components/CommonForm';
import { firebaseDB } from '@config/firebase';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { Nullable } from '@interfaces/globalInterfaces';
import TurnPlayer from '@components/TurnPlayer';
import GameContainer from '@components/GameContainer';
import { Item } from '@components/GameContainer/SquareItem';
import { getGameStatus } from '@utils/trikiUtils';
import GameMessage from '@components/GameMessage';
import './i18n';
import './styles.scss';

const getTypeItems = (type: TypeUser) => {
  const checkType = type === 'X' ? 'O' : 'X';
  const data: Option[] = [{ id: '1', value: checkType, label: checkType }];
  return data;
};

function Game() {
  const { t } = useTranslation();
  const { gameId } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user.data);
  const dispatch = useAppDispatch();
  const [existGame, setExistGame] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [isGameFull, setIsGameFull] = useState(false);
  const [items, setItems] = useState<Option[]>([]);
  const [currentGame, setCurrentGame] = useState<Nullable<GameI>>(null);
  const [statusGame, setStatusGame] = useState<Nullable<StatusGame>>(null);

  const { finalStatusGame, gameisBeingPlayed } = checkStatusGame(statusGame);
  const getMessages = () => {
    let message = {};
    if (statusGame) {
      const { status, winner } = statusGame;
      if (status === 'Tie') {
        const title = t('Game:tie') || '';
        const subTitle = 'X - O';
        message = statusMessages(title, subTitle);
      }

      if (status === 'Winner') {
        const title = t('Game:winner', { name: winner?.name }) || '';
        const subTitle = winner?.type;
        message = statusMessages(title, subTitle);
      }
    }
    return message;
  };
  const messagesGame = getMessages();

  const handleSubmit = async (_: GameI, player: Player) => {
    const newPlayer = { [`player${player.type}`]: player };
    const turn = player.type === 'X' ? 'O' : 'X';
    const localStorageKey = `room_${gameId}`;
    const status = { isPlaying: true, status: 'Playing' };
    const updateGame = { ...currentGame, ...newPlayer, turn, status };
    try {
      const query = ref(firebaseDB, `rooms/${gameId}`);
      setItemLocalStorage(localStorageKey, player);
      await set(query, updateGame);
      dispatch(setUser(player));
    } catch (error) {
      // TODO do something with error
      console.error(error);
    }
  };

  useEffect(() => {
    const query = ref(firebaseDB, `rooms/${gameId}`);

    return onValue(query, snapshot => {
      if (snapshot.exists()) {
        const dataGame = snapshot.val();
        setExistGame(true);
        setCurrentGame(dataGame);
        const { playerX = null, playerO = null, triki } = dataGame;
        const checkGameStatus = getGameStatus(triki);
        setStatusGame(checkGameStatus);
        const getUserType = getItemLocalStorage(`room_${gameId}`);
        const { checkUserTypeX, checkUserTypeO } = checkUserTypeExits(getUserType, playerX, playerO);
        const checkUserType = checkUserTypeX || checkUserTypeO;
        let currentUserId = user?.id || '';
        if (checkUserType) {
          setHasUser(true);
          currentUserId = getUserType.id;
          dispatch(setUser(getUserType));
        }

        const checkisFullGame = playerX !== null && playerO !== null;
        const isUserDifferentToPlayers =
          checkisFullGame && playerX.id !== currentUserId && playerO.id !== currentUserId;

        if (isUserDifferentToPlayers) {
          setIsGameFull(true);
        }

        if (!checkUserType && !checkisFullGame) {
          const type = playerO ? 'O' : 'X';
          const newItems = getTypeItems(type);
          setItems(newItems);
        }
      } else {
        navigate('/404');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickItem = async (item: Item) => {
    const hasPlayers = currentGame?.playerX && currentGame?.playerO;
    const isUserTurn = currentGame?.turn === user?.type;
    if (!item.isSelected && hasPlayers && isUserTurn) {
      const turn = currentGame?.turn === 'X' ? 'O' : 'X';
      const newItemSet = {
        ...item,
        isSelected: true,
        type: user?.type,
        user
      };

      const cloneTriki = cloneDeep(currentGame.triki);
      cloneTriki[item.indexParent || 0][item.index || 0] = newItemSet as Item;
      const updateGame = { ...currentGame, turn, triki: cloneTriki };
      try {
        const query = ref(firebaseDB, `rooms/${gameId}`);
        await set(query, updateGame);
      } catch (error) {
        // TODO do something with error
        console.error(error);
      }
    }
  };

  return (
    <>
      {existGame && !hasUser && !isGameFull ? (
        <div className="formContainer">
          <CommonForm
            labelItems={t('Game:symbol')}
            options={items}
            optionIndexChecked={0}
            onHandleSubmit={handleSubmit}
          />
        </div>
      ) : null}
      {isGameFull ? <GameMessage title={t('Game:roomFull') || ''} /> : null}
      {existGame && hasUser && gameisBeingPlayed ? (
        <div>
          <div className="nameContainer">
            <p>
              {t('Game:namePlayer')}
              <span>{user?.name}</span>
            </p>
          </div>
          <TurnPlayer
            titleX={currentGame?.playerX?.name}
            titleO={currentGame?.playerO?.name}
            typeTurn={currentGame?.turn}
          />
          <GameContainer data={currentGame?.triki || emptyTriki} onHandleClickItem={handleClickItem} />
        </div>
      ) : null}
      {existGame && hasUser && finalStatusGame ? <GameMessage {...messagesGame} /> : null}
    </>
  );
}

export default Game;

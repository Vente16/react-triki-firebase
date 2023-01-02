import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ref, set } from 'firebase/database';

// eslint-disable-next-line import/no-unresolved
import { ITEMS } from './constants';

import { setUser } from '@appRedux/actions/user';
import { GameI, Player } from '@interfaces/trikiInterfaces';
import { firebaseDB } from '@config/firebase';
import CommonForm from '@components/CommonForm';
import { setItemLocalStorage } from '@utils/localStorageUtils';
import { useAppDispatch } from '@hooks/redux';
import './i18n';
import './styles.scss';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = async (game: GameI, player: Player) => {
    const { id: gameId } = game;
    const localStorageKey = `room_${gameId}`;

    try {
      const query = ref(firebaseDB, `rooms/${gameId}`);
      await set(query, game);
      setItemLocalStorage(localStorageKey, player);
      dispatch(setUser(player));
      navigate(`/room/${gameId}`);
    } catch (error) {
      // TODO do something with error
      console.error(error);
    }
  };

  return (
    <div className="homeContainer">
      <CommonForm
        labelItems={t('Home:symbol')}
        options={ITEMS}
        optionIndexChecked={null}
        onHandleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Home;

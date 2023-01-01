import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Nullable } from '@interfaces/globalInterfaces';
import { Player } from '@interfaces/trikiInterfaces';

type NullableUser = Nullable<Player>;

interface UserState {
  data: NullableUser;
}

const initialState: UserState = {
  data: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<NullableUser>) => {
      state.data = action.payload;
    }
  }
});

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { User, UserState } from "@/modules/user/types";
import { usersInitial } from "@/data/db";

const initialState: UserState = {
  data: usersInitial,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    create: (state, action: PayloadAction<User>) => {
      state.data.push(action.payload);
    },
    update: (state, action: PayloadAction<User>) => {
      const { id } = action.payload;
      const index = state.data.findIndex((user) => user.id === id);

      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      const index = state.data.findIndex((user) => user.id === action.payload);

      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
  },
});

export const { create, update, remove } = userSlice.actions;
export default userSlice.reducer;

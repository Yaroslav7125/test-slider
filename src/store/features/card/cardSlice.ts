import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

interface Card {
  id: string;
  color: string;
}

export interface CardState {
  value: Card[];
}

const initialState: CardState = {
  value: [],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    addCard: (state, action: PayloadAction<string>) => {
      const id = _.uniqueId();

      state.value.push({ id, color: action.payload });
    },
    removeCard(state) {
      state.value.shift();
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCard, removeCard } = cardsSlice.actions;

export default cardsSlice.reducer;

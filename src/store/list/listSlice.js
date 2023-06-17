import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  filter: '',
};

export const listSlice = createSlice({
  name: 'list',
  initialState: initialState,
  reducers: {
    setContacts: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(),
            name: name,
            number: number,
          },
        };
      },
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(el => el.id !== action.payload);
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const listReducer = listSlice.reducer;
export const { setContacts, setFilter, deleteContact } = listSlice.actions;

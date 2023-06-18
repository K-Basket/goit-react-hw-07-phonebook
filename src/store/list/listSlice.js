import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { getContacts } from 'api/contactsApi';

// делаем запрос на backend методом createAsyncThunk, создает автоматом экшены pending, fulfilled, rejected
export const getContactsThunk = createAsyncThunk('list/getAllContacts', () => {
  return getContacts(); // Запрос на backend
});

const handlePanding = state => {
  state.isLoading = true;
};

const handleFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.items = payload;
  state.error = '';
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

export const listSlice = createSlice({
  name: 'list',
  initialState: initialState,

  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.fulfilled, handleFulfilled)
      // т.к. вызов .addCase(getContactsThunk.pending, handlePanding) часто дублируется
      // и чтобы повторно его не вызывать применим addMatcher
      .addMatcher(action => {
        action.type.endsWith('/pending');
      }, handlePanding)
      .addMatcher(action => {
        action.type.endsWith('/rejected');
      }, handleRejected);
  },

  reducers: {
    setContacts: {
      reducer(state, action) {
        state.items.push(action.payload);
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

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },

  // extraReducers: {
  // [getContactsThunk.pending]: state => {
  //   state.isLoading = true;
  // },
  // [getContactsThunk.fulfilled]: (state, { payload }) => {
  //   state.isLoading = false;
  //   state.items = payload;
  //   state.error = '';
  // },
  // [getContactsThunk.rejected]: (state, { payload }) => {
  //   state.isLoading = false;
  //   state.error = payload;
  // },
  // },
});

export const listReducer = listSlice.reducer;
export const { setContacts, setFilter, deleteContact } = listSlice.actions;

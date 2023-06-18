import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getContacts } from 'api/contactsApi';

// делаем запрос на backend методом createAsyncThunk, создает автоматом экшены pending, fulfilled, rejected
export const getContactsThunk = createAsyncThunk('list/getAllContacts', () => {
  return getContacts(); // Запрос на backend
});

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
      .addCase(getContactsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getContactsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
        state.error = '';
      })
      .addCase(getContactsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
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

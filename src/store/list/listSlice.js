import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { deleteContact, getContacts } from 'api/contactsApi';

// делаем запрос на backend методом createAsyncThunk, создает автоматом экшены pending, fulfilled, rejected
export const fetchContactsThunk = createAsyncThunk('contacts/fetchAll', () => {
  return getContacts(); // Запрос на backend
});

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  id => {
    return deleteContact(id); // Запрос на backend
  }
);

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

const handleDelete = (state, { payload }) => {
  state.isLoading = false;
  state.items = state.items.filter(el => el.id !== payload.id);
  state.error = '';
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

export const listSlice = createSlice({
  name: 'contacts',
  initialState: initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.fulfilled, handleFulfilled)
      .addCase(deleteContactThunk.fulfilled, handleDelete)
      // т.к. вызов .addCase(fetchContactsThunk.pending, handlePanding) часто дублируется
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
    // deleteContact: (state, action) => {
    //   state.items = state.items.filter(el => el.id !== action.payload);
    // },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },

  // extraReducers: {
  // [fetchContactsThunk.pending]: state => {
  //   state.isLoading = true;
  // },
  // [fetchContactsThunk.fulfilled]: (state, { payload }) => {
  //   state.isLoading = false;
  //   state.items = payload;
  //   state.error = '';
  // },
  // [fetchContactsThunk.rejected]: (state, { payload }) => {
  //   state.isLoading = false;
  //   state.error = payload;
  // },
  // },
});

export const listReducer = listSlice.reducer;
// export const { setContacts, setFilter, deleteContact } = listSlice.actions;
export const { setContacts, setFilter } = listSlice.actions;

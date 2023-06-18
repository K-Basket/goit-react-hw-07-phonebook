import { createSlice, nanoid } from '@reduxjs/toolkit';
import { getContacts } from 'api/contactsApi';
// import { allSelector } from './selectorsList';

// ---temp: getProductsThunk
export const getContactsThunk = () => {
  return async dispatch => {
    dispatch(listSlice.actions.fetching());
    try {
      const data = await getContacts(); // Запрос на backend
      dispatch(listSlice.actions.fetchSuccess(data));
    } catch (error) {
      dispatch(listSlice.actions.fetchError(error));
    }
  };
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

// const initialState = {
//   contacts: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   filter: '',
// };

export const listSlice = createSlice({
  name: 'list',
  initialState: initialState,
  reducers: {
    fetching: state => {
      state.isLoading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.items = payload;
      state.error = '';
    },
    fetchError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    fetchContacts: {},
    addContact: {},
    // deleteContact: {},

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

// ============= old

// import { createSlice, nanoid } from '@reduxjs/toolkit';

// const initialState = {
//   contacts: [],
//   filter: '',
// };

// export const listSlice = createSlice({
//   name: 'list',
//   initialState: initialState,
//   reducers: {
//     setContacts: {
//       reducer(state, action) {
//         state.contacts.push(action.payload);
//       },
//       prepare(name, number) {
//         return {
//           payload: {
//             id: nanoid(),
//             name: name,
//             number: number,
//           },
//         };
//       },
//     },
//     deleteContact: (state, action) => {
//       state.contacts = state.contacts.filter(el => el.id !== action.payload);
//     },

//     setFilter: (state, action) => {
//       state.filter = action.payload;
//     },
//   },
// });

// export const listReducer = listSlice.reducer;
// export const { setContacts, setFilter, deleteContact } = listSlice.actions;

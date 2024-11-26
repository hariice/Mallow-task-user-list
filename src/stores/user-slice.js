import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, createUser, updateUser, deleteUser } from '../helper/urlHelper';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
      users: [],
      loading: false,
    },
    reducers: {
      setUsers: (state, action) => {
        state.users = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
    },
  });

  export const {setUsers, setLoading} = usersSlice.actions;

  export const getUsers = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const users = await fetchUsers();
      dispatch(setUsers(users));
        dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  export const createNewUser = (userData) => async (dispatch) => {
    try {
      await createUser(userData);
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
    }
  };

  export const editUser = (id, userData) => async (dispatch) => {
    try {
      await updateUser(id, userData);
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
    }
  };
  
  export const removeUser = (id) => async (dispatch) => {
    try {
      await deleteUser(id);
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
    }
  };

  export default usersSlice.reducer;
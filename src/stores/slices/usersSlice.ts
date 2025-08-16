import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsersThunk";
import type { IUsersResponse } from "../../types/response/usersResponse";

interface ILoaderSliceInitialState {
  isLoading: boolean;
  isError: boolean;
  data: IUsersResponse;
  error: {} | null;
}

const initialState: ILoaderSliceInitialState = {
  isLoading: false,
  isError: false,
  data: {
    users: [],
    limit: 0,
    skip: 0,
    total: 0,
  },
  error: null,
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isError = true;
      state.error = action.error;
    });
  },
});

export default usersSlice.reducer;

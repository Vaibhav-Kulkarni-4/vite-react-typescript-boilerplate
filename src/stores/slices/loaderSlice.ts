import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ILoaderSliceInitialState {
  isLoading: boolean;
  loaderMessage?: string;
}

interface IActionPayload extends ILoaderSliceInitialState {}

const initialState: ILoaderSliceInitialState = {
  isLoading: false,
  loaderMessage: "",
};

export const loaderSlice = createSlice({
  name: "loaderSlice",
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<IActionPayload>) => {
      state.isLoading = action.payload.isLoading;
      state.loaderMessage = action.payload.loaderMessage ?? "";
    },
  },
});

export const { toggleLoader } = loaderSlice.actions;
export default loaderSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosManager from "../axios/AxiosClient";
import { ICategory, Icons } from "./types";

interface iconsState {
  icons: Icons[];
  loading: boolean;
  error: string | null;
}

const initialState: iconsState = {
  icons: [],
  loading: false,
  error: "",
};

export const geAllIcons = createAsyncThunk<
  Icons[],
  undefined,
  { rejectValue: string }
>("icons/geAllIcons", async function (_, { rejectWithValue }) {
  try {
    const response = await axiosManager.get("/icons");
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

const iconsSlice = createSlice({
  name: "icons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(geAllIcons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(geAllIcons.fulfilled, (state, action) => {
        state.loading = false;
        state.icons = action.payload;
        state.error = null;

        console.log("icons");
        console.log(state.icons);
      })
      .addCase(geAllIcons.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }

        console.log("icons");
        console.log(action.payload);
      });
  },
});

export const {} = iconsSlice.actions;

export default iconsSlice.reducer;

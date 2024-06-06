import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosManager from "../axios/AxiosClient";
import { Color_category, ICategory, Icons } from "./types";

interface colorsState {
  colors: Color_category[];
  loading: boolean;
  error: string | null;
}

const initialState: colorsState = {
  colors: [],
  loading: false,
  error: "",
};

export const geAllColors = createAsyncThunk<
  Color_category[],
  undefined,
  { rejectValue: string }
>("colors/geAllColors", async function (_, { rejectWithValue }) {
  try {
    const response = await axiosManager.get("/colors");
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
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(geAllColors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(geAllColors.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload;
        state.error = null;

        console.log("colors");
        console.log(state.colors);
      })
      .addCase(geAllColors.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }

        console.log("colors");
        console.log(action.payload);
      });
  },
});

export const {} = iconsSlice.actions;

export default iconsSlice.reducer;

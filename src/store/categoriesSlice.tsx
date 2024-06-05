import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosManager from "../axios/AxiosClient";
import { Category } from "./types";

interface categoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: categoriesState = {
  categories: [],
  loading: false,
  error: "",
};

export const geAllCategories = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: string }
>("user/geAllCategories", async function (_, { rejectWithValue }) {
  try {
    const response = await axiosManager.get("/categories");
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(geAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(geAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;

        // console.log(state.categories);
      })
      .addCase(geAllCategories.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }

        // console.log(action.payload);
      });
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;

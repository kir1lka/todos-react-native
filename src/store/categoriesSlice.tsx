import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosManager from "../axios/AxiosClient";
import { ICategory, ICategoryRequest } from "./types";

interface categoriesState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: categoriesState = {
  categories: [],
  loading: false,
  error: "",
};

export const getAllCategories = createAsyncThunk<
  ICategory[],
  undefined,
  { rejectValue: string }
>("categories/getAllCategories", async function (_, { rejectWithValue }) {
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

export const AddCategories = createAsyncThunk<
  ICategory,
  ICategoryRequest,
  { rejectValue: any }
>("categories/AddCategories", async function (categoty, { rejectWithValue }) {
  try {
    const response = await axiosManager.post("/categories", categoty);
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
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;

        console.log(state.categories);
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }

        // console.log(action.payload);
      })

      .addCase(AddCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddCategories.fulfilled, (state, action) => {
        state.loading = false;
        // state.categories = action.payload;
        state.error = null;

        console.log(state.categories);
      })
      .addCase(AddCategories.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.errors || action.payload;
        }
        // else {
        //   state.error = action.error.message;
        // }

        console.log(action.payload);
      });
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosManager from "../axios/AxiosClient";
import { ITask, ITaskRequest } from "./types";

interface tasksState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
}

const initialState: tasksState = {
  tasks: [],
  loading: false,
  error: "",
};

export const getShowTasksForCategory = createAsyncThunk<
  ITask[],
  number,
  { rejectValue: string }
>(
  "tasks/getShowTasksForCategory",
  async function (idCategory, { rejectWithValue }) {
    try {
      const response = await axiosManager.get(`/tasks/${idCategory}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const AddTask = createAsyncThunk<
  ITask,
  ITaskRequest,
  { rejectValue: any }
>("tasks/AddTask", async function (task, { rejectWithValue }) {
  try {
    const response = await axiosManager.post("/tasks", task);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

// export const AddCategories = createAsyncThunk<
//   ICategory,
//   ICategoryRequest,
//   { rejectValue: any }
// >("categories/AddCategories", async function (categoty, { rejectWithValue }) {
//   try {
//     const response = await axiosManager.post("/categories", categoty);
//     return response.data;
//   } catch (error: any) {
//     if (error.response && error.response.status === 422) {
//       return rejectWithValue(error.response.data);
//     } else {
//       return rejectWithValue(error.message);
//     }
//   }
// });

// export const EditCategory = createAsyncThunk<
//   ICategory,
//   ICategoryRequest,
//   { rejectValue: any }
// >("categories/EditCategory", async function (categoty, { rejectWithValue }) {
//   try {
//     const response = await axiosManager.put(
//       `/categories/${categoty.id}`,
//       categoty
//     );
//     return response.data;
//   } catch (error: any) {
//     if (error.response && error.response.status === 422) {
//       return rejectWithValue(error.response.data);
//     } else {
//       return rejectWithValue(error.message);
//     }
//   }
// });

// export const DeleteCategory = createAsyncThunk<
//   ICategory,
//   ICategoryRequest,
//   { rejectValue: any }
// >("categories/DeleteCategory", async function (categoty, { rejectWithValue }) {
//   try {
//     const response = await axiosManager.delete(`/categories/${categoty.id}`);
//     return response.data;
//   } catch (error: any) {
//     if (error.response && error.response.status === 422) {
//       return rejectWithValue(error.response.data);
//     } else {
//       return rejectWithValue(error.message);
//     }
//   }
// });

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShowTasksForCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShowTasksForCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;

        console.log(state.tasks);
      })
      .addCase(getShowTasksForCategory.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }

        console.log(action.payload);
      })

      .addCase(AddTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddTask.fulfilled, (state, action) => {
        state.loading = false;
        // state.tasks = action.payload;
        state.error = null;

        console.log(state.tasks);
      })
      .addCase(AddTask.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.errors || action.payload;
        }

        console.log(action.payload);
      });

    //  .addCase(AddCategories.pending, (state) => {
    //    state.loading = true;
    //    state.error = null;
    //  })
    //  .addCase(AddCategories.fulfilled, (state, action) => {
    //    state.loading = false;
    //    // state.categories = action.payload;
    //    state.error = null;

    //    console.log(state.categories);
    //  })
    //  .addCase(AddCategories.rejected, (state, action) => {
    //    state.loading = false;
    //    if (action.payload) {
    //      state.error = action.payload.errors || action.payload;
    //    }
    //    // else {
    //    //   state.error = action.error.message;
    //    // }

    //    console.log(action.payload);
    //  })

    //  .addCase(EditCategory.pending, (state) => {
    //    state.loading = true;
    //    state.error = null;
    //  })
    //  .addCase(EditCategory.fulfilled, (state, action) => {
    //    state.loading = false;
    //    // state.categories = action.payload;
    //    state.error = null;

    //    console.log(state.categories);
    //  })
    //  .addCase(EditCategory.rejected, (state, action) => {
    //    state.loading = false;
    //    if (action.payload) {
    //      state.error = action.payload.errors || action.payload;
    //    }
    //    // else {
    //    //   state.error = action.error.message;
    //    // }

    //    console.log(action.payload);
    //  })

    //  .addCase(DeleteCategory.pending, (state) => {
    //    state.loading = true;
    //    state.error = null;
    //  })
    //  .addCase(DeleteCategory.fulfilled, (state, action) => {
    //    state.loading = false;
    //    // state.categories = action.payload;
    //    state.error = null;

    //    console.log(state.categories);
    //  })
    //  .addCase(DeleteCategory.rejected, (state, action) => {
    //    state.loading = false;
    //    if (action.payload) {
    //      state.error = action.payload.errors || action.payload;
    //    }
    //    // else {
    //    //   state.error = action.error.message;
    //    // }

    //    console.log(action.payload);
    //  });
  },
});

export const {} = tasksSlice.actions;

export default tasksSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_API_URL;

export const fetchbooks = createAsyncThunk("books/fetchBooks", async () => {
  const res = await axios.get(baseUrl);
  return res.data;
});

export const addBooks = createAsyncThunk("books/addBooks", async (book) => {
  const newBook = {
    ...book,
    issuedTo: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  const res = await axios.post(baseUrl, newBook);
  return res.data;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, data }) => {
    const updatedBook = {
      ...data,
      updatedAt: new Date().toISOString()
    }
    const res = await axios.put(`${baseUrl}/${id}`, updatedBook);
    return res.data;
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
  return id;
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchbooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchbooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchbooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBook = action.payload; 
        const index = state.items.findIndex((b) => b.id === updatedBook.id);
        if (index !== -1) {
          state.items[index] = updatedBook; 
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((b) => b.id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getItems = createAsyncThunk(
  'check/getItems',
  async(_, ThunkApi) => {
    try {
      
    } catch(e) {
      console.log(e);
      return ThunkApi.rejectWithValue('Произошла непредивденная ошибка')
    }
  }
)
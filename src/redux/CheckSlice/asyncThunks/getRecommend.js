import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRecommend = createAsyncThunk(
  'check/getRecommend',
  async(obj, ThunkApi) => {
    try {
      
    } catch(e) {
      console.log(e);
      return ThunkApi.rejectWithValue('Произошла непредивденная ошибка')
    }
  }
)
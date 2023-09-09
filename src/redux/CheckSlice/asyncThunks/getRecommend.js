import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRecommend = createAsyncThunk(
  'check/getRecommend',
  async(list, ThunkApi) => {
    try {
      const url = '/predict_receipt';
      const body = JSON.stringify(list);
      const response = await fetch(url, {
        method: "GET",
        cache: "no-cache",
        mode: 'cors',
        body: body
      });
      const data = await response.json();
      console.log('data', data);
    } catch(e) {
      console.log(e);
      return ThunkApi.rejectWithValue('Произошла непредивденная ошибка')
    }
  }
)
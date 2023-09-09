import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRecommend = createAsyncThunk(
  'check/getRecommend',
  async(list, ThunkApi) => {
    try {
      const url = 'http://127.0.0.1:5000/predict_receipt';
      const body = JSON.stringify(list);
      const response = await fetch(url, {
        method: "POST",
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
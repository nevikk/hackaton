import { createAsyncThunk } from "@reduxjs/toolkit";
import { CheckActions } from "../slice/checkSlice";

export const getItems = createAsyncThunk(
  'check/getItems',
  async(_, ThunkApi) => {
    try {
      const url = 'http://127.0.0.1:5000/item_hmap';
      const response = await fetch(url, {
        method: "GET",
        cache: "no-cache",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Accept" : "application/json"
        }
      });
      const data = await response.json();
      return data;
    } catch(e) {
      console.log(e);
      return ThunkApi.rejectWithValue('Произошла непредивденная ошибка')
    }
  }
)
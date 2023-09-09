import { createSlice} from "@reduxjs/toolkit";
import { items } from "../../../tools/data";

const initialState = {
  inputId: '',
  items: {},
  itemsList: [],
  recItem: {
    id: 200003,
    title: 'Товар 3',
    price: 10
  }
}

export const checkSlice = createSlice({
  name: 'check',
  initialState,
  reducers: {
    setData: (state, action) => {
      console.log('items', action.payload);
      state.items = action.payload;
    },
    changeInputId: (state, action) => {
      const {
        payload: inputId
      } = action;
      state.inputId = inputId;
      // console.log('items', items);
      state.inputItem = items[inputId] ? {id: inputId, title: items[inputId]} : {};
    },
    addItemToList: (state, action) => {
      const { 
        id: itemId,
        inputItem
      } = action.payload;

      const itemIndex = state.itemsList.findIndex((item => item.id === itemId));

      if (itemIndex !== -1) {
        state.itemsList[itemIndex].quantity += 1;
      } else {
        state.itemsList.push({...inputItem, quantity: 1, id: itemId, price: 1000});
      }

      state.inputId = '';
      state.inputItem = {};
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.itemsList.findIndex((item => item.id === itemId));

      state.itemsList[itemIndex].quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.itemsList.findIndex((item => item.id === itemId));

      if (state.itemsList[itemIndex].quantity - 1 > 0) {
        state.itemsList[itemIndex].quantity = state.itemsList[itemIndex].quantity - 1;
      } else {
        state.itemsList.splice(itemIndex, 1);
      }
    },
    addRecommendToList: (state, action) => {
      const recItemId = state.recItem.id;

      const itemIndex = state.itemsList.findIndex((item => item.id === recItemId));

      if (itemIndex !== -1) {
        state.itemsList[itemIndex].quantity += 1;
      } else {
        state.itemsList.push({...state.recItem, quantity: 1});
      }

    },
    clearData: (state, action) => {
      state.inputId = initialState.inputId;
      state.itemsList = initialState.itemsList;
    }
  },
})

export const { actions: CheckActions } = checkSlice;
export const { reducer: CheckReducer } = checkSlice;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';
import { TOrder, TOrdersData } from '../../utils/types';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const getFeeds = createAsyncThunk('feed/getFeeds', getFeedsApi);
export const getUserOrders = createAsyncThunk(
  'feed/getUserOrders',
  getOrdersApi
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты';
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка загрузки заказов пользователя';
      });
  }
});

export default feedSlice.reducer;

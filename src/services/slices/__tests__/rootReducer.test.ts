import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../ingredientsSlice';
import burgerConstructorReducer from '../burgerConstructorSlice';
import orderReducer from '../orderSlice';
import userReducer from '../userSlice';
import feedReducer from '../feedSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer
});

describe('rootReducer', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      ingredients: { items: [], isLoading: false, error: null },
      burgerConstructor: { bun: null, ingredients: [] },
      order: { order: null, isLoading: false, error: null },
      user: { user: null, isAuthChecked: false, isLoading: false, error: null },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      }
    });
  });
});

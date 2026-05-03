import reducer, { getIngredients } from '../ingredientsSlice';
import { TIngredient } from '../../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Ingredient',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

describe('ingredientsSlice', () => {
  it('должен установить isLoading в true при pending', () => {
    const state = reducer(
      { items: [], isLoading: false, error: null },
      { type: getIngredients.pending.type }
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записать данные и снять isLoading при fulfilled', () => {
    const state = reducer(
      { items: [], isLoading: true, error: null },
      { type: getIngredients.fulfilled.type, payload: mockIngredients }
    );
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
  });

  it('должен записать ошибку и снять isLoading при rejected', () => {
    const errorMessage = 'Сетевая ошибка';
    const state = reducer(
      { items: [], isLoading: true, error: null },
      { type: getIngredients.rejected.type, error: { message: errorMessage } }
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../burgerConstructorSlice';
import { TIngredient } from '../../../utils/types';

const bun: TIngredient = {
  _id: 'bun1',
  name: 'Bun',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

const sauce: TIngredient = {
  _id: 'sauce1',
  name: 'Sauce',
  type: 'sauce',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 50,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('burgerConstructorSlice', () => {
  it('должен добавить булку', () => {
    const state = reducer(undefined, addIngredient(bun));
    expect(state.bun).toEqual({ ...bun, id: expect.any(String) });
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен добавить ингредиент в начинку', () => {
    const state = reducer(undefined, addIngredient(sauce));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({ ...sauce, id: expect.any(String) });
  });

  it('должен удалить ингредиент по id', () => {
    const initialState = {
      bun: null,
      ingredients: [{ ...sauce, id: '123' }]
    };
    const state = reducer(initialState, removeIngredient('123'));
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен изменить порядок ингредиентов (moveUp)', () => {
    const items = [
      { ...sauce, id: '1' },
      { ...sauce, id: '2', name: 'Sauce2' }
    ];
    const initialState = { bun: null, ingredients: items };
    const state = reducer(initialState, moveIngredient({ index: 1, direction: 'up' }));
    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });

  it('должен очистить конструктор', () => {
    const initialState = {
      bun: { ...bun, id: 'bun-id' },
      ingredients: [{ ...sauce, id: 'sauce-id' }]
    };
    const state = reducer(initialState, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
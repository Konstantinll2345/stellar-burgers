import { FC, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { clearConstructor } from '../../services/slices/burgerConstructorSlice';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
import { selectUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const { isLoading: orderRequest, order: orderModalData } = useSelector(
    (state) => state.order
  );

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ingredientIds)).then(() => {
      dispatch(clearConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  useEffect(() => {
    if (orderModalData) {
      const timer = setTimeout(() => {
        dispatch(clearOrder());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [orderModalData, dispatch]);

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

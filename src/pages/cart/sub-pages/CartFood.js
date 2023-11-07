import React, { useEffect } from 'react';
import CardHeader from './components/appearance/CardHeader';
import FoodCard from './components/food-card/FoodCard';
import PriceDetail from './PriceDetail';
import { useCart } from '../../AllContext/allUseContext';
import itemsType from '../hooks/itemsType';
function CartFood() {
  const { items } = useCart().cart;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const foodItems = itemsType(items, 'food');

  if (foodItems.length !== 0) {
    return (
      <>
        <CardHeader text={'美食資訊'} />
        <div className="d-flex justify-content-between">
          <div className="col-lg-7">
            <FoodCard items={foodItems} />
          </div>
          <div className="col-lg-4">
            <PriceDetail />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <CardHeader text={'美食資訊'} />
        <div className="d-flex justify-content-between">
          <div className="col-lg-7">
            <div className="empty-cart">
              <h1>您的美食購物車是空的喔！</h1>
            </div>
          </div>
          <div className="col-lg-4">
            <PriceDetail />
          </div>
        </div>
      </>
    );
  }
}

export default CartFood;

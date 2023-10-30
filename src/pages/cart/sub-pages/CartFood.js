import React from 'react';
import CardHeader from './components/CardHeader';
import FoodCard from './components/FoodCard';
import PriceDetail from './PriceDetail';
import { useCart } from '../utils/useCart';
import itemsType from '../hooks/itemsType';
function CartFood({ prev, next, step, maxSteps }) {
  const { items } = useCart().cart;

  const foodItems = itemsType(items, 'food');

  if (foodItems.length !== 0) {
    return (
      <div className="container">
        <div className="row">
          <CardHeader text={'美食資訊'} />
          <div className="d-flex justify-content-between">
            <div className="col-lg-7">
              <FoodCard items={foodItems} />
            </div>
            <div className="col-lg-4">
              <PriceDetail
                prev={prev}
                next={next}
                step={step}
                maxSteps={maxSteps}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="row">
            <CardHeader text={'美食資訊'} />
            <div className="d-flex justify-content-between">
              <div className="col-lg-7">
                <div className="empty-cart">
                  <h1>您的美食購物車是空的喔！</h1>
                </div>
              </div>
              <div className="col-lg-4">
                <PriceDetail
                  prev={prev}
                  next={next}
                  step={step}
                  maxSteps={maxSteps}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CartFood;

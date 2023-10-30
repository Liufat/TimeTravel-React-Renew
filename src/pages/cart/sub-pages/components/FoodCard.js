import React from 'react';
import CardTitle from './CardTitle';
import CardBodyTop from './CardBodyTop';
import CountButton from './CountButton';
import { useCart } from '../../utils/useCart';

function FoodCard({ items }) {
  const { plusOne, minusOne, removeItem } = useCart();
  return (
    <>
      {items.map((v, i) => {
        return (
          <div key={v.name} className="card-wrap pb-5">
            <div className="card-body">
              <CardTitle
                text={'美食購買資訊'}
                id={v.id}
                deleteFun={() => removeItem(v)}
              />
              <div className="d-flex justify-content-between">
                <CardBodyTop productName={v.name} img={v.img} rate={v.rate} />
                <CountButton
                  quantity={v.quantity}
                  id={v.id}
                  plusOne={() => {
                    plusOne(v);
                  }}
                  minusOne={() => {
                    minusOne(v);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default FoodCard;

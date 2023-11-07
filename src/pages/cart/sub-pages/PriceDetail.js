import React from 'react';
import PriceDetailCard from './components/price-detail-card/PriceDetailCard';
import { useCart } from '../../AllContext/allUseContext';
import './PriceDetail.scss';
import makingPriceDetail from '../hooks/makingPriceDetail';

function PriceDetail() {
  const { cart } = useCart();

  const hotel = makingPriceDetail(cart, 'hotel');
  const food = makingPriceDetail(cart, 'food');
  const ticket = makingPriceDetail(cart, 'ticket');

  // console.log(hotel);
  return (
    <div className="price-detail-wrap mb-5">
      <PriceDetailCard
        title={'住宿'}
        items={hotel.items}
        total={hotel.totalPrice}
      />
      <PriceDetailCard
        title={'美食'}
        items={food.items}
        total={food.totalPrice}
      />
      <PriceDetailCard
        title={'票券'}
        items={ticket.items}
        total={ticket.totalPrice}
      />
      <div className="d-flex justify-content-evenly">
        <h1 className="total">總計</h1>
        <h1 className="total">
          {hotel.totalPrice + food.totalPrice + ticket.totalPrice}
        </h1>
      </div>
    </div>
  );
}

export default PriceDetail;

import React from 'react';
import PriceDetailCard from './components/price-detail-card/PriceDetailCard';
import ProgressButton from './ProgressButton';
import { useCart } from '../../AllContext/allUseContext';
import './PriceDetail.scss';
import makingPriceDetail from '../hooks/makingPriceDetail';

function PriceDetail({ prev, next, step, maxSteps }) {
  const { cart } = useCart();

  // console.log(cart);

  // console.log(cart);
  // const makingPriceDetail = (type) => {
  //   const priceItems = cart.items.filter((item) => item.type === type);

  //   const itemTotalPrice =
  //     // 如果是住宿的價錢，還要考慮到天數
  //     type !== 'hotel'
  //       ? priceItems
  //           .map((priceItem) => priceItem.price * priceItem.quantity)
  //           .reduce((acc, cur) => acc + cur, 0)
  //       : priceItems
  //           .map(
  //             (priceItem) =>
  //               (priceItem.price *
  //                 priceItem.quantity *
  //                 (+new Date(priceItem.checkout) -
  //                   +new Date(priceItem.checkin))) /
  //               86400000
  //           )
  //           .reduce((acc, cur) => acc + cur, 0);

  //   return { items: priceItems, totalPrice: itemTotalPrice };
  // };

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
      <div>
        <ProgressButton
          prev={prev}
          next={next}
          step={step}
          maxSteps={maxSteps}
        />
      </div>
    </div>
  );
}

export default PriceDetail;

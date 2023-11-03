import React from 'react';
import CardHeader from './components/appearance/CardHeader';
import HotelCard from './components/hotel-card/HotelCard';
import PriceDetail from './PriceDetail';
import { useCart } from '../../AllContext/allUseContext';
import itemsType from '../hooks/itemsType';
function CartHotel({ prev, next, step, maxSteps }) {
  const { items } = useCart().cart;
  const hotelItems = itemsType(items, 'hotel');

  if (hotelItems.length !== 0) {
    return (
      <div className="container">
        <div className="row">
          <CardHeader text={'訂房資訊'} />
          <div className="d-flex justify-content-between">
            <div className="col-lg-7">
              <HotelCard />
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
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between">
            <div className="col-lg-7">
              <CardHeader text={'訂房資訊'} />
              <div className="empty-cart">
                <h1>您的住宿購物車是空的喔！</h1>
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
    );
  }
}

export default CartHotel;

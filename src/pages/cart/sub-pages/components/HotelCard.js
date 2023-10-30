import React from 'react';
import HotelCardInfo from './HotelCardInfo';
import HotelCardDetail from './HotelCardDetail';
import { useCart } from '../../utils/useCart';
import itemsType from '../../hooks/itemsType';

function HotelCard({}) {
  const { items } = useCart().cart;
  const hotelItems = itemsType(items, 'hotel');

  return (
    <>
      {hotelItems.map((hotelItem) => {
        return (
          <div className="card-wrap" key={hotelItem.name}>
            <div className="card-body">
              <HotelCardDetail hotelItem={hotelItem} />
            </div>
          </div>
        );
      })}
      <HotelCardInfo />
      {/* <PutInCartButton /> */}
      <div className="space"></div>
    </>
  );
}

export default HotelCard;

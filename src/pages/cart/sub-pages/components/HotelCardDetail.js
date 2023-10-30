import React from 'react';
import CardTitle from './CardTitle';
import CardBodyTop from './CardBodyTop';
import StateButton from './StateButton';
import { useCart } from '../../utils/useCart';
import CountButton from './CountButton';
import DateInput from './DateInput';

function HotelCardDetail({ hotelItem }) {
  const { name, rate, img, id, chozenType, quantity, checkin, checkout } =
    hotelItem;

  let dateLong = (+new Date(checkout) - +new Date(checkin)) / 86400000;
  const { removeItem, plusOne, minusOne } = useCart();

  return (
    <div className="pb-5">
      <CardTitle
        text="訂房預定資訊"
        deleteFun={() => {
          removeItem(hotelItem);
        }}
      />

      <CardBodyTop productName={name} rate={rate} img={img} />
      <StateButton text={chozenType} />
      <div className="d-flex">
        <DateInput
          text={'入住日期'}
          date={checkin}
          targetItem={hotelItem}
          max={checkout}
          dateProps={'checkin'}
        />
        <DateInput
          text={'退房日期'}
          date={checkout}
          targetItem={hotelItem}
          min={checkin}
          dateProps={'checkout'}
        />
        <div className="day-count">
          <p>{`${dateLong}晚`}</p>
        </div>
      </div>
      <div className="pt-4">
        <CountButton
          quantity={quantity}
          id={id}
          plusOne={() => {
            plusOne(hotelItem);
          }}
          minusOne={() => {
            minusOne(hotelItem);
          }}
        />
      </div>
    </div>
  );
}

export default HotelCardDetail;

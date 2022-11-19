import React, { useEffect, useState } from 'react';
import './BookingBar.scss';
import { useSlideOut } from '../Context/SlideOutContext';
import { ReactComponent as Sort } from '../../../../icon/sort.svg';
import BuyButton from '../BuyButton/BuyButton';
function BookingBar() {
  const { slideOut, bookingBarOpen, setBookingBarOpen } = useSlideOut();
  // const [bookingBarOpen, setBookingBarOpen] = useState(false);

  useEffect(() => {
    if (!slideOut) {
      setBookingBarOpen(false);
    }
  }, [slideOut]);
  return (
    <div className="BookingBar">
      <div className={slideOut ? 'ShowBookingBar' : ''}>
        <div className="container BookingBarContent d-flex align-items-center ">
          <div
            className="canTouch"
            onClick={(e) => {
              setBookingBarOpen(!bookingBarOpen);
            }}
          >
            <h2 style={{ color: '#4D4D4D' }}>
              {/* TODO:拿到真實名稱 */}路境行旅(Finders Hotel)
            </h2>
            <div className="icon d-flex align-items-center">
              <Sort />
            </div>
            <div
              className={bookingBarOpen ? 'bookingBarOpen' : 'bookingBarOff'}
              onClick={(e) => {
                e.stopPropagation();
              }}
            ></div>
          </div>
          <div className="BookingBarRight d-flex align-items-center justify-content-center">
            <h4
              style={{
                color: '#59d8a1',
                fontSize: '22px',
              }}
            >
              {/* TODO:拿到真實價格 */}TWD$2599
            </h4>
            <div className="d-flex">
              <BuyButton />
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default BookingBar;

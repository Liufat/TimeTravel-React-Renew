import React from 'react';
import './BuyButton.scss';
import { useHotelContext } from '../Context/HotelContext';
import { useCart } from '../../../AllContext/allUseContext';
import Swal from 'sweetalert2';
function BuyButton() {
  const { addItem } = useCart();
  const {
    roomCounts,
    hotelRoomPrice,
    hotelListData,
    pickDate,
    allStar,
    roomsChooseName,
  } = useHotelContext();
  const items = {
    type: 'hotel',
    id: hotelListData.sid,
    name: hotelListData.product_name,
    price: hotelRoomPrice,
    checkin: pickDate.startTime,
    checkout: pickDate.endTime,
    quantity: roomCounts,
    rate: allStar,
    chozenType: roomsChooseName,
  };
  return (
    <>
      <div className="BookingBarPriceAndButton">
        <button
          className="BottomBar_Buy_Right "
          style={{ backgroundColor: '#63D2FF' }}
          onClick={() => {
            Swal.fire({
              icon: 'success',
              title: '已加入購物車！',
              confirmButtonText: '確認',
              confirmButtonColor: '#59d8a1',
            });
            addItem(items);
            // console.log(roomsChooseName);
            // console.log(allStar);
          }}
        >
          加入購物車
        </button>
      </div>
      <div className="noMarginRight BookingBarPriceAndButton">
        <button
          className="BottomBar_Buy_Right "
          style={{ backgroundColor: '#59d8a1' }}
          onClick={() => {
            addItem(items);
            window.location = 'http://localhost:3000/cart';
          }}
        >
          立即訂購
        </button>
      </div>
    </>
  );
}

export default BuyButton;

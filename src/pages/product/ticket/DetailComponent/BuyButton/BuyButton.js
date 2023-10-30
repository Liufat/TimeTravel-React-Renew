import React from 'react';
import './BuyButton.scss';
import { useTicketContext } from '../../Context/TicketContext';
import Swal from 'sweetalert2';
import { useCart } from '../../../../cart/utils/useCart';
function BuyButton() {
  const { addItem } = useCart();
  const {
    ticketCounts,
    ticketTypePrice,
    ticketListData,
    pickDate,
    typesChooseName,
    allStar,
  } = useTicketContext();
  const ticketOrder = {
    type: 'ticket',
    id: ticketListData.sid,
    name: ticketListData.product_name,
    chozenType: typesChooseName,
    quantity: ticketCounts,
    startDate: pickDate.startTime,
    price: ticketTypePrice,
    rate: allStar,
    img: 'http://localhost:3001/uploads/ticket/14-1.jpg',
  };

  return (
    <>
      <div
        onClick={() => {
          Swal.fire({
            icon: 'success',
            title: '已加入購物車！',
            confirmButtonText: '確認',
            confirmButtonColor: '#59d8a1',
          });
          addItem(ticketOrder);
        }}
        className="BookingBarPriceAndButton"
      >
        <button
          className="BottomBar_Buy_Right "
          style={{ backgroundColor: '#63D2FF' }}
        >
          加入購物車
        </button>
      </div>
      <div
        className="noMarginRight BookingBarPriceAndButton"
        onClick={() => {
          addItem(ticketOrder);
        }}
      >
        <button
          className="BottomBar_Buy_Right "
          style={{ backgroundColor: '#59d8a1' }}
          onClick={() => {
            addItem(ticketOrder);
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

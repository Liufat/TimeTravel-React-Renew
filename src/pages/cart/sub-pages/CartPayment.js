import PaymentCard from './components/payment-card/PaymentCard';
import ProgressButton from './ProgressButton';
import { useCart } from '../../AllContext/allUseContext';
import { useEffect, useState } from 'react';
import itemsType from '../hooks/itemsType';
import { usePaymentInfo } from '../../AllContext/allUseContext';
import makingPriceDetail from '../hooks/makingPriceDetail';
function CartPayment({ paymentId, setPaymentId }) {
  const [payMethod, setPayMethod] = useState('');
  //取得存在localstorga的會員sid
  const member = JSON.parse(localStorage.getItem('auth'));
  // console.log(member.sid);
  //用毫秒當作訂單的uuid

  // 把創造訂單uuid改去後端執行
  // const uuid = +new Date();

  //取出usePaymentInfor裡的payment資料
  const { hotelRepresent, hotelMobile } = usePaymentInfo().hotelInformation;
  // console.log(hotelRepresent, hotelMobile);

  //抓出localstorage的資料
  const cart = useCart().cart;
  const { items } = cart;

  const foodItems = itemsType(items, 'food');
  const hotelItems = itemsType(items, 'hotel');
  const ticketItems = itemsType(items, 'ticket');

  const newFood = foodItems.map((v, i) => {
    // return { ...v, uuid };
    return { ...v };
  });
  const newHotel = hotelItems.map((v, i) => {
    // return { ...v, uuid, repName: hotelRepresent, repMobile: hotelMobile };
    return { ...v, repName: hotelRepresent, repMobile: hotelMobile };
  });
  const newTicket = ticketItems.map((v, i) => {
    // return { ...v, uuid };
    return { ...v };
  });

  //計算訂單的總價格
  // const totalPrice = 1000;
  const totalPrice =
    makingPriceDetail(cart, 'hotel').totalPrice +
    makingPriceDetail(cart, 'food').totalPrice +
    makingPriceDetail(cart, 'ticket').totalPrice;
  // useHotelCart().cart.cartTotal +
  // useFoodCart().cart.cartTotal +
  // useTicketCart().cart.cartTotal;

  const order = {
    member_sid: member.sid,
    // uuid: uuid,
    orders_total_price: totalPrice,
  };
  // setOrderId(order.uuid);
  const formData = {
    order: order,
    food: newFood,
    hotel: newHotel,
    ticket: newTicket,
  };

  // console.log(newFood);
  // console.log(newHotel);
  // console.log(newTicket);
  // console.log(order);
  // {food:[{id: "1",itemTotal: 25000,name: "美食1",picture: "https://via.placeholder.com/32",price: 25000,quantity: 1,rate: 4}],hotel:[{}],ticket:[{}]}

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <PaymentCard
        paymentId={paymentId}
        payMethod={payMethod}
        setPaymentId={setPaymentId}
        setPayMethod={setPayMethod}
      />
      <div>
        <ProgressButton formData={formData} payMethod={payMethod} />
      </div>
    </>
  );
}

export default CartPayment;

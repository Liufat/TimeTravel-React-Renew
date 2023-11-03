import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Minus_icon from '../../../icon/minus.svg';
import Minus_icon_active from '../../../icon/minusActive.svg';
import Add_icon from '../../../icon/add.svg';
import './style/FoodBookingBar.scss';
import { useFoodContext } from './FoodContext/FoodContext';
import { useCart } from '../../AllContext/allUseContext';
function FoodBookingBar({ foodData }) {
  console.log({ foodData });
  const { slideOut, count, setCount, totalPrice, setTotalPrice } =
    useFoodContext();
  const foodObj = {
    type: 'food',
    id: foodData.sid,
    // name: foodData.product_name,
    quantity: count,
    // price: foodData.p_selling_price,
    // img: 'http://localhost:3001/uploads/F116-1.jpg',
    // rate: 4.3,
  };
  useEffect(() => {}, [slideOut, totalPrice]);
  const { addItem } = useCart();
  return (
    <div className="BookingBar d-flex">
      <div className={slideOut ? 'ShowBookingBar' : ''}>
        <div className="container BookingBarContent d-flex align-items-center ">
          <h2 style={{ color: '#4D4D4D' }}>{foodData.product_name}</h2>
          <div className="d-flex">
            <div className="quantity d-flex align-items-center">
              <button
                className="countBtn"
                onClick={() => {
                  const newMinusCount = count - 1;
                  if (count === 1) {
                    return count;
                  } else {
                    setCount(newMinusCount);
                  }
                  const newMinusTotalPrice =
                    totalPrice - foodData.p_selling_price;
                  if (totalPrice === foodData.p_selling_price) {
                    return totalPrice;
                  } else {
                    setTotalPrice(newMinusTotalPrice);
                  }
                }}
              >
                <img
                  src={count > 1 ? Minus_icon_active : Minus_icon}
                  alt=""
                  className="Minus_icon"
                />
              </button>
              <p>{count}</p>
              <button
                className="countBtn"
                onClick={() => {
                  const newAddCount = count + 1;
                  setCount(newAddCount);
                  const newAddTotalPrice =
                    foodData.p_selling_price * newAddCount;
                  setTotalPrice(newAddTotalPrice);
                }}
              >
                <img src={Add_icon} alt="" className="Add_icon" />
              </button>
            </div>
            <div className="d-flex  align-items-center">
              <h4
                style={{
                  color: '#59d8a1',
                  fontSize: '22px',
                  marginRight: '30px',
                }}
              >
                TWD$
                {foodData.p_selling_price
                  ? totalPrice
                  : foodData.p_selling_price}
              </h4>
              <button
                type="button"
                className=" add_cart BottomBar_Buy_Right "
                style={{ backgroundColor: '#63D2FF' }}
                onClick={() => {
                  Swal.fire({
                    icon: 'success',
                    title: '已加入購物車！',
                    confirmButtonText: '確認',
                    confirmButtonColor: '#59d8a1',
                  });
                  addItem(foodObj);
                }}
              >
                加入購物車
              </button>
              <button
                type="button"
                className="buy_now BottomBar_Buy_Right "
                style={{ backgroundColor: '#59d8a1' }}
                onClick={() => {
                  addItem(foodObj);
                  window.location = 'http://localhost:3000/cart';
                }}
              >
                立即購買
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodBookingBar;

import React, { useState } from 'react';
//導入CSS
import './PageCompile/CartPageCompile.scss';
//導入排版
import NavBar from '../../layout/NavBar';
import Footer from '../../layout/Footer';
// 導入子頁面
import CartHotel from './sub-pages/CartHotel';
import CartFood from './sub-pages/CartFood';
import CartTicket from './sub-pages/CartTicket';
import CartPayment from './sub-pages/CartPayment';
//導入進度條
import ProgressBar from './components/ProgressBar';
import { useProgressContext } from './context/shopping-cart/useProgress';

function Cart() {
  const { step, maxSteps } = useProgressContext();

  const pageNames = ['住宿', '美食', '票券', '結帳'];

  const components = [CartHotel, CartFood, CartTicket, CartPayment];
  const BlockComponent = components[step - 1];

  //結帳用的state

  return (
    <>
      <NavBar />
      <div className="cart">
        {/* <div className="space"></div> */}
        <ProgressBar step={step} maxSteps={maxSteps} pageNames={pageNames} />
        <div className="cart__detail">
          <div className="container">
            <div className="row">
              <BlockComponent />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Cart;

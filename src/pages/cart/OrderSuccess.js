import React from 'react';
import NavBar from '../../layout/NavBar';
import Footer from '../../layout/Footer';
import './Cart.scss';
import SuccessIcon from './../../icon/success_cart.svg';

function OrderSuccess() {
  return (
    <>
      <NavBar />
      <div className="container success-fail">
        <div className="space"></div>
        <div className="img-wrap">
          <img
            className="success-fail-icon"
            src={SuccessIcon}
            alt="SuccessIcon"
          />
        </div>
        <h2 className="success">付款成功</h2>
        <p className="pb-5">感謝您選擇Time Travel，我們祝您旅途愉快</p>
      </div>

      <Footer />
    </>
  );
}

export default OrderSuccess;

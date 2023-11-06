import React from 'react';
import { MAKE_ORDER_API, LINE_PAY_API, ECPAY_API } from '../../../config';
import Swal from 'sweetalert2';
import axios from 'axios';
import { usePaymentInfo } from '../../AllContext/allUseContext';
import { useCart } from '../../AllContext/allUseContext';
import { useProgressContext } from '../context/shopping-cart/useProgress';

function ProgressButton({ formData, payMethod }) {
  const { step, maxSteps, prev, next } = useProgressContext();

  const { hotelInformation } = usePaymentInfo();
  const { hotelRepresent, hotelMobile } = hotelInformation;

  //如果購物車中有hotel項目，則需要進行住宿代表人與手機號碼檢查
  const { cart } = useCart();

  // cart.items.some((item) => item.type === 'hotel') 檢視cart.items中是否含有type === "hotel"的元素，有則回傳true
  const checkInfo = () => {
    if (cart.items.some((item) => item.type === 'hotel')) {
      if (hotelRepresent === '' || hotelMobile === '') {
        Swal.fire({
          icon: 'error',
          title: '代表人與手機號碼欄位不能為空白，請重新輸入',
          confirmButtonText: '確認',
          confirmButtonColor: '#59d8a1',
        });
        return;
      } else {
        next();
      }
    }
    next();
  };
  const mySubmit = async (e) => {
    const { data } = await axios.post(MAKE_ORDER_API, formData);

    const uuid = data.paymentId;

    if (data.success) {
      localStorage.removeItem('TimeTravelCart');

      Swal.fire({
        icon: 'success',
        title: '已成功建立訂單，即將跳往結帳頁面',
        confirmButtonText: '確認',
        confirmButtonColor: '#59d8a1',
      });
      if (payMethod === 'LinePay') {
        const payUrl = await Linepay(uuid);
        window.location = payUrl;
      }

      if (payMethod === 'Credit') {
        await EcPay(uuid);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: '訂單成立失敗！',
        confirmButtonText: '確認',
        confirmButtonColor: '#59d8a1',
      });
    }
  };

  // const tryMakingOrder = async () => {
  //   const { data } = await axios.post(MakeOrder, formData);
  //   console.log(data);
  //   //   const recentPaymentId = 272023102500099;
  //   //   const lastNum = (
  //   //     Number(recentPaymentId.toString().slice(-5)) + 1
  //   //   ).toString();

  //   //   console.log(lastNum.padStart(5, '0'));
  // };

  async function Linepay(uuid) {
    const response = await axios.get(LINE_PAY_API(uuid));
    const url = response.data.payUrl;
    return url;
  }

  async function EcPay(uuid) {
    const response = (await axios.get(ECPAY_API(uuid))).data.htm;
    if (response) {
      document.open();
      document.write(response);
      document.close();
    } else {
      Swal.fire({
        icon: 'error',
        title: '訂單成立失敗！',
      });
      window.location = 'http://localhost:3000/cart/fail';
    }
  }
  return (
    <div className="d-flex justify-content-evenly mb-5">
      {step === 1 ? (
        ''
      ) : (
        <button type="button" className="btn btn-primary" onClick={prev}>
          上一步
        </button>
      )}

      {step !== maxSteps ? (
        <button type="button" className="btn btn-primary" onClick={checkInfo}>
          下一步
        </button>
      ) : (
        <>
          {/* <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              tryMakingOrder();
            }}
          >
            模擬付款失敗
          </button> */}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              if (payMethod === 'LinePay' || payMethod === 'Credit') {
                mySubmit();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: '請先選擇一種支付方式！',
                  confirmButtonText: '確認',
                  confirmButtonColor: '#59d8a1',
                });
                return;
              }
            }}
          >
            確認結帳
          </button>
        </>
      )}
    </div>
  );
}

export default ProgressButton;

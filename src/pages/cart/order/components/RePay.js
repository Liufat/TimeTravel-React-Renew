import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LINE_PAY_API, ECPAY_API } from './../../../../config';

function RePay({ onHide, show, type, uuid }) {
  const [payMethod, setPayMethod] = useState('');
  let payUrl;
  const myPay = async () => {
    if (payMethod === 'LinePay') {
      await linePay(uuid);
      window.location = payUrl;
    }
    if (payMethod === 'Credit') {
      await EcPay(uuid);
    }
  };
  const linePay = async (uuid) => {
    const response = await axios.get(LINE_PAY_API(uuid));
    const url = response.data.payUrl;
    payUrl = url;
    // console.log(payUrl);
  };
  const EcPay = async (uuid) => {
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
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="repay">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <h1>請選擇付款方式</h1>
          </div>
          <div className="d-flex justify-content-center pb-3">
            <label
              onClick={() => {
                setPayMethod('LinePay');
              }}
            >
              <input type={'radio'} name={'paytype'} />
              <span className="btn btn-primary mx-2">LinePay</span>
            </label>
          </div>
          <div className="d-flex justify-content-center pb-3">
            <label
              onClick={() => {
                setPayMethod('Credit');
              }}
            >
              <input type={'radio'} name={'paytype'} />
              <span className="btn btn-primary mx-2">信用卡一次付清</span>
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              // console.log(formData);
              if (payMethod === '') {
                Swal.fire({
                  icon: 'error',
                  title: '請先選擇一種支付方式！',
                  confirmButtonText: '確認',
                  confirmButtonColor: '#59d8a1',
                });
                return;
              } else {
                Swal.fire({
                  title: '即將跳往結帳頁面',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: ' 確定',
                  confirmButtonColor: '#59d8a1',
                  cancelButtonText: '取消',
                  cancelButtonColor: '#D9D9D9',
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    myPay();
                  } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    Swal.fire({
                      icon: 'error',
                      title: '沒關係，您可以稍後再結帳',
                      confirmButtonText: '確認',
                      confirmButtonColor: '#59d8a1',
                    });
                    return;
                  }
                });
              }

              // console.log(formData);
              onHide();
            }}
          >
            前往結帳
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default RePay;

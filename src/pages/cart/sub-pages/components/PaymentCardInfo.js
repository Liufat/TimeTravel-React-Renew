import React from 'react';
import { usePaymentInfo } from '../../context/usePaymentInfo';

function PaymentCardInfo() {
  const { paymentInformation, changePaymentInformation } = usePaymentInfo();
  const { paymentRepresent, paymentEmail, paymentMobile, paymentId } =
    paymentInformation;
  return (
    <>
      <div className="d-flex pb-5">
        <div className="me-3">
          <p
            onClick={() => {
              changePaymentInformation({
                paymentRepresent: '谷鄉元昭',
                paymentMobile: '0966567654',
                paymentEmail: 'bestgirlyagoo@gmail.com',
                paymentId: 'A129715143',
              });
            }}
          >
            {'訂單聯絡人'}
          </p>
          <input
            className="input form-control"
            type={'text'}
            placeholder={'請輸入姓名'}
            value={paymentRepresent}
            onChange={(e) => {
              const payload = e.target.value;
              changePaymentInformation({ paymentRepresent: payload });
            }}
            style={{ width: '300px' }}
          />
        </div>
        <div>
          <p>{'手機號碼'}</p>
          <input
            className="input form-control"
            type={'tel'}
            placeholder={'請輸入正確的電話號碼'}
            style={{ width: '300px' }}
            value={paymentMobile}
            onChange={(e) => {
              const payload = e.target.value;
              changePaymentInformation({ paymentMoble: payload });
            }}
          />
        </div>
      </div>
      <div className="d-flex pb-5">
        <div className="me-3">
          <p>{'Email'}</p>
          <input
            className="input form-control"
            type={'tel'}
            placeholder={'example@mail.com'}
            style={{ width: '300px' }}
            value={paymentEmail}
            onChange={(e) => {
              const payload = e.target.value;
              changePaymentInformation({ paymentEmail: payload });
            }}
          />
        </div>
        <div>
          <p>{'身分證字號'}</p>
          <input
            className="input form-control"
            type={'tel'}
            placeholder={'外籍人士請輸入護照號碼'}
            style={{ width: '300px' }}
            value={paymentId}
            onChange={(e) => {
              const payload = e.target.value;
              changePaymentInformation({ paymentId: payload });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default PaymentCardInfo;

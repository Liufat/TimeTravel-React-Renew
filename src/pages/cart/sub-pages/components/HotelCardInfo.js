import React from 'react';
import { usePaymentInfo } from '../../context/usePaymentInfo';

function HotelCardInfo({}) {
  const { hotelRepresent, hotelMobile } = usePaymentInfo().hotelInformation;

  const { changeHotelInformation } = usePaymentInfo();
  return (
    <div className="card-wrap">
      <div className="card-body">
        <h2>入住資訊</h2>
        <div className="d-flex align-items-end ">
          <div className="me-3">
            <p
              onClick={() => {
                changeHotelInformation({ hotelRepresent: '生日哥' });
              }}
            >
              入住代表人
            </p>
            <input
              className="input form-control"
              type={'text'}
              placeholder={'中文姓名'}
              value={hotelRepresent}
              onChange={(e) => {
                const name = e.target.value;
                changeHotelInformation({ hotelRepresent: name });
                // console.log(hotelInformation);
              }}
            />
          </div>
        </div>
        <div className="my-4">
          <p>入住人姓名必須與證件顯示完全相同。</p>
          <p>入住時請以中文姓名為準。</p>
        </div>
        <div>
          <div>
            <p>手機號碼</p>
            <input
              className="input form-control"
              type={'tel'}
              placeholder={'請輸入正確的手機號碼'}
              value={hotelMobile}
              onChange={(e) => {
                const mobile = e.target.value;
                changeHotelInformation({ hotelMobile: mobile });
                // console.log(mobile);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCardInfo;

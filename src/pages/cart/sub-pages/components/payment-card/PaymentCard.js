import CardHeader from 'react-bootstrap/esm/CardHeader';
import PaymentCardInfo from './PaymentCardInfo';
function PaymentCard({ payMethod, setPayMethod }) {
  return (
    <div>
      <CardHeader text={'購買人資料'} />
      <PaymentCardInfo />
      <CardHeader text={'選擇付款方式'} />
      <div className="pb-5">
        <label
          onClick={() => {
            setPayMethod('LinePay');
          }}
        >
          <input type={'radio'} name={'paytype'} />
          <span className="btn btn-primary mx-2">LinePay</span>
        </label>
      </div>
      <div className="pb-5">
        <label
          onClick={() => {
            setPayMethod('Credit');
          }}
        >
          <input type={'radio'} name={'paytype'} />
          <span className="btn btn-primary mx-2">信用卡一次付清</span>
        </label>
      </div>
    </div>
  );
}

export default PaymentCard;

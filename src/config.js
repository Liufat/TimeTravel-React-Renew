export const MY_HOST = 'http://localhost:3001';

// export const AB_LIST_AUTH = `${MY_HOST}/ab/api/list-auth`;
// 假登入
export const LOGIN_API = `${MY_HOST}/member/api/login-api`;
export const SIGNIN_API = `${MY_HOST}/member/api/signin-api`;
export const PROFILE_API = `${MY_HOST}/member/api/edit-member-api`;
export const RESET_PASSWORD_API = `${MY_HOST}/member/api/reset-password-member-api`;
export const UPLOAD_AVATAR_API = `${MY_HOST}/member/upload-avatar`;
export const userImg = `${MY_HOST}/uploads/Member/`;
export const COMMENT_API = function (sid) {
  return `${MY_HOST}/member/${sid}/comment`;
};

export const HOTEL_LIST = `${MY_HOST}/hotel/api`;

export const FOOD_LIST = `${MY_HOST}/food/api`;
export const FOOD_ITEM = `${MY_HOST}/food/item/`;
export const FOOD_CARD_ITEM1 = `${MY_HOST}/food/item/117`;
export const FOOD_CARD_ITEM2 = `${MY_HOST}/food/item/125`;
export const FOOD_CARD_ITEM3 = `${MY_HOST}/food/item/124`;
export const FOOD_CARD_ITEM4 = `${MY_HOST}/food/item/118`;
export const FOOD_CARD_ITEM5 = `${MY_HOST}/food/item/129`;
export const FOOD_CARD_ITEM6 = `${MY_HOST}/food/item/128`;
export const FOOD_IMG = `${MY_HOST}/uploads/`;
export const FOOD_COMMENT = `${MY_HOST}/food/commit`;
export const FOOD_ORDER_DETAIL = `${MY_HOST}/orders/api/list/foodlist/`;

export const PRODUCT_LIST = `${MY_HOST}/productAll/api`;

export const ADD_COLLECT = `${MY_HOST}/productAll/AddCollect`;
export const DEL_COLLECT = `${MY_HOST}/productAll/DelCollect`;
export const GET_COLLECT = `${MY_HOST}/productAll/checkCollect/:member`;
//購物車路徑
export const MakeOrder = `${MY_HOST}/cart/api/makeorder`;
// export const MakeHotelOrder = `${MY_HOST}/cart/api/makehotelorder`;
// export const MakeFoodOrder = `${MY_HOST}/cart/api/makefoodorder`;
// export const MakeTicketOrder = `${MY_HOST}/cart/api/maketicketorder`;

//訂單路徑
//指定會員的總訂單
export const ORDERS_API = function (sid) {
  return `${MY_HOST}/orders/api/list/${sid}`;
};
export const ORDER_DETAILS_FOOD_API = function (uuid) {
  return `${MY_HOST}/orders/api/list/foodlist/${uuid}`;
};
export const ORDER_DETAILS_HOTEL_API = function (uuid) {
  return `${MY_HOST}/orders/api/list/hotellist/${uuid}`;
};
export const ORDER_DETAILS_TICKET_API = function (uuid) {
  return `${MY_HOST}/orders/api/list/ticketlist/${uuid}`;
};

//結帳流程
//獲取指定訂單編號的資料-LINE PAY
export const LINE_PAY_API = function (paymentId) {
  return `${MY_HOST}/pay/api/paylist/${paymentId}`;
};
//確認訂單是否結帳成功
export const LINE_PAY_CONFIRM_API = `${MY_HOST}/pay/api/paycheck`;

//獲取指定訂單編號的資料-綠界
export const GREEN_PAY_API = function (paymentId) {
  return `${MY_HOST}/pay/api/paygreen/${paymentId}`;
};

//更改訂單付款狀態
export const CHANGE_PAY_API = `${MY_HOST}/pay/api/change-pay`;

// 收取綠界api回報的付款狀態
export const CHANGE_GREENPAY_API = `${MY_HOST}/pay/api/green-pay-change-state`;

//輸入評論路徑
export const SUBMIT_COMMENT_API = `${MY_HOST}/comment/api/submit-comment-api`;

//修改訂單未評論/已評論狀態
export const CHANGE_COMMENTED_API = `${MY_HOST}/comment/api/change-commented`;

//從node抓照片資料
export const appConfig = {
  debug: true,
  devUrl: 'http://localhost:3001',
  devServerUrl: MY_HOST,
  prodUrl: 'https://www.timetravel.com',
};

// //從node抓照片資料
// export const appConfig = {
//   debug: true,
//   devUrl: 'http://localhost:3001',
//   devServerUrl: MY_HOST,
//   prodUrl: 'https://www.timetravel.com',
// };

// export const imgUrl = appConfig.debug
//   ? appConfig.devServerUrl
//   : appConfig.prodUrl;

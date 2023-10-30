export const initialState = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  cartTotal: 0,
};

/* 
  // 一、加入購物車
  //   概念：將購物資訊放入一個obj，將此obj JSON.stringfy()後，加入localStorage
  // TODO：組成obj，格式如下

{
共通項目：
  cartType:string(food/ticket/hotel),
  id:int(1),
  quantity:int(2)

住宿與票券共通項目：
  chozenType：string(住宿：行政雙人房/豪華雙人房。票券：學生票/優惠票)
  startDate:date(2023/05/06)

專屬住宿項目：
  endDate:date(2023/05/07)

} 

所以在useCart中，呼喚addItem的reducer，並傳入購物資訊Obj.，就能return一個
{ items: [購物資訊], isEmpty: false, totalItems: 1, cartTotal: 100 }的state
將此state，

*/
/* {
 items: [{
    cartType:string(food/ticket/hotel),
    id:int(1),
    quantity:int(2)
    chozenType：string(住宿：行政雙人房/豪華雙人房。票券：學生票/優惠票) **
    startDate:date(2023/05/06) **
    endDate:date(2023/05/07)  **
  }],
 isEmpty: false,  
 totalItems: 1,
} */

/*TODO:常常會用到existingItemIndex，所以將其寫成一個獨立的function方便使用*/
const isItemExisting = (item, payload) => {
  const existingItemIndex = item.findIndex(
    (item) => item.type === payload.type && item.id === payload.id
  );
  return existingItemIndex;
};

/*TODO:增加商品
  傳入新商品資訊的object(action.payload)後，對比既有商品(state.items)的type與id
  
  若無重複，則將新商品資訊加入既有商品的array中
  
  若有重複，則既有商品的quantity+1
*/
const addItemFunction = (state, action) => {
  const existingItemIndex = isItemExisting(state.items, action.payload);
  if (existingItemIndex > -1) {
    return {
      items: [...state.items],
      isEmpty: false,
      totalItems: state.totalItems,
    };
  }
  return {
    items: [...state.items, action.payload],
    isEmpty: false,
    totalItems: state.totalItems + 1,
  };
};

/*TODO:修改商品
  主要目的是修改既有商品(state.items)的props(ex.quantity、chozenType、startDate等等)

  傳入新的商品object(action.payload)，對比既有商品(state.items)的type與id

  若兩者皆重複，則使用新的商品props取代既有商品props

  payload必要的值為：id、type
*/

const updateItemFunction = (state, action) => {
  // 1.尋找重複項目的index
  const existingItemIndex = isItemExisting(
    state.items,
    action.payload.targetItem
  );

  if (existingItemIndex > -1) {
    // 2.如果有找到重複項目的index，則先複製一個與state.items相同的array
    const newItems = [...state.items];
    // 3.然後將array的指定index項目，對比action.payload，若有相同props則進行取代
    newItems[existingItemIndex] = {
      ...newItems[existingItemIndex],
      ...action.payload.changingTarget,
    };

    const newResult = { ...state, items: newItems };

    return newResult;
  }
  // console.log(state);

  return state;
};

/*TODO:刪除商品
  修改既有商品，傳入商品的type與id(action.payload)，將符合指定type和id的object，從既有商品array(state.items)中移除(創建一個新的array，其中不包含指定目標)
*/

const removeItemFunction = (state, action) => {
  console.log(state, action);
  const newItems = [...state.items];
  const newFilterItems = newItems.filter((item) => {
    return item.type !== action.payload.type || item.id !== action.payload.id;
  });

  const newResult = {
    ...state,
    items: newFilterItems,
    totalItems: state.totalItems - 1,
  };

  return newResult;
};

/*TODO:商品數量加一 */

const plusOneItemFunction = (state, action) => {
  const existingItemIndex = isItemExisting(state.items, action.payload);

  if (existingItemIndex > -1) {
    // 2.如果有找到重複項目的index，則先複製一個與state.items相同的array
    const newItems = [...state.items];
    const targetItem = newItems[existingItemIndex];

    newItems[existingItemIndex] = {
      ...targetItem,
      quantity: state.items[existingItemIndex].quantity + 1,
    };

    const newResult = { ...state, items: newItems };

    return newResult;
  }
};

const minusOneItemFunction = (state, action) => {
  const existingItemIndex = isItemExisting(state.items, action.payload);
  if (existingItemIndex > -1) {
    const newItems = [...state.items];
    const targetItem = newItems[existingItemIndex];
    newItems[existingItemIndex] = {
      ...targetItem,
      quantity:
        state.items[existingItemIndex].quantity > 1
          ? state.items[existingItemIndex].quantity - 1
          : state.items[existingItemIndex].quantity,
    };
    const newResult = { ...state, items: newItems };

    return newResult;
  }
};

export function CarReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return addItemFunction(state, action);
    case 'REMOVE_ITEM':
      return removeItemFunction(state, action);

    case 'PLUS_ONE':
      return plusOneItemFunction(state, action);

    case 'MINUS_ONE':
      return minusOneItemFunction(state, action);

    case 'UPDATE_ITEM':
      return updateItemFunction(state, action);

    default:
      return;
  }
}

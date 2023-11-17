import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useLocation, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { FOOD_LIST } from '../../../config.js';
// import { ADD_COLLECT } from '../../../config.js';

import NavBar from '../../../layout/NavBar';
import Footer from '../../../layout/Footer';
import { FOOD_IMG } from '../../../config';
import Map from '../../../icon/map.svg';
import Heart from '../../../icon/heart_gray.svg';
import PinkHeart from '../../../icon/heart.svg';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../Component/Sidebar1/Sidebar_Food';
// import CommitSelector from './CommentSelect.js';
import BreadCrumbList from './BreadCrumbList';
// import Qrcode from '../../../Component/QRcode/Qrcode';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useFoodContext } from './FoodContext/FoodContext.js';
import { useAllContext } from '../../AllContext/AllContext.js';
import HotelListSortSelector from '../stays/HotelListSortSelector/HotelListSortSelector';
import { useHotelContext } from '../stays/Context/HotelContext.js';
import './style/Food.scss';

function Food() {
  const { pageSearchWord, setPageSearchWord } = useAllContext();
  const { collect, setCollect } = useFoodContext();
  //從伺服器來的資料
  const [foodData, setFoodData] = useState([]);

  //呈現顯示資料用
  const [foodProductDisplay, setFoodProductDisplay] = useState([]);

  const { hotelSort, setHotelSort } = useHotelContext();

  async function getList() {
    const response = await axios.get(FOOD_LIST);
    setFoodData(response.data);
    const pageList = _.chunk(response.data, perPage);
    setFoodProductDisplay(pageList);
    setPageTotal(pageList.length);
    // HotelSort預設值
    setHotelSort({
      area: 'area_All',
      cate: 'cate_Food_All',
      like: 'likeAll',
      sortBy: '',
    });

    const responseCollect = await axios.get(
      `http://localhost:3001/productAll/checkCollect/${
        JSON.parse(localStorage.getItem('auth')).sid
      }`
    );

    setCollect(responseCollect.data);

    console.log(responseCollect.data);
    // console.log('foodDisplay', foodProductDisplay);
  }
  useEffect(() => {
    getList();
  }, []);

  // useEffect(() => {
  //   getFoodListData(foodProductDisplay, perPage);
  // }, [foodData]);
  const navigate = useNavigate();
  //分頁
  //當前分頁最小為1,最大看資料計算最大頁數
  const [pageNow, setPageNow] = useState(1);
  //每頁多少筆資料
  const [perPage, setPerPage] = useState(12);
  //總共多少頁。在資料進入後(didMount)後需要計算出後才決定
  const [pageTotal, setPageTotal] = useState(0);

  //處理分頁資料
  const getFoodListData = (v, perPage) => {
    const pageList = _.chunk(v, perPage);
    console.log('pageList:', pageList[0]);

    if (pageList.length > 0) {
      setPageTotal(pageList.length);
      //紀錄分塊後的資料
      setFoodProductDisplay(pageList);
      // setHaveData(true);
    }

    // console.log('foodProductDisplay', foodProductDisplay);
  };

  // 處理過濾的函式
  const handleSearch = (foodData, searchWord) => {
    let newFoodData = [...foodData];
    if (searchWord.length < 2) return newFoodData;
    // console.log('newFoodData', newFoodData);

    newFoodData = newFoodData.filter((item) => {
      //搜尋商品名稱、縣市地區名、分類名
      return (
        item.product_name.includes(searchWord) +
        item.city_name.includes(searchWord) +
        item.area_name.includes(searchWord) +
        item.categories_name.includes(searchWord)
      );
    });
    setPageNow(1);
    return newFoodData;
  };

  //  處理排序（價格、收藏數）
  const handleSortPrice = (hotelSortData, hotelSort) => {
    let newHotelSortData = [...hotelSortData];

    // 處理目的地
    switch (hotelSort) {
      case 'sortByPriceDESC':
        newHotelSortData = [...newHotelSortData].sort((a, b) => {
          return b.p_selling_price - a.p_selling_price;
        });
        break;
      case 'sortByPriceASC':
        newHotelSortData = [...newHotelSortData].sort((a, b) => {
          return a.p_selling_price - b.p_selling_price;
        });
        break;
      case 'sortByCollectDESC':
        newHotelSortData = [...newHotelSortData].sort((a, b) => {
          return b.collect - a.collect;
        });
        break;
      case 'sortByCollectASC':
        newHotelSortData = [...newHotelSortData].sort((a, b) => {
          return a.collect - b.collect;
        });
        break;
      default:
        break;
    }

    return newHotelSortData;
  };

  //  列表資料篩選（地區）
  const handleArea = (hotelSortData, hotelSort) => {
    let newHotelSortData = [...hotelSortData];

    // 處理目的地
    switch (hotelSort) {
      case 'area_Taipei':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.city_name === '台北市';
        });
        break;
      case 'area_NewTaipei':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.city_name === '新北市';
        });
        break;
      case 'area_Keelung':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.city_name === '基隆市';
        });
        break;
      // 指所有的產品都出現
      case 'area_All':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.city_name !== '';
        });
        break;
      default:
        break;
    }

    return newHotelSortData;
  };

  //  列表資料篩選（住宿類型）
  const handleCate = (hotelSortData, hotelSort) => {
    let newHotelSortData = [...hotelSortData];

    // 處理目的地
    switch (hotelSort) {
      case 'cate_Food_1':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.categories_sid === 1;
        });
        break;
      case 'cate_Food_2':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.categories_sid === 2;
        });
        break;
      case 'cate_Food_3':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.categories_sid === 3;
        });
        break;
      case 'cate_Food_4':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.categories_sid === 4;
        });
        break;
      case 'cate_Food_5':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.categories_sid === 5;
        });
        break;
      case 'cate_Food_6':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.categories_sid === 6;
        });
        break;
      case 'cate_Food_7':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.categories_sid === 7;
        });
        break;
      case 'cate_Food_8':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.categories_sid === 8;
        });
        break;
      // 指所有的產品都出現
      case 'cate_Food_All':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.categories_sid !== '';
        });
        break;
      default:
        break;
    }

    return newHotelSortData;
  };

  //  列表資料篩選（收藏數）
  const handleAddLike = (hotelSortData, hotelSort) => {
    let newHotelSortData = [...hotelSortData];
    // console.log(newHotelSortData);

    // 處理目的地
    switch (hotelSort) {
      case 'like<100':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.collect <= 100;
        });
        break;
      case 'like200':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.collect <= 200 && v.collect > 100;
        });
        break;
      case 'like300':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.collect <= 300 && v.collect > 200;
        });
        break;
      case 'like400':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.collect <= 400 && v.collect > 300;
        });
        break;
      case 'like500':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.collect <= 500 && v.collect > 400;
        });
        break;
      case 'like>500':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.collect >= 500;
        });
        break;
      case 'likeAll':
        newHotelSortData = hotelSortData.filter((v) => {
          return v.collect < 1000;
        });
        break;
      // 指所有的產品都出現
      default:
        break;
    }

    return newHotelSortData;
  };

  useEffect(() => {
    // if (pageSearchWord.length < 1) return;

    let newFoodData = [];

    setPageNow(1);

    newFoodData = handleSearch(foodData, pageSearchWord);

    newFoodData = handleSortPrice(newFoodData, hotelSort.sortBy);

    newFoodData = handleArea(newFoodData, hotelSort.area);

    newFoodData = handleCate(newFoodData, hotelSort.cate);

    newFoodData = handleAddLike(newFoodData, hotelSort.like);

    setFoodProductDisplay(newFoodData);

    getFoodListData(newFoodData, perPage);
  }, [
    pageSearchWord,
    hotelSort.sortBy,
    hotelSort.area,
    hotelSort.cate,
    hotelSort.like,
  ]);

  const display = (
    <Row
      xs={1}
      md={2}
      lg={4}
      className="d-flex justify-content-flexstart flex-wrap"
    >
      {foodProductDisplay[pageNow - 1]
        ? foodProductDisplay[pageNow - 1].map((v, i) => {
            return (
              <Card className="MyCard col-3" style={{ width: '20rem' }} key={i}>
                <div style={{ overflow: 'hidden' }}>
                  <Card.Img
                    variant="top"
                    className="foodCardImg1"
                    src={`${FOOD_IMG}${v.product_photo}`}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <Card.Body>
                  <Link to="detail">
                    <Card.Title className="Card_Title">
                      {v.product_name}
                    </Card.Title>
                  </Link>
                  <Card.Text className="Card_Text">
                    <Card.Img src={Map} className="Map_icon" />
                    <span className="Card_Score">
                      {v.city_name} | {v.area_name}
                    </span>
                  </Card.Text>
                  <div className="d-flex PriceAndCollect">
                    <div>
                      <button
                        className="Heart_btn"
                        onClick={() => {
                          const member_sid = JSON.parse(
                            localStorage.getItem('auth')
                          ).sid;
                          const product_sid = v.sid;
                          const collect_product_name = v.product_name;

                          //後端先發送移除收藏
                          if (collect.includes(v.product_name)) {
                            axios.post(
                              'http://localhost:3001/productAll/DelCollect',
                              {
                                member_sid: member_sid,
                                product_sid: product_sid,
                                collect_product_name: collect_product_name,
                              }
                            );
                            console.log('移除收藏');
                            //前端顯示空心
                            setCollect(
                              collect.filter((el) => {
                                return el !== v.product_name;
                              })
                            );
                          } else {
                            //前端發送新增收藏
                            axios.post(
                              'http://localhost:3001/productAll/AddCollect',
                              {
                                member_sid: member_sid,
                                product_sid: product_sid,
                                collect_product_name: collect_product_name,
                              }
                            );
                            console.log('新增收藏');
                            //解構出原收藏陣列,把新的收藏塞回去
                            setCollect([...collect, v.product_name]);
                          }
                        }}
                      >
                        <img
                          src={
                            collect.includes(v.product_name) ? PinkHeart : Heart
                          }
                          style={{ width: '25px', height: '25px' }}
                          alt=""
                        />
                        <span>
                          {collect.includes(v.product_name)
                            ? Number(v.collect) + 1
                            : v.collect}
                        </span>
                      </button>
                    </div>
                    <div>
                      <h2
                        variant="primary"
                        className="Card_Price"
                        style={{ color: '#59d8a1', margin: 0 }}
                      >
                        NT${v.p_selling_price}
                      </h2>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        : ''}
    </Row>
  );

  const paginationBar = (
    <ul className="pagination d-flex">
      <li className="page-item ">
        <div>
          <button
            className="page-link  prevPage"
            aria-label="Previous"
            onClick={() => {
              if (pageNow > 1) {
                setPageNow(pageNow - 1);
              }
            }}
          >
            <MdOutlineChevronLeft />
          </button>
        </div>
      </li>
      {Array(pageTotal)
        .fill(1)
        .map((v, i) => {
          const classNames = ['page-item'];
          const p = i + 1;

          if (pageNow >= 4 && pageNow <= pageTotal - 3) {
            if (pageNow > p + 3 || pageNow < p - 3) return null;
          } else if (pageNow === 3) {
            if (pageNow > p + 2 || pageNow < p - 4) return null;
          } else if (pageNow === 2) {
            if (pageNow > p + 1 || pageNow < p - 5) return null;
          } else if (pageNow === 1) {
            if (pageNow > p || pageNow < p - 6) return null;
          } else if (pageNow === pageTotal - 2) {
            if (pageNow > p + 4 || pageNow < p - 2) return null;
          } else if (pageNow === pageTotal - 1) {
            if (pageNow > p + 5 || pageNow < p - 1) return null;
          } else if (pageNow === pageTotal) {
            if (pageNow > p + 6 || pageNow < p) return null;
          }
          if (p === pageNow) classNames.push('active');
          return (
            <li className={classNames.join(' ')} key={p}>
              <div>
                <button
                  className="page-link pagi"
                  onClick={() => {
                    setPageNow(p);
                  }}
                >
                  {p}
                </button>
              </div>
            </li>
          );
        })}

      <li className="page-item">
        <div>
          <button
            className="page-link nextPage"
            onClick={() => {
              if (pageNow < pageTotal) {
                setPageNow(pageNow + 1);
              }
            }}
          >
            <MdOutlineChevronRight />
          </button>
        </div>
      </li>
    </ul>
  );

  return (
    <>
      <NavBar />
      <div className="space "></div>

      <div
        className="container col-12 d-flex breadCrumb_Sort"
        style={{ paddingLeft: '14px' }}
      >
        <div style={{ paddingTop: '10px' }} className="textAlign-center">
          <BreadCrumbList foodData={foodData} />
        </div>

        <div className="d-flex col-lg-10 hotelSort">
          <HotelListSortSelector />
        </div>
      </div>

      <div className="container col-lg-12 d-flex foodContent">
        <div className="col-lg-3  px-3 " style={{ paddingTop: '20px' }}>
          <Sidebar />
        </div>

        <div className="col-lg-9 col-md-12 CardListStyle">{display}</div>
      </div>
      <div className="foodPagination">{paginationBar}</div>

      <div className="space"></div>
      {/* <Qrcode /> */}
      <Footer />
    </>
  );
}

export default Food;

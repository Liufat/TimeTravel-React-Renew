import React from 'react';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';

function Pagination({ pageNow, pageTotal, setPage, prePage, nextPage }) {
  const paginationBar = (
    <ul className="pagination d-flex">
      <li className="page-item ">
        <div>
          <button
            className="page-link  prevPage"
            aria-label="Previous"
            onClick={() => {
              prePage();
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

          if (p === pageNow) classNames.push('active');
          return (
            <li className={classNames.join(' ')} key={p}>
              <div>
                <button
                  className="page-link pagi"
                  onClick={() => {
                    setPage(p);
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
              nextPage();
            }}
          >
            <MdOutlineChevronRight />
          </button>
        </div>
      </li>
    </ul>
  );

  return paginationBar;
}

export default Pagination;

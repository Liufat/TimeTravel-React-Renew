const buildPaginationInfo = (items, itemsPerPage) => {
  const countTotalPage = (items, itemsPerPage) => {
    if (!items) return 1;
    return Math.ceil(items.length / itemsPerPage);
  };
  const pageInfo = {
    totalPages: countTotalPage(items, itemsPerPage),
    items: items,
    itemsPerPage: itemsPerPage,
  };
  return pageInfo;
};

export default buildPaginationInfo;

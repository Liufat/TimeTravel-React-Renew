export default function makingPriceDetail(cart, type) {
  const priceItems = cart.items.filter((item) => item.type === type);

  const itemTotalPrice =
    // 如果是住宿的價錢，還要考慮到天數
    type !== 'hotel'
      ? priceItems
          .map((priceItem) => priceItem.price * priceItem.quantity)
          .reduce((acc, cur) => acc + cur, 0)
      : priceItems
          .map(
            (priceItem) =>
              (priceItem.price *
                priceItem.quantity *
                (+new Date(priceItem.checkout) -
                  +new Date(priceItem.checkin))) /
              86400000
          )
          .reduce((acc, cur) => acc + cur, 0);

  return { items: priceItems, totalPrice: itemTotalPrice };
}

export default function itemsType(items, type) {
  const result = items.filter((item) => item.type === type);
  return result;
}

import Pagination from "react-bootstrap/Pagination";
export const CustomPagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
}) => {
  let active = currentPage;
  let initial = 1;
  let final = totalPage < 5 ? totalPage : 5;
  let items = [];
  const delta = 2;
  if (currentPage > 3) {
    const currentPosition = currentPage - delta;
    initial =
      totalPage - currentPosition === 2 || totalPage - currentPosition === 3
        ? totalPage - 4
        : currentPage - 2;
    initial = initial > 0 ? initial : 1;
    final =
      currentPage + delta < totalPage && currentPage < totalPage
        ? currentPage + delta
        : totalPage;
  }
  for (let number = initial; number <= final; number++) {
    items.push(
      <Pagination.Item
        onClick={() => setCurrentPage(number)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }
  return totalPage > 1 ? <Pagination>{items}</Pagination> : null;
};

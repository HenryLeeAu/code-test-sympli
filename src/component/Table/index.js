import Item from "./Item";

const Table = ({
  list,
  clickNext,
  clickPrevious,
  enablePrev,
  enableNext,
  onClick,
}) => {
  const handleOnClick = (targetItem) => {
    onClick(targetItem);
  };

  return (
    <>
      <div data-testid="table">
        {list.map((item) => (
          <div
            key={item.name}
            onClick={() => handleOnClick(item)}
            data-testid="row"
          >
            <Item name={item.name} height={item.height} mass={item.mass} />
          </div>
        ))}
      </div>
      <div>
        {enablePrev && <div onClick={clickPrevious}>Prev</div>}
        {enableNext && <div onClick={clickNext}>Next </div>}
      </div>
    </>
  );
};

export default Table;

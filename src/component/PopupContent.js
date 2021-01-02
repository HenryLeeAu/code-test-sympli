const PopupContent = ({
  name = "",
  height = "",
  birth = "",
  gender = "",
  films = [],
}) => (
  <div data-testid="modal">
    <div>{name}</div>
    <div>{height}</div>
    <div>{birth}</div>
    <div>{gender}</div>
    <div>List of films: </div>
    <ul>
      {films
        .filter((film) => !!film)
        .map((film) => (
          <li data-testid="film-item" key={`${film}`}>
            {film}
          </li>
        ))}
    </ul>
  </div>
);

export default PopupContent;

import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
`;

const PopupContent = ({
  name = "",
  height = "",
  birth = "",
  gender = "",
  films = [],
}) => (
  <Wrapper data-testid="modal">
    <div>Name: {name}</div>
    <div>Height: {height}</div>
    <div>Birth: {birth}</div>
    <div>Gender: {gender}</div>
    <div>
      List of films:
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
  </Wrapper>
);

export default PopupContent;

import { memo } from "react";
import styled from "styled-components";

const Col = styled.div`
  padding: 10px;
`;

const Item = ({ name, height, mass }) => (
  <>
    <Col>{name}</Col>
    <Col>{height}</Col>
    <Col>{mass}</Col>
  </>
);

export default memo(Item);

import styled from "styled-components";

import Item from "./Item";

const Wrapper = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  border-top: ${({ heading }) => `${heading ? 0 : 1}px solid #ccc`};
  background: ${({ heading }) => (heading ? "#f3f3f3" : "#fff")};
`;

const Col = styled.div`
  padding: 10px;
`;

const Button = styled.button`
  font-size: 14px;
  display: inline-block;
  margin: 0 10px 10px 0;
`;

const Footer = styled.div`
  text-align: right;
`;

const Table = ({
  list,
  clickNext,
  clickPrevious,
  enablePrev,
  enableNext,
  onClick,
}) => {
  return (
    <>
      <Wrapper data-testid="table">
        <Row heading>
          <Col>Name</Col>
          <Col>Height</Col>
          <Col>Mass</Col>
        </Row>
        {list.map((item) => (
          <Row key={item.name} onClick={() => onClick(item)} data-testid="row">
            <Item name={item.name} height={item.height} mass={item.mass} />
          </Row>
        ))}
      </Wrapper>
      <Footer>
        {enablePrev && <Button onClick={clickPrevious}>Prev</Button>}
        {enableNext && <Button onClick={clickNext}>Next </Button>}
      </Footer>
    </>
  );
};

export default Table;

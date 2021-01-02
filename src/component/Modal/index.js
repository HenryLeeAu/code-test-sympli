import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(103 103 103 / 43%);
`;

const Content = styled.div`
  max-width: 640px;
  min-width: 320px;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border-radius: 4px;
`;

const Modal = ({ isOpen, children, onClose }) => {
  const onCloseHandler = () => {
    onClose();
  };

  return isOpen ? (
    <Wrapper>
      <Content>
        <div>{children}</div>
        <button onClick={onCloseHandler}>Close</button>
      </Content>
    </Wrapper>
  ) : null;
};

export default Modal;

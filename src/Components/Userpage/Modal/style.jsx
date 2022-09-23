import styled from "styled-components";
export const StyleModalBox = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  top: 11.5rem;
`;
export const StyleModal = styled.div`
  width: 30rem;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.65);
  color: #ffffff;
  border-radius: 15px;
  & > div {
    padding: 25px;
    align-items: center;
    justify-content: center;
    text-align: center;
    & > label {
      width: 100%;
    }
  }
`;
export const StyleInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 0;
  margin: 20px 0;
`;
export const StyleButton = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

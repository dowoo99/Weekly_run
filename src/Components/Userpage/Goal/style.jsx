import styled from "styled-components";
export const StyleGoal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 1.6rem;
  gap: 10px;
  height: 23rem;
  background: #353434;
  border-radius: 12px;
  box-shadow: 0px 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  position: relative;

  & > div {
    /* font-size: 1.2rem; */
    color: #ffffff;
  }
`;
export const StyleGoalButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 3.7rem;
  background-color: #ffffff;
  border-radius: 2.5rem;
  padding: 0.6rem 2rem 0.8rem;
  gap: 1rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
`;
export const StyleModalBox = styled.div`
  width: 100%;
  height: 23rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -23rem;
`;

export const StyleModal = styled.div`
  width: 30rem;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.65);
  color: #ffffff;
  border-radius: 15px;
  & > div {
    padding: 2.5rem;
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
  height: 3rem;
  border-radius: 5px;
  border: 0;
  margin: 2rem 0;
`;
export const StyleButton = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 3rem;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

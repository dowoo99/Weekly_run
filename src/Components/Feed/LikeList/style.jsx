import styled from "styled-components";
export const StyleFeed = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  border: 0.1rem solid black;
  margin-bottom: 5rem;
  & > div {
    padding: 1rem;
  }
`;
export const StyleFrofileBox = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;
export const StyleFrofile = styled.div`
  flex-direction: row;
  display: flex;
`;
export const StyleRecord = styled.div`
  display: flex;
`;
export const StylePath = styled.div`
  height: 20rem;
  background-color: azure;
`;
export const StyleImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

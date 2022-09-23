import styled from "styled-components";
export const StyleNav = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  flex-direction: column;
  display: flex;
  z-index: 999;
`;
export const StyleShowBackgroud = styled.div`
  background-color: rgba(26, 26, 26, 0.5);
  height: 100vh;
  display: ${({ Show }) => (Show ? "block" : "none")};
`;

export const StyleShow = styled.div`
  width: 100%;
  height: ${({ Show }) => (Show ? `${Show * 5.5}rem` : "0px")};
  background-color: #ffffff;
  transition: height 200ms ease-in-out;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 7.4rem;
  & > p,
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 1.6rem;
    padding-bottom: 1.6rem;
    border-bottom: 1px solid #e6e6e6;
  }
  @media only screen and (min-width: 880px) {
    max-width: 40rem;
  }
`;
export const StyleButton = styled.div`
  width: 100%;
  height: 7.4rem;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #353434;
  @media only screen and (min-width: 880px) {
    max-width: 40rem;
  }
  & > div {
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    padding: 0px;
    margin-bottom: 1.2rem;
  }
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  width: 30.4rem;
  height: 17.4rem;
  & p {
    margin: 4rem 0rem;
  }
  & button {
    border: none;
    background-color: white;
    font-size: 1.6rem;
  }
  & div {
    gap: 10rem;
    display: flex;
  }
`;

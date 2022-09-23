import Lottie from "lottie-react";
import Loader from "../../../Lottie/LoadingLottie.json";
import styled from "styled-components";

const Loading = ({ children }) => {
  return (
    <LottieWrap>
      <div>
        <Lottie animationData={Loader} />
        <LottieMsg>{children}</LottieMsg>
      </div>
    </LottieWrap>
  );
};

export default Loading;

const LottieWrap = styled.div`
  position: absolute;
  padding-top: 10rem;
  width: 100vw;
  height: 150vh;
  z-index: 500;
  background-color: white;
  @media only screen and (min-width: 880px) {
    max-width: 40rem;
  }
`;

const LottieMsg = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  top: 47rem;
  font-size: 2.4rem;
  font-family: "Anton";
`;

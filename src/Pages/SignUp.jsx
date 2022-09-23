import ProfileUpload from "../Components/Signup/profileUpload"

import {useLocation, useNavigate} from "react-router-dom"
import styled from "styled-components";


const SignUp = () => {
  const location = useLocation();
  const data = location.state;
  return (
    <>
      <SignUpLogo>
        <p>RUNBLE</p>
      </SignUpLogo>
      <ProfileUpload userData={data} />
    </>
  );
};

export default SignUp;

const SignUpLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 9.6rem;
  margin-bottom: 13.8rem;
  & > P {
    height: 3.2rem;
    font-weight: 900;
    font-size: 2.4rem;
    line-height: 3.2rem;
    color: #353434;
  }
`;

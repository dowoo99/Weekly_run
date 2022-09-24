import ProfileUpload from "../Components/Signup/profileUpload";

import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "../Icons/LoginLogo.svg";

const SignUp = () => {
  const location = useLocation();
  const data = location.state;
  return (
    <>
      <SignUpLogo>
        <Logo />
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
  height: 4.6rem;
  padding-top: 5rem;
  margin-bottom: 12rem;
  & :first-child {
    width: 45%;
  }
`;

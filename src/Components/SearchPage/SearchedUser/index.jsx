import React from "react";
import { instance } from "../../../Utils/Instance";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Profile from "../../../Icons/myPageProfile.svg";

const SearchedUser = ({ searhValue }) => {
  const navigate = useNavigate();

  const getSearchUser = async () => {
    const { data } = await instance.get(`/api/user/search?nickname=${searhValue}`);
    return data;
  };

  const { data } = useQuery(["searchUser", searhValue], getSearchUser, {
    enabled: !!searhValue
  });

  const navUserPage = nickname => {
    navigate(`/user/${nickname}`);
  };

  return (
    <>
      {data?.map(user => {
        return (
          <SearchUserWrap key={user.nickname} onClick={() => navUserPage(user.nickname)}>
            {user.profile ? <img src={user.profile} /> : <img src={Profile} />}
            <div>{user.nickname}</div>
          </SearchUserWrap>
        );
      })}
    </>
  );
};

export default SearchedUser;

const SearchUserWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem 1.6rem;
  width: 100%;
  height: 8.437rem;
  & img {
    width: 6rem;
    height: 6rem;
    border-radius: 10rem;
    transform: rotate(-0.36deg);
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem;
    margin-left: 1.85rem;
    height: 2.2rem;
  }
`;

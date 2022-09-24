import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import RelatedBar from "../Components/SearchPage/RelatedBar";
import SearchedHashTag from "../Components/SearchPage/SearchedHashTag";
import SearchedUser from "../Components/SearchPage/SearchedUser";
import useInput from "../Hooks/useInput";
import Layout from "../Components/Common/Layout";

import { ReactComponent as SearchIcon } from "../Icons/SearchIcon.svg";

const Search = () => {
  const { state } = useLocation();

  const [searchTag, onChangeSearchTag, setSearchTag] = useInput(state === "search" ? "" : state);
  const [searhValue, setSearchValue] = useState("");
  const [showRelatedBar, setShowRelatedBar] = useState(false);
  const [selectedTab, setSelectedTab] = useState("태그");

  const onShowRelatedBar = useCallback(() => {
    setShowRelatedBar(true);
  }, []);

  const onCloseRelatedBar = useCallback(() => {
    setShowRelatedBar(false);
  }, []);

  const onClickUser = useCallback(() => {
    setSelectedTab("유저");
  }, []);

  const onClickHashTag = useCallback(() => {
    setSelectedTab("태그");
  }, []);

  const onSubmitSearch = useCallback(
    e => {
      e.preventDefault();
      setSearchValue(searchTag);
      setShowRelatedBar(false);
    },
    [searchTag]
  );

  return (
    <Layout show={false}>
      <SearchHead onSubmit={onSubmitSearch}>
        <SearchTerm
          type="text"
          value={searchTag}
          placeholder="검색어를 입력해주세요"
          onClick={onShowRelatedBar}
          onChange={onChangeSearchTag}
        />
        <SearchIcon onClick={onSubmitSearch} />
      </SearchHead>
      {selectedTab === "태그" && searchTag && showRelatedBar && (
        <RelatedBar
          searchTag={searchTag}
          setSearchTag={setSearchTag}
          setSearchValue={setSearchValue}
          onCloseRelatedBar={onCloseRelatedBar}
        />
      )}
      <TapWrap>
        <TapButton
          onClick={onClickUser}
          selectedTab={!selectedTab}
          style={{ border: selectedTab === "태그" && "none", color: selectedTab === "태그" && "#a1a1a1" }}
        >
          유저
        </TapButton>
        <TapButton
          onClick={onClickHashTag}
          tab={!selectedTab}
          style={{ border: selectedTab === "유저" && "none", color: selectedTab === "유저" && "#a1a1a1" }}
        >
          태그
        </TapButton>
      </TapWrap>
      {selectedTab === "유저" && <SearchedUser searchTag={searchTag} />}
      {selectedTab === "태그" && <SearchedHashTag searhValue={searhValue} />}
    </Layout>
  );
};

export default Search;

const SearchHead = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.6rem;
  gap: 1.2rem;
  font-size: 1.2rem;
`;

const SearchTerm = styled.input`
  display: flex;
  padding: 0.4rem 1.4rem;
  width: 83%;
  height: 3.5rem;
  background: #e6e6e6;
  border-radius: 1.2rem;
  border: none;
`;

const TapWrap = styled.div`
  display: flex;
  width: 100vw;
  height: 3.7rem;
`;

const TapButton = styled.button`
  width: 18.8rem;
  border: none;
  color: black;
  background: #ffffff;
  border-bottom: 0.1rem solid #333333;
`;

import React from "react";
import { instance } from "../../../Utils/Instance";
import { useQuery } from "react-query";
import useQueryDebounce from "../../../Hooks/useQueryDebounce";

import styled from "styled-components";

const RelatedBar = ({ searchTag, setSearchTag, setSearchValue, onCloseRelatedBar }) => {
  const debounceSearch = useQueryDebounce(searchTag, 500);

  const getRelated = async () => {
    const { data } = await instance.get(`/api/post/autocomplete/?hashtag=${debounceSearch}`);
    return data;
  };

  const { data: related } = useQuery(debounceSearch, getRelated, {
    enabled: !!debounceSearch
  });

  const onChangeSearch = list => {
    setSearchTag(list);
    setSearchValue(list);
    onCloseRelatedBar();
  };

  return (
    <RelatedBarWrap>
      {related?.map((list, idx) => {
        return (
          <RelatedItems onClick={() => onChangeSearch(list)} key={idx}>
            {list}
          </RelatedItems>
        );
      })}
    </RelatedBarWrap>
  );
};

export default RelatedBar;

const RelatedBarWrap = styled.div`
  position: absolute;
  z-index: 10;
  height: 30rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const RelatedItems = styled.div`
  padding: 0.8rem 2rem;
  font-size: 1.8rem;
`;

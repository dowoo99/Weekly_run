import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyleUserWrap = styled.div`
  width: 100%;
`;
export const StyleUser = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  background: #ffffff;
`;
export const StyleHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4.3rem;
  background: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 1.6rem;
    margin-right: 1.6rem;
  }
`;
export const StyleUsrBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 1rem;
  padding: 2rem 1.6rem;
`;
export const UserTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const RankLink = styled(Link)`
  padding-right: 1rem;
`;

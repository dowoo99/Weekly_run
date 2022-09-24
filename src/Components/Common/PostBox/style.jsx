import styled from "styled-components";

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

export const StyleFeed = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 2rem 0px;
  gap: 1.2rem;
  border-bottom: 1px solid #e6e6e6;
  margin: 0 auto;
`;
export const StyleFrofileBox = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;
export const StyleFrofile = styled.div`
  flex-direction: row;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;
export const StyleFrofileImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
`;

export const StyleSpeed = styled.div`
  position: absolute;
  z-index: 999;
  display: flex;
  width: 100%;
  top: 70%;
  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;

    font-size: 3.6rem;
    font-family: "Anton";

    font-weight: 900;
    color: #1a1a1a;
    padding: 0 2%;
  }
`;
export const StylePath = styled.div`
  width: 100%;
  height: 18rem;
`;
export const StyleContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
`;
export const StyleIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.2rem;
  width: 100%;
  height: 4.155rem;
`;
export const StyleHeart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
  gap: 1.5rem;
  width: 4.8rem;
  height: 3.555rem;
  justify-content: center;
`;

export const StyleImg = styled.img`
  width: 100%;
  height: 36rem;
  object-fit: cover;
`;

export const StyleContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  padding: 0px 0.2rem 1rem;
`;
export const StyleHashBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 0.5rem;
  height: 2.2rem;
`;
export const StyleHash = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1px 10px 4px;
  gap: 10px;
  height: 22px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #e6e6e6;
  border-radius: 20px;

  & > span {
    font-size: 1.2rem;
  }
`;
export const StyleGood = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 2px 0px;
  gap: 10px;
  height: 22px;
  font-size: 12px;
  text-align: center;
  align-items: center;
`;
export const StyleComment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2px 2px 5px;
  gap: 10px;
  height: 2.4rem;
  font-size: 12px;
`;
export const StyleTime = styled.div`
  color: #999999;
  font-size: 1.2rem;
`;

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { instance } from "../../../Utils/Instance";
import useInfinityScroll from "../../../Hooks/useInfinityScroll";
import PostBox from "../../Common/PostBox";

const LikeList = () => {
  const fetchLikeList = async pageParam => {
    const { data } = await instance.get(`/api/post/popular/${pageParam}`);

    return data;
  };
  const { ref, inView } = useInView()

  const { data, fetchNextPage, isFetchingNextPage } = useInfinityScroll("like", fetchLikeList);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  return (
    <>
      <div>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.Post.map((posts, index) => (
              <PostBox key={index} posts={posts} index={index}></PostBox>
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage ? <span>로딩중입니다</span> : <div ref={ref}></div>}
    </>
  );
};
export default LikeList;

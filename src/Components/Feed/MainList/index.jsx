import React, { useEffect } from "react";
import { instance } from "../../../Utils/Instance";
import { useInView } from "react-intersection-observer";
import PostBox from "../../Common/PostBox";
import useInfinityScroll from "../../../Hooks/useInfinityScroll";

const fetchPostList = async pageParam => {
  const res = await instance.get(`/api/post/new/${pageParam}`);

  const { Post, isLast } = res.data;
  return { Post, nextPage: pageParam + 1, isLast };
};

const MainList = () => {
  const { ref, inView } = useInView();

  const {data, fetchNextPage, isFetchingNextPage} = useInfinityScroll("posts", fetchPostList);


  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <>
      <div>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.Post?.map((posts, index) => (
              <PostBox key={index} posts={posts} index={index}></PostBox>
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage ? <span>로딩중입니다</span> : <div ref={ref}></div>}
    </>
  );
};
export default MainList;

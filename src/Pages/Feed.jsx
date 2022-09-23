import React from "react";
import Layout from "../Components/Common/Layout/index";
import UserfeedList from "../Components/Feed/FeedList/index ";

const Feed = () => {
  return (
    <Layout feed={true}>
      <UserfeedList></UserfeedList>
    </Layout>
  );
};

export default Feed;

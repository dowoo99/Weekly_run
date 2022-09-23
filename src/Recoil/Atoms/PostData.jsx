import { atom } from "recoil";

export const postData = atom({
  key: "postData",
  default: {
    content: "",
    path: [],
    distance: "",
    image: [],
    hashtag: [],
    time: {},
    userId: 2,
    nickname: "test",
    isLoading: false
  }
});

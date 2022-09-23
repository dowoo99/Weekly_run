import { atom } from "recoil";

export const replyState = atom({
  key: "replyState",
  default: {
    showInput: false,
    postId: "",
    recommentId: "",
    isLoading: false
  }
});

import { atom } from "recoil";
export const NavState = atom({
  key: "NavState",
  default: false
});
export const PreviewImg = atom({
  key: "PreviewImg",
  default: null
});

export const NavStates = atom({
  key: "NavStates",
  default: null
});
export const NavPostData = atom({
  key: "NavPostData",
  default: ""
});
export const ModalState = atom({
  key: "ModalState",
  default: false
});

import { atom } from "recoil";

export interface IUser {
  id: number | undefined;
  name: string;
  username: string;
  email: string;
  [prop: string]: any; // 배열 속성 사용가능
}

export interface IBoard {
  id: number | undefined;
  username: string;
  title: string;
  content: string;
  image: string;
  time: string;
  recommend: string;
  [prop: string]: any; // 배열 속성 사용가능
}

export const loginAtom = atom({
  //atom은 고유한 key와 default 값을 요구
  key: "isLogin",
  default: false,
});

export const userAtom = atom<IUser>({
  //atom은 고유한 key와 default 값을 요구
  key: "isUser",
  default: {
    id: undefined,
    name: "",
    username: "",
    email: "",
  },
});

export const boardAtom = atom<IBoard>({
  //atom은 고유한 key와 default 값을 요구
  key: "isBoard",
  default: {
    id: undefined,
    username: "",
    title: "",
    content: "",
    image: "",
    time: "",
    recommend: "",
  },
});

export const keywordAtom = atom({
  //atom은 고유한 key와 default 값을 요구
  key: "isKeyword",
  default: "",
});

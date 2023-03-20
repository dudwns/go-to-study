import { atom } from "recoil";

export interface IUser {
  id: number | undefined;
  loginId: string;
  name: string;
  username: string;
  email: string;
  password: number | undefined;
  birthday: string;
  createdDate: string;
}

export interface IBoard {
  id: number;
  username: string;
  title: string;
  content: string;
  image: string;
  time: string;
  recommend: number;
  replyCount: number;
}

export interface IBookmark {
  userId: number;
  boardId: number;
  username: string;
  title: string;
}

export const isDarkAtom = atom({
  //atom은 고유한 key와 default 값을 요구
  key: "isDark",
  default: false,
});

export const isHeaderAtom = atom({
  key: "isHeader",
  default: false,
});

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
    loginId: "",
    name: "",
    username: "",
    email: "",
    password: undefined,
    birthday: "",
    createdDate: "",
  },
});

export const boardAtom = atom<IBoard[]>({
  //atom은 고유한 key와 default 값을 요구
  key: "isBoard",
  default: [],
});

export const bookmarkAtom = atom<IBookmark[]>({
  key: "isBookmark",
  default: [],
});

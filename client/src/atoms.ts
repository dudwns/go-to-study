import { atom } from "recoil";

export const loginAtom = atom({
  //atom은 고유한 key와 default 값을 요구
  key: "isLogin",
  default: false,
});

export interface IUser {
  id: number | undefined;
  username: string;
  email: string;
}

export const userAtom = atom<IUser>({
  //atom은 고유한 key와 default 값을 요구
  key: "isUser",
  default: {
    id: undefined,
    username: "",
    email: "",
  },
});

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardAtom, IUser, keywordAtom, loginAtom, userAtom } from "../atoms";
import Bookmark from "../Components/Bookmark";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  padding-top: 70px;
`;

function Home() {
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [boards, setBoards] = useState([]);
  const [keyword, setKeyword] = useRecoilState(keywordAtom);

  const navigate = useNavigate();
  const accessToken = () => {
    axios({
      url: "http://localhost:5000/accesstoken",
      method: "GET",
      withCredentials: true,
    });
  };

  const refreshToken = () => {
    axios({
      url: "http://localhost:5000/refreshtoken",
      method: "GET",
      withCredentials: true,
    });
  };

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:5000/login/success",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setIsLogin(true);
            setUser(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:5000/api/board",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setBoards(result.data);
            console.log(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onWriteHandler = () => {
    if (isLogin) {
      navigate("/board/write");
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  return <Wrapper>메인화면</Wrapper>;
}
export default Home;

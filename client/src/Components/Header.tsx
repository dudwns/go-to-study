import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginAtom, userAtom } from "../atoms";
import { motion, AnimatePresence, useScroll, useAnimation } from "framer-motion";
import { useEffect } from "react";

const Nav = styled(motion.div)`
  height: 60px;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  color: whitesmoke;
  border-bottom: 1px solid gray;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-left: 20px;
  font-weight: 600;
  cursor: pointer;
  color: whitesmoke;
`;

const Items = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin: 0 10px;
  cursor: pointer;
  font-weight: 600;
  color: whitesmoke;
`;

interface IValue {
  value: boolean;
}

const UserItems = styled.ul<IValue>`
  display: flex;
`;

const UserItem = styled.li`
  margin: 0 10px;
  cursor: pointer;
  font-weight: 600;
  color: whitesmoke;
`;

const MyBtn = styled.button`
  cursor: pointer;
  border: none;
`;

const LogoutBtn = styled.button`
  cursor: pointer;
  border: none;
  padding: 0 10px;
  margin-left: 15px;
`;

const navVariants = {
  top: {
    top: 0,
    transition: { type: "tween" },
  },
  scroll: {
    top: "-60px",
    transition: { type: "tween" },
  },
};

function Header() {
  const isLogin = useRecoilValue(loginAtom);
  const userData = useRecoilValue(userAtom);
  const id = userData.id;
  const navigate = useNavigate();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll(); //scrollY는 픽셀 단위
  const logout = () => {
    axios({
      url: "http://localhost:5000/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/", "_self");
      }
    });
  };

  const myPage = () => {
    navigate(`/mypage/` + id);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      //get을 하는 이유는 MotionValue는 값이 바뀌어도 자동으로 업데이트가 되지 않기 때문
      if (scrollY.get() > 80) {
        navAnimation.start("scroll"); //변수를 지정(variants)하는 방법
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <Nav variants={navVariants} initial="top" animate={navAnimation}>
      <Link to="/">
        <Title>타이틀</Title>
      </Link>
      <Items>
        <Link to="/board/1">
          <Item>게시판</Item>
        </Link>
        <Item>할 일</Item>
        <Item>스톱워치</Item>
      </Items>
      <UserItems value={isLogin}>
        {isLogin ? (
          <>
            <UserItem> {userData.name}님이 로그인했습니다.</UserItem>
            <UserItem>
              <MyBtn onClick={myPage}>마이 페이지</MyBtn>
              <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
            </UserItem>
          </>
        ) : (
          <>
            <Link to="/join">
              <UserItem>회원가입</UserItem>
            </Link>
            <Link to="/login">
              <UserItem>로그인</UserItem>
            </Link>
          </>
        )}
      </UserItems>
    </Nav>
  );
}

export default Header;

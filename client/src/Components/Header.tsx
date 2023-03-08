import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDarkAtom, isHeaderAtom, loginAtom, userAtom } from "../atoms";
import { motion, useScroll, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const Nav = styled(motion.div)`
  height: 50px;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid gray;
  z-index: 10;
  color: white;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-left: 20px;
  font-weight: 600;
  cursor: pointer;

  & > a {
    color: white;
  }
`;

const Items = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin: 0 10px;
  cursor: pointer;
  font-weight: 600;

  & > a {
    color: white;
  }
`;

interface IValue {
  value: boolean;
}

const UserItems = styled.ul<IValue>`
  display: flex;
`;

const UserItem = styled.li`
  margin: 0 10px;
  font-weight: 600;

  & > a {
    color: white;
    cursor: pointer;
  }
`;

const MyBtn = styled.button`
  cursor: pointer;
  border: none;
  padding: 1px 5px;
  border-radius: 3px;
  background-color: inherit;
  color: white;
`;

const LogoutBtn = styled.button`
  cursor: pointer;
  border: none;
  padding: 1px 5px;
  margin-left: 15px;
  border-radius: 3px;
  background-color: inherit;
  color: white;
`;

const ThemeBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 50;
  cursor: pointer;
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
  const isLogin = useRecoilValue(loginAtom); // 로그인 유무를 나타내는 boolean 값
  const user = useRecoilValue(userAtom); // 로그인 한 유저의 정보
  const id = user.id;
  const navigate = useNavigate();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll(); //scrollY는 픽셀 단위
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDark((prev) => !prev);
  const isHeader = useRecoilValue(isHeaderAtom);

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
    <>
      <ThemeBtn onClick={toggleDarkAtom}>
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
          </svg>
        )}
      </ThemeBtn>
      <Nav variants={navVariants} initial="top" animate={navAnimation}>
        <Title>
          <Link to="/">고투스 </Link>
        </Title>

        <Items>
          <Item>
            <Link to="/board/1">게시판</Link>
          </Item>

          <Item>
            <Link to="/todo">할 일</Link>
          </Item>
        </Items>
        <UserItems value={isLogin}>
          {isLogin ? (
            <>
              <UserItem> {user.name}님이 로그인했습니다.</UserItem>
              <UserItem>
                <MyBtn onClick={myPage}>마이 페이지</MyBtn>
                <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
              </UserItem>
            </>
          ) : (
            <>
              <UserItem>
                <Link to="/join">회원가입</Link>
              </UserItem>

              <UserItem>
                <Link to="/login">로그인</Link>
              </UserItem>
            </>
          )}
        </UserItems>
      </Nav>
    </>
  );
}

export default Header;

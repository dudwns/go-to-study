import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDarkAtom, isHeaderAtom, loginAtom, userAtom } from "../atoms";
import { motion, useScroll, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Api from "../lib/customApi";

const Nav = styled(motion.div)`
  height: 50px;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-bottom: 1px solid gray;
  z-index: 10;
  color: white;
`;

const MenuBtn = styled.div`
  margin-left: 10px;
  width: 17px;
  & svg {
    fill: white;
    cursor: pointer;
  }
`;

const Menu = styled(motion.div)`
  position: absolute;
  top: 49px;
  left: 0;
  width: 100%;
  height: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.6);

  & li {
    font-size: 13px;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid white;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  & li:first-child {
    border-top: 1px solid white;
  }
`;

const MenuItems = styled.ul`
  display: flex;
`;

const MenuItem = styled.li`
  font-size: 15px;
  margin: 0 10px;
  color: white;
  cursor: pointer;
  @media screen and (max-width: 900px) {
    font-size: 12px;
  }
`;

const UserItems = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const UserItem = styled.li`
  font-size: 15px;
  margin: 0 10px;
  color: white;
  cursor: pointer;
  @media screen and (max-width: 900px) {
    font-size: 12px;
  }
`;

const LogoutBtn = styled.span`
  font-size: 12px;
  @media screen and (max-width: 900px) {
    font-size: 11px;
  }
`;

const UserName = styled.span`
  cursor: default;
`;

const Name = styled.span`
  font-size: 17px;
  font-weight: 600;
  @media screen and (max-width: 900px) {
    font-size: 14px;
  }
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

const topVariants = {
  bottom: {
    height: "148px",
    transition: { type: "tween" },
  },
  top: {
    height: 0,
    transition: { type: "tween" },
  },
};

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom); // 로그인 유무를 나타내는 boolean 값
  const [user, setUser] = useRecoilState(userAtom); // 로그인 한 유저의 정보
  const id = user.id;
  const navigate = useNavigate();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll(); //scrollY는 픽셀 단위
  const [isDark, setisDark] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setisDark((prev) => !prev);
  const isHeader = useRecoilValue(isHeaderAtom);
  console.log(isLogin);

  useEffect(() => {
    try {
      // axios({
      //   url: "http://localhost:5000/login/success",
      //   method: "GET",
      //   withCredentials: true,
      // })
      Api.get("http://localhost:5000/login/success")
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
        <MenuBtn onClick={() => setIsMenuOpen((prev) => !prev)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>

          <Menu variants={topVariants} animate={isMenuOpen ? "bottom" : "top"}>
            <ul>
              <li onClick={() => navigate("/")}>홈페이지</li>
              <li onClick={() => navigate("/board/1")}>커뮤니티</li>
              {isLogin ? (
                <li onClick={myPage}>마이 페이지</li>
              ) : (
                <li onClick={() => navigate("/join")}>회원가입</li>
              )}
              {isLogin ? (
                <li onClick={logout}>로그아웃</li>
              ) : (
                <li onClick={() => navigate("/login")}>로그인</li>
              )}
            </ul>
          </Menu>
        </MenuBtn>
        <MenuItems>
          <MenuItem onClick={() => navigate("/")}>홈페이지</MenuItem>
          <MenuItem onClick={() => navigate("/board/1")}>커뮤니티</MenuItem>
        </MenuItems>
        <UserItems>
          {isLogin ? (
            <>
              <UserItem>
                <UserName>
                  <Name>{user.name}</Name> 님이 로그인했습니다.
                </UserName>
              </UserItem>
              <UserItem>
                <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
              </UserItem>
            </>
          ) : (
            <>
              <UserItem onClick={() => navigate("/join")}>회원가입</UserItem>
              <UserItem onClick={() => navigate("/login")}>로그인</UserItem>
            </>
          )}
        </UserItems>
      </Nav>
    </>
  );
}

export default Header;

import axios from "axios";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginAtom, userAtom } from "../atoms";

const Nav = styled.div`
  height: 60px;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d3d3d3;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-left: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const Items = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin: 0 10px;
  cursor: pointer;
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
`;

const LogoutBtn = styled.button`
  cursor: pointer;
  border: none;
  padding: 0 10px;
`;

function Header() {
  const isLogin = useRecoilValue(loginAtom);
  const userData = useRecoilValue(userAtom);

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

  const deleteCustomer = () => {
    axios({
      url: "/api/customers/" + userData.id,
      method: "DELETE",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/", "_self");
      }
    });
  };

  return (
    <Nav>
      <Link to="/">
        <Title>타이틀</Title>
      </Link>
      <Items>
        <Link to="/">
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
              <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
              <button onClick={deleteCustomer}>회원탈퇴</button>
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

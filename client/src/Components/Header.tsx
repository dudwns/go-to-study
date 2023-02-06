import { Link } from "react-router-dom";
import styled from "styled-components";

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

const UserItems = styled.ul`
  display: flex;
`;

const UserItem = styled.li`
  margin: 0 10px;
  cursor: pointer;
`;

function Header() {
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
      <UserItems>
        <Link to="/join">
          <UserItem>회원가입</UserItem>
        </Link>
        <Link to="/login">
          <UserItem>로그인</UserItem>
        </Link>
      </UserItems>
    </Nav>
  );
}

export default Header;

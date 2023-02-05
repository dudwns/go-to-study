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
`;

const Items = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin: 0 10px;
`;

const UserItems = styled.ul`
  display: flex;
`;

const UserItem = styled.li`
  margin: 0 10px;
`;

function Header() {
  return (
    <Nav>
      <Title>타이틀</Title>
      <Items>
        <Item>게시판</Item>
        <Item>할 일</Item>
        <Item>스톱워치</Item>
      </Items>
      <UserItems>
        <UserItem>회원가입</UserItem>
        <UserItem>로그인</UserItem>
      </UserItems>
    </Nav>
  );
}

export default Header;

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userAtom } from "../atoms";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  padding-top: 120px;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 10px;
`;

const HeaderText = styled.div`
  font-size: 13px;
  margin-bottom: 20px;
`;

const Layout = styled.div`
  display: grid;
  width: 400px;
  border: none;
  grid-template-columns: 100px 1fr;
  border: 1px solid gray;
  margin-bottom: 15px;
  & > div {
    border: 1px solid gray;
    padding: 5px;
  }
`;

const RemoveBtn = styled.button`
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: #dd0f0f;
`;

function MyPage() {
  const { id } = useParams();
  const [userData, setUserData] = useRecoilState(userAtom);
  console.log(userData?.username);
  const deleteCustomer = () => {
    if (userData?.username === "") {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      const result = window.confirm("정말로 삭제하시겠습니까?");
      if (result) {
        axios({
          url: "/api/customers/" + id,
          method: "DELETE",
          withCredentials: true,
        }).then((result) => {
          if (result.status === 200) {
            alert("삭제가 완료되었습니다.");
            axios({
              url: "http://localhost:5000/api/customers/board/" + userData?.username,
              method: "DELETE",
              withCredentials: true,
            }).then((result) => {
              window.open("/", "_self");
            });
          }
        });
      }
    }
  };
  return (
    <Wrapper>
      <Container>
        <Header>프로필 정보</Header>
        <HeaderText>프로필 정보를 볼 수 있습니다.</HeaderText>
        <Layout>
          <div>닉네임</div>
          <div>{userData?.username}</div>
          <div>이름</div>
          <div>{userData?.name}</div>
          <div>이메일</div>
          <div>{userData?.email}</div>
          <div>출생년도</div>
          <div>{userData?.birthday}</div>
          <div>가입 날짜</div>
          <div>{userData?.createdDate}</div>
        </Layout>
        <RemoveBtn onClick={deleteCustomer}>회원 탈퇴</RemoveBtn>
      </Container>
    </Wrapper>
  );
}
export default MyPage;

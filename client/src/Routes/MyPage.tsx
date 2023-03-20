import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
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

const UpdateBtn = styled.button`
  border: 1px solid gray;
  padding: 5px;
  cursor: pointer;
  background-color: ${(props) => props.theme.btnColor};
  border-radius: 3px;
  color: whitesmoke;
  margin: 0 5px;
`;

const RemoveBtn = styled.button`
  border: 1px solid gray;
  padding: 5px;
  cursor: pointer;
  background-color: ${(props) => props.theme.btnColor};
  border-radius: 3px;
  color: whitesmoke;
  margin: 0 5px;
`;

function MyPage() {
  const { id } = useParams();
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const deleteCustomer = () => {
    if (user?.username === "") {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      const result = window.confirm("정말로 탈퇴하시겠습니까?");
      if (result) {
        axios({
          url: "/api/customers/" + id,
          method: "DELETE",
          withCredentials: true,
        }).then((result) => {
          if (result.status === 200) {
            // 게시글 삭제
            axios({
              url: "http://localhost:5000/api/customers/board/" + user?.username,
              method: "DELETE",
              withCredentials: true,
            }).then((result) => {
              if (result.status === 200) {
                // 해당 유저의 북마크 정보 삭제
                axios({
                  url: "http://localhost:5000/api/bookmark/" + user?.id,
                  method: "DELETE",
                  withCredentials: true,
                }).then((result) => {
                  if (result.status === 200) {
                    alert("탈퇴가 완료되었습니다.");
                    window.open("/", "_self");
                  }
                });
              }
            });
          }
        });
      }
    }
  };

  const updateCustomer = () => {
    if (user?.username === "") {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      navigate(`/myPage/edit/${user?.id}`);
    }
  };
  return (
    <Wrapper>
      <Container>
        <Header>프로필 정보</Header>
        <HeaderText>프로필 정보를 볼 수 있습니다.</HeaderText>
        <Layout>
          <div>아이디</div>
          <div>{user?.loginId}</div>
          <div>닉네임</div>
          <div>{user?.username}</div>
          <div>이름</div>
          <div>{user?.name}</div>
          <div>이메일</div>
          <div>{user?.email}</div>
          <div>출생년도</div>
          <div>{user?.birthday}</div>
          <div>가입 날짜</div>
          <div>{user?.createdDate}</div>
        </Layout>
        <div>
          <UpdateBtn onClick={updateCustomer}>프로필 수정</UpdateBtn>
          <RemoveBtn onClick={deleteCustomer}>회원 탈퇴</RemoveBtn>
        </div>
      </Container>
    </Wrapper>
  );
}
export default MyPage;

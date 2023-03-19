import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userAtom } from "../atoms";
import { useState, useEffect } from "react";

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
  position: relative;
  & > div {
    border: 1px solid gray;
    padding: 5px;
  }
`;

const UpdateBtn = styled.button`
  border: 1px solid gray;
  padding: 3px 5px;
  cursor: pointer;
  background-color: ${(props) => props.theme.btnColor};
  border-radius: 3px;
  color: whitesmoke;
  margin: 0 5px;
`;

const RemoveBtn = styled.button`
  border: 1px solid gray;
  padding: 3px 5px;
  cursor: pointer;
  background-color: ${(props) => props.theme.btnColor};
  border-radius: 3px;
  color: whitesmoke;
  margin: 0 5px;
`;

const ConfrimBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 5px;
  cursor: pointer;
  border: 1px solid gray;
  background-color: ${(props) => props.theme.btnColor};
  border-radius: 3px;
  color: whitesmoke;
`;

function UserUpdate() {
  const { id } = useParams();
  const [user, setUser] = useRecoilState(userAtom);
  const [nickname, setNickname] = useState("");
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setNickname(user?.username);
  }, [user]);

  const onConfirmClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user?.username === "") {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      axios({
        url: "http://localhost:5000/api/customers/edit",
        method: "POST",
        withCredentials: true,
        data: {
          username: nickname,
        },
      }).then((result) => {
        if (result.data.length === 0) {
          alert("사용 가능한 닉네임입니다.");
          setConfirm(true);
        } else {
          alert("이미 존재하는 닉네임입니다.");
        }
      });
    }
  };

  const onUpdateClick = (e: React.FormEvent<HTMLButtonElement>) => {
    if (user?.username === "") {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      if (confirm) {
        axios({
          url: "http://localhost:5000/api/customers/edit/" + id,
          method: "PUT",
          withCredentials: true,
          data: {
            username: nickname,
          },
        }).then((result) => {
          if (result.status === 200) {
            try {
              axios({
                url: "http://localhost:5000/login/success",
                method: "GET",
                withCredentials: true,
              })
                .then((result) => {
                  if (result.data) {
                    setUser(result.data);
                    alert("수정이 완료되었습니다.");
                    navigate(-1);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            } catch (error) {
              console.log(error);
            }
          }
        });
      } else {
        alert("검사 버튼을 눌러주세요.");
      }
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header>프로필 수정</Header>
        <HeaderText>닉네임을 변경할 수 있습니다.</HeaderText>
        <Layout>
          <div>닉네임</div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setConfirm(false);
            }}
          />
          <ConfrimBtn onClick={onConfirmClick}>확인</ConfrimBtn>
          <div>이름</div>
          <div>{user?.name}</div>
          <div>이메일</div>
          <div>{user?.email}</div>
          <div>출생년도</div>
          <div>{user?.birthday}</div>
        </Layout>
        <div>
          <UpdateBtn onClick={onUpdateClick}>수정</UpdateBtn>
          <RemoveBtn onClick={() => navigate(-1)}>취소</RemoveBtn>
        </div>
      </Container>
    </Wrapper>
  );
}

export default UserUpdate;

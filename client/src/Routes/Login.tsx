import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

const Wrapper = styled.div`
  height: 100vh;
  min-height: 600px;
  width: 100%;
  display: flex;
  padding-bottom: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 350px;
  margin: 0 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3),
    0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

const Title = styled.h2`
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const LoginForm = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 10px;
  }
  margin-bottom: 10px;

  & input {
    padding: 10px;
    width: 100%;
  }
`;

const LoginBtn = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  border: 1px solid gray;
  cursor: pointer;
  margin-bottom: 20px;
`;

const MenuUl = styled.ul`
  width: 300px;
  display: flex;
  justify-content: center;

  & li {
    font-size: 12px;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    border-right: 1px solid gray;
    padding: 0 10px;

    &:last-child {
      border: ${(props) => props.theme.borderColor};
    }
  }
`;

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  const login = () => {
    axios({
      url: "http://localhost:5000/login",
      method: "POST",
      withCredentials: true,
      data: {
        loginId: id,
        password: password,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          localStorage.setItem(
            "expiresAt",
            moment().add(1, "minutes").format("yyyy-MM-DD HH:mm:ss")
          );
          localStorage.setItem("accessToken", result.data);
          navigate("/board/1");
        }
      })
      .catch((error) => {
        alert("아이디 혹은 패스워드가 틀렸습니다.");
      });
  };

  return (
    <Wrapper>
      <Container>
        <Title>로그인</Title>
        <LoginForm onSubmit={handleFormSubmit}>
          <div>
            <input
              type="text"
              placeholder="아이디"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "아이디")}
              value={id}
              onChange={(e) => setId(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="패스워드"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "패스워드")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <LoginBtn>로그인</LoginBtn>
        </LoginForm>
        <MenuUl>
          <li onClick={() => navigate("/join")}>회원가입</li>
          <li onClick={() => navigate("/userFind")}>아이디 찾기</li>
          <li onClick={() => navigate("/userPasswordFind")}>패스워드 찾기</li>
        </MenuUl>
      </Container>
    </Wrapper>
  );
}

export default Login;

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  padding-top: 70px;
  padding-bottom: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 350px;
  border-radius: 5px;
  margin: 0 30px;
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
`;

const JoinText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
`;

function Login() {
  const [email, setEmail] = useState("");
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
        email: email,
        password: password,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          navigate("/board/1");
        }
      })
      .catch((error) => {
        alert("아이디 혹은 비밀번호가 틀렸습니다.");
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <LoginBtn>로그인</LoginBtn>
        </LoginForm>
        <Link to="/join">
          <JoinText>회원가입</JoinText>
        </Link>
      </Container>
    </Wrapper>
  );
}

export default Login;

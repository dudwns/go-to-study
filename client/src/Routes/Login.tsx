import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrraper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  padding-top: 70px;
  justify-content: center;
`;

const Container = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 350px;
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
  border: none;
  width: 100%;
  padding: 10px;
  cursor: pointer;
`;

const JoinText = styled.span`
  font-size: 12px;
`;

function Login() {
  const [userId, setUserId] = useState("");
  const [userPasswd, setUserPasswd] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <Wrraper>
      <Container>
        <Title>로그인</Title>
        <LoginForm onSubmit={handleFormSubmit}>
          <div>
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={userPasswd}
              onChange={(e) => setUserPasswd(e.target.value)}
            ></input>
          </div>
          <LoginBtn>로그인</LoginBtn>
        </LoginForm>
        <Link to="/join">
          <JoinText>회원가입</JoinText>
        </Link>
      </Container>
    </Wrraper>
  );
}

export default Login;

import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { default as FormData } from "form-data";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding-top: 70px;
  padding-bottom: 50px;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 800px;
  border-radius: 5px;
  margin: 0 30px;
`;

const Title = styled.h2`
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const JoinForm = styled.form`
  width: 300px;

  & > div {
    margin-bottom: 35px;
  }

  & > div > input {
    padding: 5px;
    width: 100%;
  }

  & > div > div {
    margin-bottom: 10px;
  }

  & > div > div > div {
    margin-bottom: 10px;
  }
`;

const JoinBtn = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  border: 1px solid gray;
  cursor: pointer;
`;

function Join() {
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  const onCheckedHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setGender(value);
  };

  // /api/customers에 데이터를 전송
  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("birthday", birthday);
    const config = {
      //보내고자 하는 데이터의 파일 형식이 있으면 헤더를 작성해야 함
      headers: {
        "content-type": "application/json", //꼭 지정해주어야 함
      },
    };
    return axios.post(url, formData, config); //post형식으로 데이터를 보냄, (주소, 데이터, 설정)
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCustomer();
    alert("가입이 완료되었습니다.");
    navigate("/login");
  };

  return (
    <Wrapper>
      <Container>
        <Title>회원가입</Title>
        <JoinForm onSubmit={handleFormSubmit}>
          <div>
            <div>닉네임</div>
            <input
              type="text"
              placeholder="닉네임을 입력하세요."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <div>이름</div>
            <input
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <div>이메일</div>
            <input
              type="email"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div>비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <div>생년월일</div>
            <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
          </div>

          <div>
            <div>
              <div>성별</div>
              <input type="radio" name="gender" value="남" onClick={onCheckedHandler} />
              남
              <input type="radio" name="gender" value="여" onClick={onCheckedHandler} />여
            </div>
          </div>

          <JoinBtn type="submit">가입하기</JoinBtn>
        </JoinForm>
      </Container>
    </Wrapper>
  );
}
export default Join;

import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { default as FormData } from "form-data";
import { useNavigate } from "react-router-dom";

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
  height: 550px;
`;

const Title = styled.h2`
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const JoinForm = styled.form`
  & > div {
    margin-bottom: 50px;
  }
`;

const JoinBtn = styled.button`
  border: none;
  width: 100%;
  padding: 10px;
  cursor: pointer;
`;

function Join() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
    formData.append("id", id);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("birthday", birthday);
    const config = {
      //보내고자 하는 데이터의 파일 형식이 있으면 헤더를 작성해야 함
      headers: {
        "content-type": "application/json", //꼭 지정해주어야 함
      },
    };
    console.log(formData);
    console.log(id, password, name, gender, birthday);
    return axios.post(url, formData, config); //post형식으로 데이터를 보냄, (주소, 데이터, 설정)
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCustomer().then((response) => {
      console.log(response);
      console.dir(response.data);
    });
    alert("가입이 완료되었습니다.");
    navigate("/");
  };

  return (
    <Wrraper>
      <Container>
        <Title>회원가입</Title>
        <JoinForm onSubmit={handleFormSubmit}>
          <div>
            이름:{" "}
            <input
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            아이디:{" "}
            <input
              type="text"
              placeholder="id를 입력하세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div>
            비밀번호:{" "}
            <input
              type="text"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            성별:
            <input type="radio" name="gender" value="남" onClick={onCheckedHandler} />
            남
            <input type="radio" name="gender" value="여" onClick={onCheckedHandler} />여
          </div>

          <div>
            생년월일:{" "}
            <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
          </div>
          <JoinBtn type="submit">가입하기</JoinBtn>
        </JoinForm>
      </Container>
    </Wrraper>
  );
}
export default Join;

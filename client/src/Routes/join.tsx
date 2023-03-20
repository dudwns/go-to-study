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
  margin-bottom: 25px;
`;

const JoinForm = styled.form`
  width: 300px;

  & > div {
    margin-bottom: 35px;
    position: relative;
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

const IdConfirmBtn = styled.button`
  position: absolute;
  top: 31px;
  right: -50px;
`;

const NicknameConfirmBtn = styled.button`
  position: absolute;
  top: 31px;
  right: -50px;
`;

function Join() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [confirmId, setConfirmId] = useState(false);
  const [confirmNickname, setConfirmNickname] = useState(false);
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
    formData.append("loginId", loginId);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("userName", userName);
    formData.append("email", email);
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
    if (confirmId && confirmNickname) {
      addCustomer();
      alert("가입이 완료되었습니다.");
      navigate("/login");
    } else if (confirmId) {
      alert("닉네임을 확인해 주세요.");
    } else if (confirmNickname) {
      alert("ID를 확인해 주세요.");
    } else {
      alert("ID와 닉네임을 확인해 주세요.");
    }
  };

  const onIdConfirmClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loginId.length < 5) {
      alert("ID는 최소 5자 이상이어야 합니다.");
    } else {
      axios({
        url: "http://localhost:5000/api/join/loginId",
        method: "POST",
        withCredentials: true,
        data: {
          loginId: loginId,
        },
      }).then((result) => {
        if (result.data.length === 0) {
          alert("사용 가능한 ID입니다.");
          setConfirmId(true);
        } else {
          alert("이미 존재하는 ID입니다.");
          setConfirmId(false);
        }
      });
    }
  };

  const onNicknameConfirmClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (userName.length < 2) {
      alert("닉네임은 최소 2자 이상이어야 합니다.");
    } else {
      axios({
        url: "http://localhost:5000/api/customers/edit",
        method: "POST",
        withCredentials: true,
        data: {
          username: userName,
        },
      }).then((result) => {
        if (result.data.length === 0) {
          alert("사용 가능한 닉네임입니다.");
          setConfirmNickname(true);
        } else {
          alert("이미 존재하는 닉네임입니다.");
          setConfirmNickname(false);
        }
      });
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>회원가입</Title>
        <JoinForm onSubmit={handleFormSubmit}>
          <div>
            <div>아이디</div>
            <input
              type="text"
              placeholder="아이디를 입력하세요. (5자 이상)"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "아이디를 입력하세요. (5자 이상)")}
              value={loginId}
              onChange={(e) => {
                setLoginId(e.target.value);
                setConfirmId(false);
              }}
              required
              minLength={5}
              maxLength={40}
            />
            <IdConfirmBtn onClick={onIdConfirmClick}>확인</IdConfirmBtn>
          </div>

          <div>
            <div>비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요. (5자 이상)"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "비밀번호를 입력하세요. (5자 이상)")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={5}
              maxLength={30}
            />
          </div>

          <div>
            <div>이름</div>
            <input
              type="text"
              placeholder="이름을 입력하세요."
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "이름을 입력하세요.")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <div>닉네임</div>
            <input
              type="text"
              placeholder="닉네임을 입력하세요. (2~6자)"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "닉네임을 입력하세요. (2~6자)")}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setConfirmNickname(false);
              }}
              required
              minLength={2}
              maxLength={6}
            />
            <NicknameConfirmBtn onClick={onNicknameConfirmClick}>확인</NicknameConfirmBtn>
          </div>

          <div>
            <div>이메일</div>
            <input
              type="email"
              placeholder="이메일을 입력하세요."
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "이메일을 입력하세요.")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              minLength={10}
              maxLength={30}
            />
          </div>

          <div>
            <div>생년월일</div>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>

          <div>
            <div>
              <div>성별</div>
              <input type="radio" name="gender" value="남" onClick={onCheckedHandler} required />남
              <input type="radio" name="gender" value="여" onClick={onCheckedHandler} required />여
            </div>
          </div>

          <JoinBtn type="submit">가입하기</JoinBtn>
        </JoinForm>
      </Container>
    </Wrapper>
  );
}
export default Join;

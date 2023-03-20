import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IUser } from "../atoms";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100%;
  min-height: 500px;
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

const FindFome = styled.form`
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

const SubmitBtn = styled.button`
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

const IdDiv = styled.div`
  padding-top: 50px;
  height: 165px;
  font-size: 15px;

  & > span {
    font-weight: 800;
  }
`;

function UserFind() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loginId, setLoginId] = useState("");
  const [pass, setPass] = useState(false);
  const navigate = useNavigate();
  let customerData: IUser[] = [];

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios({
        url: "http://localhost:5000/api/customers",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            customerData = result.data.filter(
              (data: IUser) => data.email === email && data.name === name
            );
            console.log(name, email);
            if (customerData.length === 0) {
              alert("해당하는 정보가 없습니다.");
              setPass(false);
            } else {
              setLoginId(customerData[0]?.loginId);
              setPass(true);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>아이디 찾기</Title>
        {pass ? (
          <IdDiv>
            {name} 님의 아이디는 <span>{loginId}</span>입니다.
          </IdDiv>
        ) : (
          <FindFome onSubmit={onSubmitHandler}>
            <div>
              <input
                type="text"
                placeholder="이름"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "이름")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="이메일"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "이메일")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <SubmitBtn>확인</SubmitBtn>
          </FindFome>
        )}
        <MenuUl>
          <li onClick={() => navigate("/userPasswordFind")}>비밀번호 찾기</li>
          <li onClick={() => navigate("/login")}>로그인</li>
        </MenuUl>
      </Container>
    </Wrapper>
  );
}

export default UserFind;

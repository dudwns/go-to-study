import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardAtom, IUser, loginAtom, userAtom } from "../atoms";
import Bookmark from "../Components/Bookmark";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  padding-top: 70px;
`;

const BorderContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const BoardMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 35px;
  align-items: center;
`;

const RecentBtn = styled.button`
  border: none;
  margin-right: 15px;
  padding: 5px 10px;
`;

const RecommendBtn = styled.button`
  border: none;
  padding: 5px 10px;
`;

const SearchForm = styled.form``;
const SearchInput = styled.input`
  width: 400px;
`;

const WriteBtn = styled.button`
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const ListBtn = styled.button`
  width: 60px;
  border: none;
  margin-left: 15px;
  padding: 5px 10px;
`;

const Board = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

const BoardList = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 13px;
  &:first-child {
    border-top: 1px solid gray;
  }
`;

const BoardName = styled.div`
  width: 100px;
`;
const BoardTitle = styled.div`
  width: 500px;
`;
const BoardDate = styled.div`
  width: 70px;
`;

const PageNumbers = styled.ul`
  display: flex;
  justify-content: center;
`;
const PageNumber = styled.li`
  padding: 0 6px;
  cursor: pointer;
  border-left: 1px solid gray;
  font-size: 14px;

  &:first-child {
    border: none;
  }
`;

function Home() {
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [boards, setBoards] = useState([]);
  const [boardData, setBoardData] = useRecoilState(boardAtom);

  const navigate = useNavigate();
  const accessToken = () => {
    axios({
      url: "http://localhost:5000/accesstoken",
      method: "GET",
      withCredentials: true,
    });
  };

  const refreshToken = () => {
    axios({
      url: "http://localhost:5000/refreshtoken",
      method: "GET",
      withCredentials: true,
    });
  };

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:5000/login/success",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setIsLogin(true);
            setUser(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:5000/api/board",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setBoards(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onTitleClickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    const id = (e.target as HTMLButtonElement).id;

    axios({
      url: "http://localhost:5000/api/board/" + id,
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setBoardData(result.data); // 클릭한 게시글의 데이터
        navigate(`/board/${id}`);
      }
    });
  };
  return (
    <Wrapper>
      <BorderContent>
        <BoardMenu>
          <div>
            <RecentBtn>최근 순</RecentBtn>
            <RecommendBtn>추천 순</RecommendBtn>
          </div>

          <SearchForm>
            <SearchInput type="text" placeholder="검색 할 내용을 입력하세요."></SearchInput>
          </SearchForm>
          <div>
            <Link to="/board/write">
              <WriteBtn>글 쓰기</WriteBtn>
            </Link>
            <ListBtn>목록</ListBtn>
          </div>
        </BoardMenu>
        <Board>
          {boards
            .slice(0)
            .reverse()
            .map((item: any, index: any) => (
              <BoardList key={index}>
                <BoardName>{item.username}</BoardName>
                <BoardTitle id={item.id} onClick={onTitleClickHandler}>
                  {item.title}
                </BoardTitle>
                <BoardDate>{item.time}</BoardDate>
              </BoardList>
            ))}
        </Board>
        <PageNumbers>
          <PageNumber>1</PageNumber>
          <PageNumber>2</PageNumber>
          <PageNumber>3</PageNumber>
          <PageNumber>4</PageNumber>
          <PageNumber>5</PageNumber>
        </PageNumbers>
        <button onClick={accessToken}>get Access Token</button>
        <button onClick={refreshToken}>get Refresh Token</button>
      </BorderContent>
      <Bookmark />
    </Wrapper>
  );
}
export default Home;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardAtom, IUser, keywordAtom, loginAtom, userAtom } from "../atoms";
import Bookmark from "../Components/Bookmark";
import Pagination from "../Components/Pagination";

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

const BoardContent = styled.div`
  width: 100%;
  margin-bottom: 10px;
  & > div:first-child {
    border-top: 2px solid black;
  }
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  padding: 0 20px;

  & span:nth-child(1) {
    width: 100px;
    font-weight: 700;
  }
  & span:nth-child(2) {
    width: 500px;
    font-weight: 700;
    text-align: center;
  }

  & span:nth-child(3) {
    width: 70px;
    font-weight: 700;
    text-align: center;
  }
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

  &:hover {
    background-color: whitesmoke;
  }
`;

const BoardName = styled.div`
  width: 100px;
`;
const BoardTitle = styled.div`
  width: 500px;
  text-align: center;
  & > span {
    cursor: pointer;
  }

  & > span:hover {
    text-decoration: underline;
  }
`;
const BoardDate = styled.div`
  width: 70px;
  text-align: center;
`;

const PageNumbers = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevBtn = styled.button`
  cursor: pointer;
  width: 23px;
  height: 23px;
  margin-right: 10px;
  background-color: white;
  border: 1px solid white;
  border-radius: 3px;
  &:hover {
    background-color: #d3d3d3;
  }
  & svg {
  }
`;

const NextBtn = styled.button`
  cursor: pointer;
  width: 23px;
  height: 23px;
  margin-left: 10px;
  background-color: white;
  border: 1px solid white;
  border-radius: 3px;
  &:hover {
    background-color: #d3d3d3;
  }
  & svg {
  }
`;

function Board() {
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [board, setBoard] = useState([]);
  const [keyword, setKeyword] = useRecoilState(keywordAtom);
  const [selectBoard, setSelectBoard] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const { page } = useParams();

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
            setBoard(result.data);
            setPageNumber(Math.ceil(result.data.length / 10));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 게시글을 10개씩 잘라서 가져옴
  useEffect(() => {
    try {
      axios({
        url: "http://localhost:5000/api/board/page/" + page,
        method: "POST",
        withCredentials: true,
        data: {
          boardLen: board.length,
        },
      })
        .then((result) => {
          if (result.data) {
            setSelectBoard(result.data);
            console.log("가져온 데이터", result.data);
            console.log(board.length);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [board, page]);

  const onTitleClickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    const id = (e.target as HTMLButtonElement).id;
    navigate(`/board/detail/${id}`);
  };

  const onWriteHandler = () => {
    if (isLogin) {
      navigate("/board/write");
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  const searchComponent = (data: any) => {
    // const newData = data.filter((item: any) => {
    //   return item.username.indexOf(keyword) > -1 || item.title.indexOf(keyword) > -1;
    // });
    let newData = data;

    if (keyword === "") {
      newData = data.filter((item: any) => {
        return item.username.indexOf(keyword) > -1 || item.title.indexOf(keyword) > -1;
      });
    } else {
      newData = board.filter((item: any) => {
        return item.username.indexOf(keyword) > -1 || item.title.indexOf(keyword) > -1;
      });
    }
    return newData
      .slice(0)
      .reverse()
      .map((item: any, index: any) => {
        return (
          <BoardList key={index}>
            <BoardName>{item.username}</BoardName>
            <BoardTitle>
              <span id={item.id} onClick={onTitleClickHandler}>
                {item.title}
              </span>
            </BoardTitle>
            <BoardDate>{item.time}</BoardDate>
          </BoardList>
        );
      });
  };

  const pageClicked = (e: React.MouseEvent<HTMLLIElement>) => {
    const page = (e.target as HTMLButtonElement).innerText;
    navigate("/board/" + page);
  };

  const prevClicked = () => {
    if (page === "1") {
      alert("첫 번재 페이지입니다.");
    } else {
      navigate("/board/" + (Number(page) - 1));
    }
  };

  const nextClicked = () => {
    if (page === String(pageNumber)) {
      alert("마지막 페이지입니다.");
    } else {
      navigate("/board/" + (Number(page) + 1));
    }
  };
  console.log(selectBoard);
  console.log(board.length);

  return (
    <Wrapper>
      <BorderContent>
        <BoardMenu>
          <div>
            <RecentBtn>최근 순</RecentBtn>
            <RecommendBtn>추천 순</RecommendBtn>
          </div>

          <SearchForm>
            <SearchInput
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색 할 내용을 입력하세요."
            ></SearchInput>
          </SearchForm>
          <div>
            <WriteBtn onClick={onWriteHandler}>글 쓰기</WriteBtn>
            <ListBtn>목록</ListBtn>
          </div>
        </BoardMenu>
        <BoardHeader>
          <span>글쓴이</span>
          <span>제목</span>
          <span>시간</span>
        </BoardHeader>
        <BoardContent>{searchComponent(selectBoard)}</BoardContent>
        <PageNumbers>
          <PrevBtn onClick={prevClicked}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </PrevBtn>

          <Pagination
            totalPosts={board.length}
            postsPerPage={10}
            currentPage={page}
            onClickPage={pageClicked}
          />
          <NextBtn onClick={nextClicked}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
          </NextBtn>
        </PageNumbers>
        {/* <button style={{ display: "none" }} onClick={accessToken}>
          get Access Token
        </button>
        <button style={{ display: "none" }} onClick={refreshToken}>
          get Refresh Token
        </button> */}
      </BorderContent>
      <Bookmark />
    </Wrapper>
  );
}

export default Board;

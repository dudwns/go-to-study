import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  boardAtom,
  bookmarkAtom,
  IBoard,
  IBookmark,
  keywordAtom,
  loginAtom,
  userAtom,
} from "../atoms";
import Bookmark from "../Components/Bookmark";
import Pagination from "../Components/Pagination";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  min-width: 1080px;
  display: flex;
  padding-top: 70px;
  margin-bottom: 50px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
`;

const BorderContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  min-width: 720px;
`;

const BoardMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 35px;
  align-items: center;
`;

const RecentBtn = styled.button`
  border: 1px solid gray;
  border-radius: 3px;
  margin-right: 15px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.btnColor};
  color: white;
`;

const RecommendBtn = styled.button`
  border: 1px solid gray;
  border-radius: 3px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.btnColor};
  color: white;
`;

const SearchForm = styled.form``;
const SearchInput = styled.input`
  width: 400px;

  @media screen and (max-width: 1200px) {
    width: 300px;
  }
`;

const WriteBtn = styled.button`
  border: 1px solid gray;
  border-radius: 3px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.btnColor};
  color: white;
  cursor: pointer;
`;

const ListBtn = styled.button`
  border: 1px solid gray;
  width: 60px;
  border-radius: 3px;
  margin-left: 15px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.btnColor};
  color: white;
  cursor: pointer;
`;

const BoardContent = styled.div`
  width: 100%;
  margin-bottom: 10px;
  & > div:first-child {
    border-top: 2px solid ${(props) => props.theme.borderColor};
  }
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 50px;
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
    @media screen and (max-width: 1200px) {
      width: 400px;
    }
  }

  & span:nth-child(3) {
    width: 70px;
    font-weight: 700;
    text-align: center;
  }

  & span:nth-child(4) {
    width: 40px;
    font-weight: 700;
    text-align: center;
    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
  & span:nth-child(5) {
    width: 70px;
    font-weight: 700;
    text-align: center;
  }
`;

const BoardList = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 13px;
  &:first-child {
    border-top: 1px solid gray;
  }

  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const BoardName = styled.div`
  width: 100px;
`;
const BoardTitle = styled.div`
  width: 500px;
  text-align: center;
  & > span:first-child {
    cursor: pointer;
    margin-right: 5px;
  }

  & > span:nth-child(2) {
    color: orange;
    margin-right: 5px;
  }

  & > span:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 1200px) {
    width: 400px;
  }
`;
const BoardDate = styled.div`
  width: 70px;
  text-align: center;
`;

const BoardRecomendation = styled.div`
  width: 40px;
  text-align: center;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const BoardBookmark = styled.div`
  width: 70px;
  text-align: center;

  & > svg {
    width: 20px;
    cursor: pointer;
    fill: white;
    stroke: black;
    stroke-width: 30px;

    & > path {
      pointer-events: none;
    }
  }

  & .bookmark {
    fill: yellow;
  }
`;

const BookmarkSvg = styled.svg``;

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
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.theme.bgColor};
  fill: ${(props) => props.theme.textColor};
`;

const NextBtn = styled.button`
  cursor: pointer;
  width: 23px;
  height: 23px;
  margin-left: 10px;
  background-color: white;
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.theme.bgColor};
  fill: ${(props) => props.theme.textColor};
`;

function Board() {
  const [isLogin, setIsLogin] = useRecoilState(loginAtom); // 로그인 유무를 나타내는 boolean 값
  const [user, setUser] = useRecoilState(userAtom); // 로그인 한 유저의 정보
  const [board, setBoard] = useRecoilState(boardAtom); // 전체 board 정보
  const [keyword, setKeyword] = useRecoilState(keywordAtom); // 유저가 검색한 키워드
  const [selectBoard, setSelectBoard] = useState<IBoard[]>([]); // 10개씩 자른 board 정보
  const [pageNumber, setPageNumber] = useState(0); // 페이지 쪽수
  const [bookmark, setBookmark] = useRecoilState(bookmarkAtom); // 전체 북마크 정보
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

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:5000/api/bookmark",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setBookmark(result.data);
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

  const onBookmarkClickHandler = (
    e: any,
    boardId: number,
    userName: string,
    boardTitle: string
  ) => {
    if (user.username) {
      // 로그인을 했을 때
      try {
        axios({
          url: "http://localhost:5000/api/bookmark",
          method: "POST",
          withCredentials: true,
          data: {
            userId: user.id,
            boardId: boardId,
            userName: userName,
            title: boardTitle,
          },
        })
          .then((result) => {
            e.target.classList.toggle("bookmark");
            if (result.status === 200) {
              // 즐찾을 처음 눌렀을 때
              if (result.data) {
              }
              // 즐찾을 중첩해서 눌렀을 때
              else {
                axios({
                  url: "http://localhost:5000/api/bookmark",
                  method: "DELETE",
                  withCredentials: true,
                  data: {
                    userId: user.id,
                    boardId: boardId,
                  },
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            // 다시 bookmark 렌더링
            axios({
              url: "http://localhost:5000/api/bookmark",
              method: "GET",
              withCredentials: true,
            }).then((result) => {
              if (result.status === 200) {
                setBookmark(result.data); // 클릭한 게시글의 데이터
              }
            });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      // 로그인을 하지 않았을 때
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  const searchComponent = (data: IBoard[]) => {
    let newData = data;

    if (keyword === "") {
      newData = data.filter((item: IBoard) => {
        return item.username.indexOf(keyword) > -1 || item.title.indexOf(keyword) > -1;
      });
    } else {
      newData = board.filter((item: IBoard) => {
        return item.username.indexOf(keyword) > -1 || item.title.indexOf(keyword) > -1;
      });
    }
    return newData
      .slice(0)
      .reverse()
      .map((item: IBoard, index: number) => {
        return (
          <BoardList key={index}>
            <BoardName>{item.username}</BoardName>
            <BoardTitle>
              <span id={String(item.id)} onClick={onTitleClickHandler}>
                {item.title.length > 35 ? `${item.title.slice(0, 35)}...` : item.title}
              </span>
              <span>{`[${item.replyCount}]`}</span>
            </BoardTitle>
            <BoardDate>{item.time}</BoardDate>
            <BoardRecomendation>{item.recommend}</BoardRecomendation>
            <BoardBookmark>
              <BookmarkSvg
                className={(() => {
                  let isTrue = false;
                  bookmark.map((mark: IBookmark) => {
                    if (mark.boardId === item.id && user.id === mark.userId) isTrue = true;
                  });
                  if (isTrue) return "bookmark";
                  else return "";
                })()}
                onClick={(e) => onBookmarkClickHandler(e, item.id, item.username, item.title)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
              </BookmarkSvg>
            </BoardBookmark>
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
            <ListBtn onClick={() => navigate("/board/1")}>목록</ListBtn>
          </div>
        </BoardMenu>
        <BoardHeader>
          <span>작성자</span>
          <span>제목</span>
          <span>등록일</span>
          <span>추천</span>
          <span>즐겨찾기</span>
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

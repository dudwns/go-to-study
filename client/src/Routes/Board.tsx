import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardAtom, bookmarkAtom, IBoard, IBookmark, loginAtom, userAtom } from "../atoms";
import Bookmark from "../Components/Bookmark";
import Pagination from "../Components/Pagination";

import Cookies from "js-cookie";
import Api from "../lib/customApi";

const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;

const ImageBackground = styled.div`
  width: 100%;
  height: 30vh;
  background-image: url("/images/imgslider3.jpg");
  background-size: cover;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 95%;
  display: flex;
  margin-bottom: 50px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
`;

const BorderContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  & button {
    cursor: pointer;
  }

  @media screen and (max-width: 1085px) {
    width: 100%;
  }
`;

const BoardMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 35px;
  align-items: center;
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  & select {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    font-size: 11px;
    border-color: black;
  }

  & svg {
    height: 100%;
    padding: 3px;
    position: absolute;
    top: 0;
    right: 5px;
  }
`;
const SearchInput = styled.input`
  width: 400px;
  font-size: 11px;
  border-radius: 3px;
  border: 1px solid black;
  padding: 2px;
  padding-left: 62px;
  padding-right: 30px;

  @media screen and (max-width: 800px) {
    width: 300px;
  }

  @media screen and (max-width: 590px) {
    width: 250px;
  }
  @media screen and (max-width: 520px) {
    width: 230px;
  }
`;

const WriteBtn = styled.button`
  width: 60px;
  font-size: 11px;
  border: 1px solid gray;
  border-radius: 3px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.btnColor};
  color: white;
  cursor: pointer;
  @media screen and (max-width: 1300px) {
    width: 55px;
    font-size: 10px;
  }
  @media screen and (max-width: 650px) {
    width: 45px;
    font-size: 7px;
    padding: 3px 0;
  }
`;

const ListBtn = styled.button`
  width: 60px;
  font-size: 11px;
  border: 1px solid gray;
  border-radius: 3px;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.btnColor};
  color: white;
  cursor: pointer;
  @media screen and (max-width: 1300px) {
    width: 55px;
    font-size: 10px;
  }

  @media screen and (max-width: 1085px) {
    display: none;
  }
`;

const BookmarkBtn = styled.button`
  width: 70px;
  font-size: 11px;
  border: 1px solid gray;
  border-radius: 3px;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.btnColor};
  color: white;
  cursor: pointer;
  display: none;

  @media screen and (max-width: 1085px) {
    display: inline-block;
    padding: 4px 10px;
  }

  @media screen and (max-width: 650px) {
    width: 50px;
    font-size: 7px;
    padding: 3px 0;
  }
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  align-items: center;
  padding: 0 10px;

  @media screen and (max-width: 1300px) {
    font-size: 13px;
  }
  & span:nth-child(1) {
    width: 100px;
    font-weight: 700;
    text-align: left;
    @media screen and (max-width: 600px) {
      font-size: 12px;
    }
  }
  & span:nth-child(2) {
    width: 500px;
    font-weight: 700;
    text-align: center;
    flex-shrink: 5;
    @media screen and (max-width: 1300px) {
      width: 400px;
    }
    @media screen and (max-width: 600px) {
      font-size: 12px;
    }
  }

  & span:nth-child(3) {
    width: 70px;
    font-weight: 700;
    text-align: center;
    @media screen and (max-width: 600px) {
      font-size: 12px;
    }
  }

  & span:nth-child(4) {
    width: 70px;
    font-weight: 700;
    text-align: center;
    @media screen and (max-width: 600px) {
      font-size: 12px;
      width: 60px;
    }
  }

  & span:nth-child(5) {
    width: 40px;
    font-weight: 700;
    text-align: center;
  }
`;

const BoardContent = styled.div`
  width: 100%;
  margin-bottom: 10px;

  & > div:first-child {
    border-top: 2px solid ${(props) => props.theme.borderColor};
  }
`;

const BoardList = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
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
  @media screen and (max-width: 1300px) {
    font-size: 11px;
  }
`;
const BoardTitle = styled.div`
  width: 500px;
  text-align: center;
  flex-shrink: 5;
  & > span:first-child {
    cursor: pointer;
    margin-right: 5px;
  }
  @media screen and (max-width: 1300px) {
    width: 400px;
    font-size: 11px;
  }

  @media screen and (max-width: 600px) {
    margin-right: 10px;
  }

  & > span:nth-child(2) {
    color: orange;
    margin-right: 5px;
  }

  & > span:hover {
    text-decoration: underline;
  }
`;
const BoardDate = styled.div`
  width: 70px;
  text-align: center;
  @media screen and (max-width: 1300px) {
    font-size: 11px;
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

    @media screen and (max-width: 1300px) {
      width: 15px;
    }
  }

  & .bookmark {
    fill: yellow;
  }
  @media screen and (max-width: 600px) {
    width: 60px;
  }
`;

const BookmarkSvg = styled.svg``;

const BoardRecomendation = styled.div`
  width: 40px;
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
`;

const BookmarkContainer = styled(motion.div)`
  width: 300px;
  height: 300px;
  position: fixed;
  top: 25%;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  padding-bottom: 20px;
  border-radius: 3px;
`;

const BookmarkTitle = styled.span`
  text-align: center;
  margin-bottom: 10px;
  @media screen and (max-width: 1250px) {
    font-size: 15px;
    margin: 0 15px;

    margin-bottom: 15px;
  }

  @media screen and (max-width: 930px) {
    font-size: 14px;
  }
`;

const BookmarkList = styled.ul`
  & li {
    font-size: 14px;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    margin: 0 30px;
    padding: 10px 0;
    margin-bottom: 10px;
    cursor: pointer;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
      background-color: ${(props) => props.theme.accentColor};
    }
    @media screen and (max-width: 1250px) {
      font-size: 12px;
      margin: 0 15px;
    }
  }
  overflow-y: auto;
`;

const CloseBtn = styled.svg`
  height: 12px;
  position: absolute;
  top: 11px;
  right: 10px;
  cursor: pointer;
  fill: ${(props) => props.theme.textColor};

  transition: fill 0.3s linear;
  &:hover {
    fill: ${(props) => props.theme.textColor};
  }
`;

const NullText = styled.div`
  text-align: center;
  font-size: 16px;
  color: gray;
  margin-top: 90px;
`;

let order = "최근 순";
let searchStandard = "제목";
let keyword = "";

function Board() {
  const [isLogin, setIsLogin] = useRecoilState(loginAtom); // 로그인 유무를 나타내는 boolean 값
  const [user, setUser] = useRecoilState(userAtom); // 로그인 한 유저의 정보
  const [board, setBoard] = useRecoilState(boardAtom); // 전체 board 정보
  const [selectBoard, setSelectBoard] = useState<IBoard[]>([]); // 10개씩 자른 board 정보
  const [pageNumber, setPageNumber] = useState(0); // 페이지 쪽수
  const [bookmark, setBookmark] = useRecoilState(bookmarkAtom); // 전체 북마크 정보
  const [isKeyword, setIsKeyword] = useState(false);
  const bookmarkData: any[] = [];
  const { page } = useParams();
  const bookmarkMatch = useMatch("/board/:page/bookmark/:userId");
  const navigate = useNavigate();

  bookmark.map((data: IBookmark, index: number) => {
    return data.userId === user.id ? bookmarkData.push(data) : "";
  });

  const onListClick = (boardId: number) => {
    navigate("/board/detail/" + boardId);
  };

  const onOverlayClick = () => {
    navigate(-1);
  };

  const accessToken = () => {
    Api.get("http://localhost:5000/accesstoken").then((result) => {
      localStorage.setItem("accessToken", result.data);
    });
  };

  const refreshToken = () => {
    axios({
      url: "http://localhost:5000/refreshtoken",
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      localStorage.setItem("accessToken", result.data);
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
    let boardLen = board.length;
    let firstValue = boardLen - Number(page) * 10 < 0 ? 0 : boardLen - (Number(page) - 1) * 10 - 10;
    let secondValue = boardLen - (Number(page) - 1) * 10;
    let data = board.slice(firstValue, secondValue);
    setSelectBoard(data);
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
    return newData
      .slice(0)
      .reverse()
      .map((item: IBoard, index: number) => {
        return (
          <BoardList key={index}>
            <BoardName>{item.username}</BoardName>
            <BoardTitle>
              <span id={String(item.id)} onClick={onTitleClickHandler}>
                {item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
              </span>
              <span>{`[${item.replyCount}]`}</span>
            </BoardTitle>
            <BoardDate>{item.time}</BoardDate>
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
            <BoardRecomendation>{item.recommend}</BoardRecomendation>
          </BoardList>
        );
      });
  };

  const pageClicked = (e: React.MouseEvent<HTMLLIElement>) => {
    const page = (e.target as HTMLButtonElement).innerText;
    if (keyword) navigate(`/board/${page}?keyword=${keyword}`);
    else navigate(`/board/${page}`);
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

  const onRecentClick = () => {
    let urlStr = "";
    try {
      if (isKeyword) {
        if (searchStandard === "제목")
          urlStr = `http://localhost:5000/api/search?keyword=${keyword}`;
        else if (searchStandard === "작성자")
          urlStr = `http://localhost:5000/api/search/username?keyword=${keyword}`;
      } else {
        urlStr = "http://localhost:5000/api/board";
      }
      axios({
        url: urlStr,
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setBoard(result.data);
            setPageNumber(Math.ceil(result.data.length / 10));
          }
        })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    navigate(`/board/1?keyword=${keyword}`);
  };

  const onRecommendClick = () => {
    let urlStr = "";
    try {
      if (isKeyword) {
        if (searchStandard === "제목")
          urlStr = `http://localhost:5000/api/search/recommend?keyword=${keyword}`;
        else if (searchStandard === "작성자")
          urlStr = `http://localhost:5000/api/search/recommend/username?keyword=${keyword}`;
      } else {
        urlStr = "http://localhost:5000/api/recommend/board";
      }
      axios({
        url: urlStr,
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setBoard(result.data);
            setPageNumber(Math.ceil(result.data.length / 10));
          }
        })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    navigate(`/board/1?keyword=${keyword}`);
  };

  const onSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let key = e.key || e.keyCode;
    if (key == "Enter" || key === 13) {
      keyword = e.currentTarget.value;
      navigate(`/board/1?keyword=${keyword}`);
      setIsKeyword(true);
      let urlStr = "";
      try {
        if (order === "최근 순") {
          if (searchStandard === "제목") {
            urlStr = `http://localhost:5000/api/search?keyword=${keyword}`;
          } else if (searchStandard === "작성자") {
            urlStr = `http://localhost:5000/api/search/username?keyword=${keyword}`;
          }
        } else if (order === "추천 순") {
          if (searchStandard === "제목") {
            urlStr = `http://localhost:5000/api/search/recommend?keyword=${keyword}`;
          } else if (searchStandard === "작성자") {
            urlStr = `http://localhost:5000/api/search/recommend/username?keyword=${keyword}`;
          }
        }
        axios({
          url: urlStr,
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
    }
  };

  const onOrderChange = (e: any) => {
    order = e.target.value;
    if (e.target.value === "최근 순") onRecentClick();
    else if (e.target.value === "추천 순") onRecommendClick();
  };

  const onBookmarkBtnClick = () => {
    navigate(`/board/${page}/bookmark/${user.id}`);
  };

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");
    console.log("나" + refreshToken);
  }, []);

  return (
    <>
      <ImageBackground></ImageBackground>
      <WrapperDiv>
        <Wrapper>
          <BorderContent>
            <button style={{ border: "1px solid red" }} onClick={accessToken}>
              get Access Token
            </button>
            <button style={{ border: "1px solid red" }} onClick={refreshToken}>
              get Refresh Token
            </button>
            <BoardMenu>
              <select onChange={onOrderChange}>
                <option value="최근 순">최근 순</option>
                <option value="추천 순">추천 순</option>
              </select>
              <SearchForm
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <select onChange={(e) => (searchStandard = e.target.value)}>
                  <option value="제목">제목</option>
                  <option value="작성자">작성자</option>
                </select>
                <SearchInput
                  type="text"
                  onKeyDown={onSearchSubmit}
                  placeholder="검색 할 내용을 입력하세요."
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "검색 할 내용을 입력하세요.")}
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </SearchForm>
              <div>
                <WriteBtn onClick={onWriteHandler}>글 쓰기</WriteBtn>
                <ListBtn
                  onClick={() => {
                    if (keyword) navigate(`/board/1?keyword=${keyword}`);
                    else navigate(`/board/1`);
                  }}
                >
                  목록
                </ListBtn>
                <BookmarkBtn onClick={onBookmarkBtnClick}>즐겨찾기</BookmarkBtn>
              </div>
            </BoardMenu>
            <BoardHeader>
              <span>작성자</span>
              <span>제목</span>
              <span>등록일</span>
              <span>즐겨찾기</span>
              <span>추천</span>
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
          </BorderContent>
          <Bookmark />
          <AnimatePresence>
            {bookmarkMatch ? (
              <>
                <Overlay animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                <BookmarkContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CloseBtn
                    onClick={onOverlayClick}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                  </CloseBtn>
                  <BookmarkTitle>즐겨찾기 게시판</BookmarkTitle>
                  {bookmarkData.length !== 0 ? (
                    <BookmarkList>
                      {bookmarkData.map((data: IBookmark, index: number) => (
                        <li key={index} onClick={() => onListClick(data.boardId)}>
                          {data.title}
                        </li>
                      ))}
                    </BookmarkList>
                  ) : (
                    <NullText>즐겨찾기 한 게시글이 없습니다.</NullText>
                  )}
                </BookmarkContainer>
              </>
            ) : (
              ""
            )}
          </AnimatePresence>
        </Wrapper>
      </WrapperDiv>
    </>
  );
}

export default Board;

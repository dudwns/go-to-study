import { useRecoilState, useRecoilValue } from "recoil";
import { IBoard, isDarkAtom, userAtom } from "../atoms";
import styled from "styled-components";
import Bookmark from "../Components/Bookmark";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  min-width: 1080px;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  & > div {
    display: flex;
  }

  & .active {
    fill: black;
    stroke: white;
    stroke-width: 20px;
  }

  & .bottom {
    margin-bottom: 50px;
    border: none;
  }

  & .block {
    display: block;
  }

  & .cancel {
    transform: scaleY(-1);
  }
`;

const BoardContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  background-color: ${(props) => props.theme.bgColor};
`;

const BoardWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  margin-bottom: 70px;
  height: 540px;
  overflow: hidden;
  position: relative;
`;

const BoardHeader = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 10px;
  & ul {
    display: flex;
    justify-content: space-between;
    font-weight: 800;

    & > div > li:first-child {
      width: 250px;
      text-align: center;
    }
  }
  background-color: ${(props) => props.theme.bgColor};
`;

const BoardContent = styled.div`
  width: 100%;
  padding: 10px;
  height: 440px;
  background-color: ${(props) => props.theme.bgColor};
  padding: 30px 70px 70px 70px;
  overflow-y: scroll;
`;

const BoardTitle = styled.div`
  font-size: 25px;
  font-weight: 800;
  margin-bottom: 50px;
  word-break: break-all;
  background-color: ${(props) => props.theme.bgColor};
`;

const RecommendBtn = styled.button`
  margin-top: 30px;
  width: 80px;
  height: 50px;
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => props.theme.bgColor};
  border-color: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};

  & svg {
    width: 25px;
    fill: white;
    stroke: black;
    stroke-width: 10px;
  }

  & span {
    font-size: 20px;
    pointer-events: none;
  }

  & > svg {
    pointer-events: none;
  }
  & > svg > path {
    pointer-events: none;
  }
`;

const RecommendSvg = styled.svg``;

const List = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.bgColor};
`;

const UpdateBtn = styled.button`
  border: 1px solid gray;
  padding: 5px 10px;
  width: 60px;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${(props) => props.theme.btnColor};
  color: white;
  position: absolute;
  right: 90px;
  bottom: 20px;
`;

const RemoveBtn = styled.button`
  border: 1px solid black;
  padding: 5px 10px;
  width: 60px;
  margin-left: 15px;
  border-radius: 3px;
  cursor: pointer;
  background-color: #dd0f0f;
  color: white;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const ListBtn = styled.button`
  border: 1px solid gray;
  padding: 5px 10px;
  width: 60px;
  margin-left: 15px;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  background-color: ${(props) => props.theme.btnColor};
`;

const CommentForm = styled.form`
  padding: 0 20px;
  margin-bottom: 30px;
  position: relative;
  width: 80%;
`;
const CommentInput = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-right: 10px;
  padding: 5px;
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};

  &:focus {
    outline: none;
  }
`;

const CommentBtn = styled.button`
  border: 1px solid gray;
  position: absolute;
  top: 30px;
  right: 20px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${(props) => props.theme.btnColor};
  color: white;
`;

const CommentItems = styled.ul`
  padding: 0 20px;
  width: 80%;
  padding-bottom: 50px;
  background-color: ${(props) => props.theme.bgColor};
`;

const CommentItem = styled.li`
  margin-top: 20px;
  margin-bottom: 10px;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};

  & > div:first-child {
    font-size: 13px;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 5px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  & > div:nth-child(2) {
    font-size: 12px;
    margin-bottom: 12px;
  }

  & > div:nth-child(3) {
    font-size: 12px;
    margin-bottom: 3px;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const UpBtn = styled.svg`
  padding-left: 10px;
  width: 27px;
  margin: 5px;
  fill: white;
  stroke: black;
  stroke-width: 20px;
  cursor: pointer;
  & > path {
    pointer-events: none;
  }
`;

const UpCount = styled.span`
  font-weight: 100;
`;

const ReplyDate = styled.div`
  width: 120px;
  display: inline-block;
`;

const ReplyBtn = styled.span`
  margin-left: 30px;
  cursor: pointer;
`;

const TarshSvg = styled.svg`
  width: 15px;
  cursor: pointer;
  fill: ${(props) => props.theme.textColor};
`;

const ReplyList = styled.div`
  display: none;
`;

const ReplyItems = styled.ul`
  width: 100%;
  padding-left: 20px;
`;

const ReplyItem = styled.li`
  margin: 20px 0;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  &:first-child {
    margin-top: 10px;
  }

  & > div:first-child {
    font-size: 13px;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 5px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  & > div:nth-child(2) {
    font-size: 12px;
    margin-bottom: 12px;
  }

  & > div:nth-child(3) {
    font-size: 12px;
    margin-bottom: 3px;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ReplyForm = styled.form`
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  margin-bottom: 30px;
  display: none;

  & > button:nth-child(2) {
    position: absolute;
    border: 1px solid gray;
    margin-left: 10px;
    padding: 3px 5px;
    top: 22px;
    right: 45px;
    border-radius: 3px;
    background-color: ${(props) => props.theme.btnColor};
    z-index: 3;
    cursor: pointer;
    color: white;
  }

  & > button:nth-child(3) {
    position: absolute;
    border: 1px solid gray;
    margin-left: 10px;
    padding: 3px 5px;
    top: 22px;
    right: 0;
    border-radius: 3px;
    background-color: ${(props) => props.theme.btnColor};
    z-index: 3;
    cursor: pointer;
    color: white;
  }
`;

const ReplyInput = styled.input`
  border: none;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  &:focus {
    outline: none;
  }
`;

const ReplyToggle = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;

  & svg {
    width: 10px;
    pointer-events: none;
    margin-right: 7px;
    fill: ${(props) => props.theme.textColor};
  }
`;

interface IComment {
  id: number;
  boardId: number;
  username: string;
  comment: string;
  date: string;
  up: number;
  group: number;
  reply: number;
  replyCount: number;
}

interface ILIKE {
  userId: number;
  commentId: number;
}

interface IRecommend {
  userId: number;
  boardId: number;
}

function BoardDetail() {
  const user = useRecoilValue(userAtom); // 로그인 한 유저의 정보
  const [boardData, setBoardData] = useState<IBoard[]>([]); // 선택한 게시글의 정보
  const [comment, setComment] = useState(""); // 댓글 폼 변수
  const [boardComment, setBoardComment] = useState<IComment[]>([]); // 클릭한 게시글의 댓글 정보
  const [likes, setLikes] = useState<ILIKE[]>([]); // 전체 좋아요 정보
  const [recommend, setRecommend] = useState<IRecommend[]>([]); // 전체 추천 정보
  const [reply, setReply] = useState(""); // 대댓글 폼 변수
  const [replyreply, setReplyReply] = useState("");
  const [replyDatas, setReplyDatas] = useState<IComment[]>([]);
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleDarkAtom = () => setIsDark((prev) => !prev);

  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/board/" + id,
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setBoardData(result.data); // 클릭한 게시글의 데이터
      }
    });
  }, [id]);

  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/comment/",
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        const data = result.data.filter((data: IComment) => data.boardId === boardData[0].id);
        setBoardComment(data); // 클릭한 게시글의 댓글

        const replyData = result.data.filter(
          (data: IComment) => data.boardId === boardData[0].id && data.group
        );
        setReplyDatas(replyData); // 클릭한 게시글의 대댓글
      }
    });
  }, [boardData]);

  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/recommendation",
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setRecommend(result.data); // 모든 추천 데이터
      }
    });
  }, []);

  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/like",
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setLikes(result.data); // 모든 좋아요 데이터
      }
    });
  }, []);

  const updateBoard = () => {
    if (user.username === boardData[0]?.username) {
      navigate(`/board/${id}/update`);
    } else if (user.username === "") {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      alert("다른 사람의 게시글은 수정할 수 없습니다.");
    }
  };

  const deletedBoard = () => {
    if (user.username === boardData[0]?.username) {
      const result = window.confirm("정말로 삭제하시겠습니까?");
      if (result) {
        // 게시글 삭제
        axios({
          url: "http://localhost:5000/api/board/" + id,
          method: "DELETE",
          withCredentials: true,
        }).then((result) => {
          if (result.status === 200) {
            // 게시글 추천 정보 삭제
            axios({
              url: "http://localhost:5000/api/recommendation/board",
              method: "DELETE",
              withCredentials: true,
              data: {
                boardId: boardData[0].id,
              },
            }).then((result) => {
              if (result.status === 200) {
                //좋아요 정보 삭제
                axios({
                  url: "http://localhost:5000/api/like/board",
                  method: "DELETE",
                  withCredentials: true,
                  data: {
                    boardId: boardData[0].id,
                  },
                }).then((result) => {
                  if (result.status === 200) {
                    // 북마크 정보 삭제
                    axios({
                      url: "http://localhost:5000/api/bookmark/board",
                      method: "DELETE",
                      withCredentials: true,
                      data: {
                        boardId: boardData[0].id,
                      },
                    }).then((result) => {
                      if (result.status === 200) {
                        // 댓글 정보 삭제
                        axios({
                          url: "http://localhost:5000/api/comment/board",
                          method: "DELETE",
                          withCredentials: true,
                          data: {
                            boardId: boardData[0].id,
                          },
                        }).then((result) => {
                          if (result.status === 200) {
                            alert("삭제가 완료되었습니다.");
                            navigate("/board/1");
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    } else if (user.username === "") {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      alert("다른 사람의 게시글은 삭제할 수 없습니다.");
    }
  };

  const onRecommendClick = (e: any, count: number) => {
    if (user.username) {
      // 로그인을 했을 때
      axios({
        url: "http://localhost:5000/api/recommendation",
        method: "POST",
        withCredentials: true,
        data: {
          userId: user.id,
          boardId: boardData[0].id,
        },
      })
        .then((result) => {
          e.target.childNodes[0].classList.toggle("active");
          if (result.status === 200) {
            // 추천을 처음 눌렀을 때
            if (result.data) {
              axios({
                url: "http://localhost:5000/api/board/update",
                method: "PUT",
                withCredentials: true,
                data: {
                  id: boardData[0].id,
                  recommend: count + 1,
                },
              });
            }
            // 추천을 중첩해서 눌렀을 때
            else {
              axios({
                url: "http://localhost:5000/api/board/update",
                method: "PUT",
                withCredentials: true,
                data: {
                  id: boardData[0].id,
                  recommend: count - 1,
                },
              }).then(() => {
                axios({
                  url: "http://localhost:5000/api/recommendation/down",
                  method: "DELETE",
                  withCredentials: true,
                  data: {
                    userId: user.id,
                    boardId: boardData[0].id,
                  },
                });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          // 다시 board 렌더링
          axios({
            url: "http://localhost:5000/api/board/" + id,
            method: "GET",
            withCredentials: true,
          }).then((result) => {
            if (result.status === 200) {
              setBoardData(result.data); // 클릭한 게시글의 데이터
            }
          });
        });
    } else {
      // 로그인을 하지 않았을 때
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  const commentSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.username) {
      if (comment) {
        axios({
          url: "http://localhost:5000/api/comment/insert",
          method: "POST",
          withCredentials: true,
          data: {
            boardId: boardData[0].id,
            userName: user.username,
            comment: comment,
          },
        })
          .then((result) => {
            if (result.status === 200) {
              setComment("");
            }
          })
          .catch((error) => {
            alert(error);
          })
          .then(() => {
            axios({
              url: "http://localhost:5000/api/board/reply/update",
              method: "PUT",
              withCredentials: true,
              data: {
                boardId: boardData[0].id,
                replyCount: boardData[0].replyCount + 1,
              },
            });
          })
          .then(() => {
            axios({
              url: "http://localhost:5000/api/comment/",
              method: "GET",
              withCredentials: true,
            })
              .then(() => {
                axios({
                  url: "http://localhost:5000/api/board/" + id,
                  method: "GET",
                  withCredentials: true,
                }).then((result) => {
                  if (result.status === 200) {
                    setBoardData(result.data); // 클릭한 게시글의 데이터
                  }
                });
              })
              .then(() => {
                axios({
                  url: "http://localhost:5000/api/comment/",
                  method: "GET",
                  withCredentials: true,
                }).then((result) => {
                  if (result.status === 200) {
                    const data = result.data.filter(
                      (data: IComment) => data.boardId === boardData[0].id
                    );
                    setBoardComment(data); // 클릭한 게시글의 댓글

                    const replyData = result.data.filter(
                      (data: IComment) => data.boardId === boardData[0].id && data.group
                    );
                    setReplyDatas(replyData);
                  }
                });
              });
          });
      } else {
        alert("내용을 입력하세요.");
      }
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  const upBtnClick = (e: any, id: number, up: number) => {
    if (user.username) {
      // 로그인을 했을 때
      axios({
        url: "http://localhost:5000/api/like/",
        method: "POST",
        withCredentials: true,
        data: {
          id: id,
          userId: user.id,
          boardId: boardData[0].id,
        },
      })
        .then((result) => {
          e.target.classList.toggle("active");
          if (result.status === 200) {
            // 좋아요를 처음 눌렀을 때
            if (result.data) {
              axios({
                url: "http://localhost:5000/api/comment/update",
                method: "PUT",
                withCredentials: true,
                data: {
                  id: id,
                  up: up + 1,
                },
              });
            }
            // 좋아요를 중첩해서 눌렀을 때
            else {
              axios({
                url: "http://localhost:5000/api/comment/update",
                method: "PUT",
                withCredentials: true,
                data: {
                  id: id,
                  up: up - 1,
                },
              }).then(() => {
                axios({
                  url: "http://localhost:5000/api/like/down",
                  method: "DELETE",
                  withCredentials: true,
                  data: {
                    id: id,
                    userId: user.id,
                  },
                });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          // 다시 comment를 렌더링
          axios({
            url: "http://localhost:5000/api/comment/",
            method: "GET",
            withCredentials: true,
          }).then((result) => {
            if (result.status === 200) {
              const data = result.data.filter((data: IComment) => data.boardId === boardData[0].id);
              setBoardComment(data); // 클릭한 게시글의 데이터
            }
          });
        });
    } else {
      // 로그인을 하지 않았을 때
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  const onTrashClickHandler = (e: any, commentId: number) => {
    const result = window.confirm("정말로 삭제하시겠습니까?");
    if (result) {
      axios({
        url: "http://localhost:5000/api/comment",
        method: "DELETE",
        withCredentials: true,
        data: {
          id: commentId,
          boardId: boardData[0].id,
        },
      }).then((result) => {
        if (result.status === 200) {
          axios({
            //좋아요 정보 삭제
            url: "http://localhost:5000/api/like",
            method: "DELETE",
            withCredentials: true,
            data: {
              id: commentId,
            },
          })
            .then((result) => {
              if (result.status === 200) {
                alert("삭제가 완료되었습니다.");
              }
            })
            .then(() => {
              // 다시 comment를 렌더링
              axios({
                url: "http://localhost:5000/api/comment/",
                method: "GET",
                withCredentials: true,
              }).then((result) => {
                if (result.status === 200) {
                  const data = result.data.filter(
                    (data: IComment) => data.boardId === boardData[0].id
                  );
                  setBoardComment(data); // 클릭한 게시글의 데이터
                }
              });
            });
        }
      });
    }
  };

  const onReplyClick = (e: any, username: string, isReply: boolean) => {
    e.target.nextSibling.classList.toggle("block");
    e.target.nextSibling.children[0].focus();
    e.target.parentElement.parentElement.parentElement.classList.toggle("bottom");
    setReply("");

    if (!isReply) {
      setReplyReply("");
      setReplyReply(`@${username} `);
    }
  };

  const onCencleClick = (e: any) => {
    e.preventDefault();
    e.target.parentElement.classList.toggle("block");
    e.target.parentElement.parentElement.parentElement.parentElement.classList.toggle("bottom");
  };

  const onReplySubmit = (e: any, group: number, replyCount: number, isReply: boolean) => {
    e.preventDefault();
    if (user.username) {
      // 로그인을 했을 때
      axios({
        url: "http://localhost:5000/api/comment/reply/insert",
        method: "POST",
        withCredentials: true,
        data: {
          boardId: boardData[0].id,
          userName: user.username,
          reply: isReply ? reply : replyreply,
          group: group,
        },
      }).then(() => {
        axios({
          url: "http://localhost:5000/api/comment/update/reply",
          method: "PUT",
          withCredentials: true,
          data: {
            id: group,
            replyCount: replyCount + 1,
          },
        })
          .then((result) => {
            if (result.status === 200) {
              setReply("");
            }
          })
          .then(() => {
            // 다시 comment를 렌더링
            axios({
              url: "http://localhost:5000/api/comment/",
              method: "GET",
              withCredentials: true,
            }).then((result) => {
              if (result.status === 200) {
                const data = result.data.filter(
                  (data: IComment) => data.boardId === boardData[0].id
                );
                setBoardComment(data); // 클릭한 게시글의 데이터

                const replyData = result.data.filter(
                  (data: IComment) => data.boardId === boardData[0].id && data.group
                );
                setReplyDatas(replyData); // 클릭한 게시글의 대댓글
              }
            });
          });
      });
    } else {
      // 로그인을 하지 않았을 때
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  const onReplyOpen = (e: any) => {
    e.target.nextSibling.classList.toggle("block");
    e.target.childNodes[0].classList.toggle("cancel");
  };

  const onReplyCount = () => {};

  return (
    <>
      <Wrapper>
        <div>
          <BoardContainer>
            <List>
              <ListBtn onClick={() => navigate(-1)}>목록</ListBtn>
            </List>
            <BoardWrapper>
              <BoardHeader>
                <ul>
                  <div>
                    <li>작성자: {boardData[0]?.username}</li>
                  </div>
                  <div>
                    <li>등록일: {boardData[0]?.time}</li>
                  </div>
                  <div>
                    <li>추천: {boardData[0]?.recommend}</li>
                  </div>
                </ul>
              </BoardHeader>
              <BoardContent>
                <BoardTitle>{boardData[0]?.title}</BoardTitle>
                <div dangerouslySetInnerHTML={{ __html: boardData[0]?.content }} />
                <RecommendBtn onClick={(e) => onRecommendClick(e, boardData[0]?.recommend)}>
                  <RecommendSvg
                    className={(() => {
                      let isTrue = false;
                      recommend.map((recommendation: IRecommend) => {
                        if (
                          recommendation.boardId === Number(id) &&
                          user.id === recommendation.userId
                        )
                          isTrue = true;
                      });
                      if (isTrue) return "active";
                      else return "";
                    })()}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                  </RecommendSvg>
                  <span>{boardData[0]?.recommend}</span>
                </RecommendBtn>
                <UpdateBtn onClick={updateBoard}>수정</UpdateBtn>
                <RemoveBtn onClick={deletedBoard}>삭제</RemoveBtn>
              </BoardContent>
            </BoardWrapper>
          </BoardContainer>
          <Bookmark />
        </div>

        <CommentForm onSubmit={commentSubmitHandler}>
          <CommentInput
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글 추가..."
          ></CommentInput>
          <CommentBtn>댓글</CommentBtn>
        </CommentForm>
        <CommentItems>
          {boardComment
            .slice(0)
            .reverse()
            .map((data: IComment, index: number) =>
              data.group ? null : (
                <>
                  <CommentItem key={index}>
                    <div>
                      {data.username}
                      <span>
                        <UpBtn
                          className={(() => {
                            let isTrue = false;
                            likes.map((like: ILIKE) => {
                              if (like.commentId === data.id && user.id === like.userId)
                                isTrue = true;
                            });
                            if (isTrue) return "active";
                            else return "";
                          })()}
                          onClick={(e) => upBtnClick(e, data.id, data.up)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                        </UpBtn>
                      </span>
                      <UpCount>{data.up}</UpCount>
                    </div>
                    <div>{data.comment}</div>
                    <div>
                      <div>
                        <ReplyDate>{data.date}</ReplyDate>
                        <ReplyBtn onClick={(e) => onReplyClick(e, data.username, true)}>
                          답글
                        </ReplyBtn>
                        <ReplyForm>
                          <ReplyInput
                            type="text"
                            placeholder="답글 추가..."
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            required
                          ></ReplyInput>
                          <button onClick={onCencleClick}>취소</button>
                          <button onClick={(e) => onReplySubmit(e, data.id, data.replyCount, true)}>
                            답글
                          </button>
                        </ReplyForm>
                      </div>
                      {data.username === user.username ||
                      boardData[0].username === user.username ? (
                        <TarshSvg
                          onClick={(e) => onTrashClickHandler(e, data.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                        </TarshSvg>
                      ) : (
                        ""
                      )}
                    </div>
                  </CommentItem>
                  {data.reply && (
                    <ReplyToggle onClick={onReplyOpen}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M169.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 274.7 54.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                      </svg>
                      답글 {data.replyCount}개
                    </ReplyToggle>
                  )}
                  <ReplyList>
                    {replyDatas.map((value) =>
                      value.group === data.id ? (
                        <ReplyItems>
                          <ReplyItem key={value.id}>
                            <div>
                              {value.username}
                              <span>
                                <UpBtn
                                  className={(() => {
                                    let isTrue = false;
                                    likes.map((like: ILIKE) => {
                                      if (like.commentId === value.id && user.id === like.userId)
                                        isTrue = true;
                                    });
                                    if (isTrue) return "active";
                                    else return "";
                                  })()}
                                  onClick={(e) => upBtnClick(e, value.id, value.up)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                </UpBtn>
                              </span>

                              <UpCount>{value.up}</UpCount>
                            </div>
                            <div>{value.comment}</div>
                            <div>
                              <div>
                                <ReplyDate>{value.date}</ReplyDate>
                                <ReplyBtn onClick={(e) => onReplyClick(e, value.username, false)}>
                                  답글
                                </ReplyBtn>
                                <ReplyForm>
                                  <ReplyInput
                                    type="text"
                                    placeholder="답글 추가..."
                                    value={replyreply}
                                    onChange={(e) => setReplyReply(e.target.value)}
                                    required
                                  ></ReplyInput>
                                  <button onClick={onCencleClick}>취소</button>
                                  <button
                                    onClick={(e) =>
                                      onReplySubmit(e, value.group, data.replyCount, false)
                                    }
                                  >
                                    답글
                                  </button>
                                </ReplyForm>
                              </div>
                              {value.username === user.username ||
                              boardData[0].username === user.username ? (
                                <TarshSvg
                                  onClick={(e) => onTrashClickHandler(e, value.id)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                                </TarshSvg>
                              ) : (
                                ""
                              )}
                            </div>
                          </ReplyItem>
                        </ReplyItems>
                      ) : null
                    )}
                  </ReplyList>
                </>
              )
            )}
        </CommentItems>
      </Wrapper>
    </>
  );
}

export default BoardDetail;

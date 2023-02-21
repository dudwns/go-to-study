import { useRecoilState, useRecoilValue } from "recoil";
import { boardAtom, userAtom } from "../atoms";
import styled from "styled-components";
import Bookmark from "../Components/Bookmark";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 70px;

  & > div {
    display: flex;
  }
`;
const BoardContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const BoardHeader = styled.div`
  border: 1px solid black;
  padding: 10px;
  & ul {
    display: flex;
    justify-content: space-between;
  }
`;

const BoardContent = styled.div`
  border: 1px solid black;
  padding: 10px;
  height: 600px;
  margin-bottom: 70px;
`;

const BoardTitle = styled.div`
  font-size: 25px;
  font-weight: 800;
  margin-bottom: 50px;
`;

const List = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const UpdateBtn = styled.button`
  border: none;
  padding: 5px 10px;
  width: 60px;
  cursor: pointer;
  background-color: #376ed4;
`;

const RemoveBtn = styled.button`
  border: none;
  padding: 5px 10px;
  width: 60px;
  margin-left: 15px;
  cursor: pointer;
  background-color: #dd0f0f;
`;

const ListBtn = styled.button`
  border: none;
  padding: 5px 10px;
  width: 60px;
  margin-left: 15px;
  cursor: pointer;
`;

const CommentForm = styled.form`
  padding: 0 20px;
  margin-bottom: 30px;
`;
const CommentInput = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  margin-right: 10px;
  padding: 5px;
  width: 80%;
`;

const CommentBtn = styled.button`
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const CommentItems = styled.ul`
  padding: 0 20px;
  width: 80%;
`;

const CommentItem = styled.li`
  border-bottom: 1px solid gray;
  margin: 20px 0;

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
    margin-bottom: 3px;
  }

  & > div:nth-child(3) {
    font-size: 12px;
    margin-bottom: 3px;
    display: inline-block;
  }

  & .active {
    fill: black;
    stroke: white;
    stroke-width: 20px;
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

interface IComment {
  id: number;
  boardId: number;
  username: string;
  comment: string;
  date: string;
  up: number;
  [prop: string]: any;
}

interface ILIKE {
  userId: number;
  commentId: number;
  [prop: string]: any;
}

function BoardDetail() {
  const [boardData, setBoardData] = useRecoilState(boardAtom);
  const userData = useRecoilValue(userAtom);
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [commentAll, setCommentAll] = useState<IComment>([] as any);
  const [likes, setLikes] = useState<ILIKE>([] as any);

  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/board/" + id,
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setBoardData(result.data); // 클릭한 게시글의 데이터
        console.log(boardData[0].id);
      }
    });
  }, []);

  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/comment/",
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        const data = result.data.filter((data: any) => data.boardId === boardData[0].id);
        setCommentAll(data); // 클릭한 게시글의 데이터
      }
    });
  }, [boardData]);

  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/likes",
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setLikes(result.data); // 모든 댓글들의 데이터
        console.log(result.data);
      }
    });
  }, []);

  const updateBoard = () => {
    if (userData.username === boardData[0]?.username) {
      navigate(`/board/${id}/update`);
    } else if (userData.username === "") {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      alert("다른 사람의 게시글은 수정할 수 없습니다.");
    }
  };

  const deletedBoard = () => {
    if (userData.username === boardData[0]?.username) {
      const result = window.confirm("정말로 삭제하시겠습니까?");
      if (result) {
        axios({
          url: "http://localhost:5000/api/board/" + id,
          method: "DELETE",
          withCredentials: true,
        }).then((result) => {
          if (result.status === 200) {
            alert("삭제가 완료되었습니다.");
            window.open("/", "_self");
          }
        });
      }
    } else if (userData.username === "") {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      alert("다른 사람의 게시글은 삭제할 수 없습니다.");
    }
  };

  const commentSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.username) {
      if (comment) {
        axios({
          url: "http://localhost:5000/api/comment/insert",
          method: "POST",
          withCredentials: true,
          data: {
            boardId: boardData[0].id,
            userName: userData.username,
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
              url: "http://localhost:5000/api/comment/",
              method: "GET",
              withCredentials: true,
            }).then((result) => {
              if (result.status === 200) {
                const data = result.data.filter((data: any) => data.boardId === boardData[0].id);
                setCommentAll(data); // 클릭한 게시글의 댓글
              }
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
    if (userData.username) {
      // 로그인을 했을 때
      axios({
        url: "http://localhost:5000/api/like/",
        method: "POST",
        withCredentials: true,
        data: {
          id: id,
          userId: userData.id,
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
                    userId: userData.id,
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
              const data = result.data.filter((data: any) => data.boardId === boardData[0].id);
              setCommentAll(data); // 클릭한 게시글의 데이터
            }
          });
        });
    } else {
      // 로그인을 하지 않았을 때
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  return (
    <>
      <Wrapper>
        <div>
          <BoardContainer>
            <List>
              <UpdateBtn onClick={updateBoard}>수정</UpdateBtn>
              <RemoveBtn onClick={deletedBoard}>삭제</RemoveBtn>
              <ListBtn onClick={() => navigate(-1)}>목록</ListBtn>
            </List>

            <BoardHeader>
              <ul>
                <div>
                  <li>{boardData[0]?.username}</li>
                </div>
                <div>
                  <li>{boardData[0]?.time}</li>
                </div>
                <div>
                  <li>추천: {boardData[0]?.recommend}</li>
                </div>
              </ul>
            </BoardHeader>
            <BoardContent>
              <BoardTitle>{boardData[0]?.title}</BoardTitle>
              <div dangerouslySetInnerHTML={{ __html: boardData[0]?.content }} />
            </BoardContent>
          </BoardContainer>
          <Bookmark />
        </div>

        <CommentForm onSubmit={commentSubmitHandler}>
          <CommentInput
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          ></CommentInput>
          <CommentBtn>등록</CommentBtn>
        </CommentForm>
        <CommentItems>
          {commentAll
            .slice(0)
            .reverse()
            .map((data: any, index: number) => (
              <CommentItem key={index}>
                <div>
                  {data.username}
                  <span>
                    <UpBtn
                      className={likes.map((like: any) =>
                        like.commentId === data.id && userData.id === like.userId ? "active" : ""
                      )}
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
                <div>{data.date}</div>
              </CommentItem>
            ))}
        </CommentItems>
      </Wrapper>
    </>
  );
}

export default BoardDetail;

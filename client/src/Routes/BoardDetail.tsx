import { useRecoilState } from "recoil";
import { boardAtom, userAtom } from "../atoms";
import styled from "styled-components";
import Bookmark from "../Components/Bookmark";
import { Link, useNavigate, useParams } from "react-router-dom";
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
    margin-bottom: 5px;
  }

  & > div:nth-child(2) {
    font-size: 13px;
    margin-bottom: 3px;
  }

  & > div:last-child {
    font-size: 12px;
    margin-bottom: 3px;
  }
`;

interface IComment {
  boardId: number;
  username: string;
  comment: string;
  date: string;
  [prop: string]: any;
}

function BoardDetail() {
  const [boardData, setBoardData] = useRecoilState(boardAtom);
  const [userData, setUserData] = useRecoilState(userAtom);
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [commentAll, setCommentAll] = useState<IComment>([] as any);

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
        console.log(data);
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
    console.log(boardData[0].id, userData.username, comment);
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
          // window.open("/", "_self");
        }
      })
      .catch((error) => {
        alert("내용을 입력해주세요.");
      });
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
                <div>{data.username}</div>
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

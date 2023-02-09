import { useRecoilState } from "recoil";
import { boardAtom, userAtom } from "../atoms";
import styled from "styled-components";
import Bookmark from "../Components/Bookmark";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  padding-top: 70px;
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

const RemoveBtn = styled.button`
  border: none;
  padding: 5px 10px;
  width: 60px;
  top: 10px;
  right: 20px;
  cursor: pointer;
  background-color: #dd0f0f;
`;

const ListBtn = styled.button`
  border: none;
  padding: 5px 10px;
  width: 60px;
  top: 10px;
  right: 20px;
  margin-left: 15px;
  cursor: pointer;
`;

function BoardSelect() {
  const [boardData, setBoardData] = useRecoilState(boardAtom);
  const [userData, setUserData] = useRecoilState(userAtom);
  const { id } = useParams();

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

  const DeletedBoard = () => {
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
    } else {
      alert("다른 사람의 게시글은 삭제할 수 없습니다.");
    }
  };

  return (
    <Wrapper>
      <BoardContainer>
        <List>
          <RemoveBtn onClick={DeletedBoard}>삭제</RemoveBtn>
          <Link to="/">
            <ListBtn>목록</ListBtn>
          </Link>
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
    </Wrapper>
  );
}

export default BoardSelect;

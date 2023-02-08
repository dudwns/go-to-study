import { useRecoilState } from "recoil";
import { boardAtom } from "../atoms";
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
const ListBtn = styled.button`
  border: none;
  padding: 5px 10px;
  width: 60px;
  top: 10px;
  right: 20px;
  cursor: pointer;
`;

function BoardSelect() {
  const [boardData, setBoardData] = useRecoilState(boardAtom);
  console.log(boardData);
  const [content, setContent] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/board/" + id,
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setBoardData(result.data); // 클릭한 게시글의 데이터
        setContent(boardData[0]?.content);
      }
    });
  }, []);

  return (
    <Wrapper>
      <BoardContainer>
        <List>
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
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </BoardContent>
      </BoardContainer>
      <Bookmark />
    </Wrapper>
  );
}

export default BoardSelect;

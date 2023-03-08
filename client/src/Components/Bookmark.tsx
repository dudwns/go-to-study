import styled from "styled-components";
import { bookmarkAtom, IBookmark, userAtom } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d3d3d3;
  width: 18%;
  height: 500px;
  margin-top: 85px;
  padding: 10px 5px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  min-width: 200px;
`;

const BookmarkTitle = styled.span`
  text-align: center;
  margin-bottom: 10px;
`;

const BookmarkList = styled.ul`
  font-size: 15px;
  & li {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    margin: 0 30px;
    padding: 10px 5px;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.accentColor};
    }
  }
  overflow-y: auto;
`;

function Bookmark() {
  const user = useRecoilValue(userAtom); // 로그인 한 유저의 정보
  const [bookmark, setBookmark] = useRecoilState(bookmarkAtom); // 전체 북마크 정보
  const navigate = useNavigate();

  const onListClick = (boardId: number) => {
    navigate("/board/detail/" + boardId);
  };

  return (
    <>
      <Wrapper>
        <BookmarkTitle>즐겨찾기 게시판</BookmarkTitle>
        <BookmarkList>
          {bookmark &&
            bookmark.map((data: IBookmark, index: number) =>
              data.userId === user.id ? (
                <li key={index} onClick={() => onListClick(data.boardId)}>
                  {data.title.length > 19 ? `${data.title.slice(0, 19)}...` : data.title}
                </li>
              ) : (
                ""
              )
            )}
        </BookmarkList>
      </Wrapper>
    </>
  );
}
export default Bookmark;

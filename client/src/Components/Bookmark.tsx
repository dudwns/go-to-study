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
  min-width: 150px;
  margin-right: 30px;
  @media screen and (max-width: 1050px) {
    display: none;
  }
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

const NullText = styled.div`
  text-align: center;
  font-size: 16px;
  color: gray;
  margin-top: 160px;
  @media screen and (max-width: 1340px) {
    font-size: 12px;
  }
`;

function Bookmark() {
  const user = useRecoilValue(userAtom); // 로그인 한 유저의 정보
  const [bookmark, setBookmark] = useRecoilState(bookmarkAtom); // 전체 북마크 정보
  const navigate = useNavigate();
  const bookmarkData: any[] = [];

  const onListClick = (boardId: number) => {
    navigate("/board/detail/" + boardId);
  };

  bookmark.map((data: IBookmark, index: number) => {
    return data.userId === user.id ? bookmarkData.push(data) : "";
  });

  return (
    <>
      <Wrapper>
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
      </Wrapper>
    </>
  );
}
export default Bookmark;

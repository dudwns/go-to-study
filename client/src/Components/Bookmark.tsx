import styled from "styled-components";
import { bookmarkAtom, IBookmark, userAtom } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d3d3d3;
  width: 18%;
  height: 500px;

  margin-top: 85px;
  padding: 10px 5px;
`;

const BookmarkTitle = styled.span`
  text-align: center;
  margin-bottom: 10px;
`;

const BookmarkList = styled.ul`
  font-size: 15px;
  & li {
    border-bottom: 1px solid gray;
    margin: 0 30px;
    padding: 10px 0;
    cursor: pointer;

    &:hover {
      background-color: #868585;
    }
  }
  overflow-y: auto;
`;

function Bookmark() {
  const user = useRecoilValue(userAtom); // 로그인 한 유저의 정보
  const [bookmark, setBookmark] = useRecoilState(bookmarkAtom); // 전체 북마크 정보

  return (
    <>
      <Wrapper>
        <BookmarkTitle>즐겨찾기 게시판</BookmarkTitle>
        <BookmarkList>
          {bookmark &&
            bookmark.map((data: IBookmark, index: number) =>
              data.userId === user.id ? (
                <li key={index}>
                  {data.title.length > 20 ? `${data.title.slice(0, 20)}...` : data.title}
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

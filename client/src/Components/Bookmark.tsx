import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  background-color: #d3d3d3;
  width: 18%;
  height: 500px;
  justify-content: center;
  margin-top: 45px;
  padding: 10px 5px;
`;

const BookmarkTitle = styled.span``;

function Bookmark() {
  return (
    <>
      <Wrapper>
        <BookmarkTitle>
          즐겨찾기 게시판
          {/* <button onClick={accessToken}>get Access Token</button>
    <button onClick={refreshToken}>get Refresh Token</button> */}
        </BookmarkTitle>
      </Wrapper>
    </>
  );
}
export default Bookmark;

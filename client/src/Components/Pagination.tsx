import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const PageBtn = styled.button<IPage>`
  background-color: ${(prop) => (prop.pageNumber == prop.currentPage ? "gray" : "white")};
  cursor: pointer;
  border: 1px solid gray;
  margin: 0 1px;
  border-radius: 3px;
  &:hover {
    background-color: #d3d3d3;
  }
`;

interface IPage {
  pageNumber: number;
  currentPage: number;
}

function pagination({ totalPosts, postsPerPage, currentPage, onClickPage }: any) {
  const numOfPages = Math.ceil(totalPosts / postsPerPage); // 총 게시물을 10으로 나눔
  let totalButtons = new Array(numOfPages).fill(null); // 페이지 수만큼 null로 채운 배열 생성
  totalButtons = totalButtons.map((_, index) => index + 1); // 1씩 증가한 배열 값을 전달

  return (
    <>
      {totalButtons.map((pageNumber, index) => (
        <PageBtn
          key={index}
          onClick={onClickPage}
          pageNumber={pageNumber}
          currentPage={currentPage}
        >
          {pageNumber}
        </PageBtn>
      ))}
    </>
  );
}
export default pagination;

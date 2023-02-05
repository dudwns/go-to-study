import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  padding-top: 70px;
`;

const BorderContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const BoardMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 35px;
  align-items: center;
`;

const RecentBtn = styled.button`
  border: none;
  margin-right: 15px;
  padding: 5px 10px;
`;

const RecommendBtn = styled.button`
  border: none;
  padding: 5px 10px;
`;

const SearchForm = styled.form``;
const SearchInput = styled.input`
  width: 400px;
`;

const WriteBtn = styled.button`
  border: none;
  padding: 5px 10px;
`;

const ListBtn = styled.button`
  width: 60px;
  border: none;
  margin-left: 15px;
  padding: 5px 10px;
`;

const Board = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

const BoardList = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 13px;
  &:first-child {
    border-top: 1px solid gray;
  }
`;

const BoardName = styled.div`
  width: 100px;
`;
const BoardContent = styled.div`
  width: 500px;
`;
const BoardDate = styled.div`
  width: 70px;
`;

const PageNumbers = styled.ul`
  display: flex;
  justify-content: center;
`;
const PageNumber = styled.li`
  padding: 0 6px;
  cursor: pointer;
  border-left: 1px solid gray;
  font-size: 14px;

  &:first-child {
    border: none;
  }
`;

const Bookmark = styled.div`
  display: flex;
  background-color: #d3d3d3;
  width: 18%;
  height: 600px;
  justify-content: center;
  margin-top: 45px;
  padding: 10px 5px;
`;

const BookmarkTitle = styled.span``;

const array = [
  {
    name: "dudwns1",
    title: "방금 독서실에서 공부하는데 옆자리 사람이 음료수 주셨는데 이거 시그널인가요?",
    date: "1분 전",
    star: "",
  },
  {
    name: "wndus814",
    title: "현직 개발자 취업 꿀팁 알려드립니다...",
    date: "5분 전",
    star: "",
  },
  {
    name: "qkrtnqls1213",
    title: "단어 앱 만들었는데 한번씩 사용해보시고 피드백 부탁드립니다!!",
    date: "10분 전",
    star: "",
  },
  {
    name: "dudwns1",
    title: "자바스크립트 깊게 공부 해보고 싶은데 참고 할만한 전공책 추천좀 해주시면 감사합니다 :)",
    date: "20분 전",
    star: "",
  },
  {
    name: "dudwns1",
    title: "이번에 프로젝트 하나 제작하려고 하는데 함께 하실 백엔드 한 분 구합니다!",
    date: "1시간 전",
    star: "",
  },
  {
    name: "dudwns1",
    title: "제목",
    date: "1시간 전",
    star: "",
  },
  {
    name: "dudwns1",
    title: "제목",
    date: "2시간 전",
    star: "",
  },
  {
    name: "dudwns1",
    title: "제목",
    date: "3시간  전",
    star: "",
  },
  {
    name: "dudwns1",
    title: "제목",
    date: "4시간 전",
    star: "",
  },
];

function Home() {
  const [customersDate, setCustomersDate] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await (await fetch(`/api/customers`)).json();
      setCustomersDate(data);
    })();
  }, []);
  console.log(customersDate);

  return (
    <Wrapper>
      <BorderContent>
        <BoardMenu>
          <div>
            <RecentBtn>최근 순</RecentBtn>
            <RecommendBtn>추천 순</RecommendBtn>
          </div>

          <SearchForm>
            <SearchInput type="text" placeholder="검색 할 내용을 입력하세요."></SearchInput>
          </SearchForm>
          <div>
            <WriteBtn>글 쓰기</WriteBtn>
            <ListBtn>목록</ListBtn>
          </div>
        </BoardMenu>
        <Board>
          {array.map((item, index) => (
            <BoardList key={index}>
              <BoardName>{item.name}</BoardName>
              <BoardContent>{item.title}</BoardContent>
              <BoardDate>{item.date}</BoardDate>
            </BoardList>
          ))}
        </Board>
        <PageNumbers>
          <PageNumber>1</PageNumber>
          <PageNumber>2</PageNumber>
          <PageNumber>3</PageNumber>
          <PageNumber>4</PageNumber>
          <PageNumber>5</PageNumber>
        </PageNumbers>
      </BorderContent>
      <Bookmark>
        <BookmarkTitle>즐겨찾기 게시판</BookmarkTitle>
      </Bookmark>
    </Wrapper>
  );
}
export default Home;

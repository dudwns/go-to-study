import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Board from "./Routes/Board";
import BoardDetail from "./Routes/BoardDetail";
import BoardUpdate from "./Routes/BoardUpdate";
import BoardWrite from "./Routes/BoardWrite";
import Home from "./Routes/Home";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import MyPage from "./Routes/MyPage";
import ToDoList from "./Routes/ToDoList";
import { darkTheme, lightTheme } from "./theme";
import { isDarkAtom } from "./atoms";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";

function App() {
  const isDark = useRecoilValue(isDarkAtom); //atoms 연결하고 값을 받아옴
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/board/:page"} element={<Board />} />
          <Route path={"/join"} element={<Join />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/mypage/:id"} element={<MyPage />} />
          <Route path={"/board/write"} element={<BoardWrite />} />
          <Route path={"/board/detail/:id"} element={<BoardDetail />} />
          <Route path={"/board/:id/update"} element={<BoardUpdate />} />
          <Route path={"/todo"} element={<ToDoList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

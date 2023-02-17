import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Board from "./Routes/Board";

import BoardSelect from "./Routes/BoardSelect";
import BoardUpdate from "./Routes/BoardUpdate";
import BoardWrite from "./Routes/BoardWrite";
import Home from "./Routes/Home";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import MyPage from "./Routes/MyPage";
import Stopwatch from "./Routes/Stopwatch";
import ToDoList from "./Routes/ToDoList";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/board/:page"} element={<Board />} />
          <Route path={"/join"} element={<Join />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/mypage/:id"} element={<MyPage />} />
          <Route path={"/board/write"} element={<BoardWrite />} />
          <Route path={"/board/select/:id"} element={<BoardSelect />} />
          <Route path={"/board/:id/update"} element={<BoardUpdate />} />
          <Route path={"/todo"} element={<ToDoList />} />
          <Route path={"/stopwatch"} element={<Stopwatch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

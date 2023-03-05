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
import { ThemeProvider, createGlobalStyle } from "styled-components";

interface IStyleProp {
  isDark: boolean;
}

const GlobalStyle = createGlobalStyle<IStyleProp>`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  background-color: ${(props) => props.theme.bgColor}
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
  transition: background-color 0.1s linear;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.2;
}
a{
  text-decoration:none;
  color:black;
}

input:focus{
      outline: none;
}
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom); //atoms 연결하고 값을 받아옴
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle isDark />
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

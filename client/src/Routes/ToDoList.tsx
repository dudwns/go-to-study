import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > div > h2 {
    position: absolute;
    left: 0;
    top: -50px;
    width: 400px;
    text-align: center;
  }
`;

const Doing = styled(motion.div)`
  display: flex;
  border: 1px solid black;
  width: 400px;
  height: 600px;
  border-radius: 70px;
  padding: 30px;
  position: relative;
`;

const Todo = styled(motion.div)`
  display: flex;
  border: 1px solid black;
  width: 400px;
  height: 600px;
  border-radius: 70px;
  padding: 30px;
  position: relative;
`;

const Done = styled(motion.div)`
  display: flex;
  border: 1px solid black;
  width: 400px;
  height: 600px;
  border-radius: 70px;
  padding: 30px;
  position: relative;
`;

function ToDoList() {
  return (
    <Wrapper>
      <Container>
        <Doing>
          <h2>진행하기</h2>
        </Doing>
        <Todo>
          <h2>진행중</h2>
        </Todo>
        <Done>
          <h2>끝내기</h2>
        </Done>
      </Container>
    </Wrapper>
  );
}
export default ToDoList;

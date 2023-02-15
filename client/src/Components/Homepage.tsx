import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const Content = styled.div`
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text1 = styled(motion.div)`
  font-size: 70px;
`;
const Text2 = styled(motion.div)`
  font-size: 50px;
  margin-bottom: 100px;
`;

const CircleContent = styled(motion.div)`
  display: flex;
  width: 1400px;
  height: 500px;
  justify-content: space-around;
  opacity: 0;
`;

const Circle1 = styled(motion.div)`
  width: 300px;
  height: 300px;
  padding: 40px;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 150px;
  border: none;
  background-color: whitesmoke;
  & > img {
    position: absolute;
    width: 300px;
  }
`;
const Circle2 = styled(motion.div)`
  width: 300px;
  height: 300px;
  padding: 40px;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 150px;
  border: none;
  background-color: whitesmoke;
  & > img {
    position: absolute;
    width: 300px;
  }
`;

const Circle3 = styled(motion.div)`
  width: 300px;
  height: 300px;
  padding: 40px;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 150px;
  border: none;
  background-color: whitesmoke;
  & > img {
    position: absolute;
    width: 300px;
  }
`;

const opacityAnimation = keyframes`
from{
opacity:0;
}
to{
  opacity:1;
}
`;

const Character = styled(motion.img)`
  width: 200px;
  position: absolute;
  top: 100px;
  right: 100px;
  animation: ${opacityAnimation} 2s;
`;

const ScrollBtn = styled(motion.button)`
  position: absolute;
  width: 50px;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: inherit;
  border: none;
`;
const ScrollSvg = styled(motion.svg)`
  width: 10px;
  fill: black;
`;

const AngleSvg = styled(motion.svg)`
  width: 10px;
`;

const textVariants = {
  normal: { scale: 0 },
  active: {
    scale: 1,
    transition: { duration: 1, type: "spring" },
  },
};

const circleContentVariants = {
  normal: {},
  active: { transition: { duration: 1 }, opacity: 1 },
};

const circleVariants = {
  normal: {
    x: 0,
    y: 0,
  },
  active: {
    y: [0, 50, 0],

    transition: {
      repeat: Infinity,
      duration: 3,
      type: "spring",
    },
  },
};

const characterVariants = {
  normal: { rotate: -15 },
  active: {
    transition: { repeat: Infinity, duration: 1, type: "tween" },
    rotate: [-15, 15, -15],
  },
};

function Homepage() {
  return (
    <Wrapper>
      <Content>
        <Text1 variants={textVariants} initial="normal" animate="active">
          Go to Study!
        </Text1>
        <Text2 variants={textVariants} initial="normal" animate="active">
          고투스에 오신것을 환영합니다!
        </Text2>
        <CircleContent variants={circleContentVariants} initial="normal" animate="active">
          <Circle1 variants={circleVariants} initial="normal" animate="active">
            <img src="/images/circle.png" alt="" />
            혼자 공부하면 외롭고 지치지 않으신가요?
            <br />
            <br /> 고투스 커뮤니티를 이용하여 정보를 공유하고 사람들과 함께 공부해보세요!
          </Circle1>

          <Circle2 variants={circleVariants} initial="normal" animate="active">
            <img src="/images/circle.png" alt="" />
            계획을 세우고 일정을 정리하고 싶은데 메모할 곳이 없으신가요?
            <br />
            <br /> 고투스에서 일정을 세워보고 정리해보세요!
          </Circle2>
          <Circle3 variants={circleVariants} initial="normal" animate="active">
            <img src="/images/circle.png" alt="" />
            매일 집중이 안되고 시간만 흘러가서 공부의 효율이 떨어지시나요?
            <br />
            <br /> 매일 공부 시간을 기록하고 목표 시간을 달성해보세요!
          </Circle3>
        </CircleContent>
      </Content>
      {/* <Character
        variants={characterVariants}
        animate="active"
        src="/images/character.png"
      ></Character> */}
      <ScrollBtn>
        <div>
          <ScrollSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M0 192H176V0H160C71.6 0 0 71.6 0 160v32zm0 32V352c0 88.4 71.6 160 160 160h64c88.4 0 160-71.6 160-160V224H192 0zm384-32V160C384 71.6 312.4 0 224 0H208V192H384z" />
          </ScrollSvg>
        </div>
        <AngleSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M214.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7 329.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 210.7 329.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z" />
        </AngleSvg>
        <span>scroll</span>
      </ScrollBtn>
    </Wrapper>
  );
}
export default Homepage;

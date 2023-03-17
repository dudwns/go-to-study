import styled, { keyframes } from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const IntroDiv = styled(motion.div)`
  border: 1px solid ${(props) => props.theme.introColor};
  color: ${(props) => props.theme.textColor};
  position: absolute;
  left: 50%;
  font-size: 2.6vw;
  top: 50%;
  overflow: hidden;
  width: 0;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
`;

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 0;
  min-height: 600px;
`;

const Content = styled(motion.div)`
  padding-top: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text1 = styled(motion.div)`
  color: ${(props) => props.theme.textColor};
  font-size: 4vw;
  opacity: 0;
  position: absolute;
  top: 15%;
  left: 30%;
  transform: translateX(-50%) translateY(-50%);
`;
const Text2 = styled(motion.div)`
  color: ${(props) => props.theme.textColor};
  font-size: 2vw;
  opacity: 0;
  position: absolute;
  top: 26%;
  left: 30%;
  transform: translateX(-50%) translateY(-50%);
`;

const CircleContent = styled(motion.div)`
  display: flex;
  width: 75%;
  justify-content: space-around;
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translateX(-50%) translateY(-50%);
`;

const OneCircle = styled(motion.div)`
  width: 300px;
  height: 300px;
  padding: 40px;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 150px;
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
  & > img {
    position: absolute;
    width: 300px;

    @media screen and (max-height: 600px) {
      width: 200px;
      height: 200px;
    }
  }
  @media screen and (min-width: 860px) {
    display: none;
  }

  @media screen and (max-height: 600px) {
    width: 200px;
    height: 200px;
    font-size: 10px;
  }
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

  @media screen and (max-width: 1400px) {
    width: 200px;
    height: 200px;
    font-size: 10px;
  }
  @media screen and (max-height: 600px) {
    width: 200px;
    height: 200px;
    font-size: 10px;
  }
  @media screen and (max-width: 859px) {
    display: none;
  }
  & > img {
    position: absolute;
    width: 300px;

    @media screen and (max-width: 1400px) {
      width: 200px;
    }
    @media screen and (max-height: 600px) {
      width: 200px;
    }
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

  @media screen and (max-width: 1400px) {
    width: 200px;
    height: 200px;
    font-size: 10px;
  }
  @media screen and (max-width: 859px) {
    display: none;
  }
  @media screen and (max-height: 600px) {
    width: 200px;
    height: 200px;
    font-size: 10px;
  }

  & > img {
    position: absolute;
    width: 300px;
    @media screen and (max-width: 1400px) {
      width: 200px;
    }
    @media screen and (max-height: 600px) {
      width: 200px;
    }
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

  @media screen and (max-width: 1400px) {
    width: 200px;
    height: 200px;
    font-size: 10px;
  }
  @media screen and (max-width: 859px) {
    display: none;
  }

  @media screen and (max-height: 600px) {
    width: 200px;
    height: 200px;
    font-size: 10px;
  }

  & > img {
    position: absolute;
    width: 300px;
    @media screen and (max-width: 1400px) {
      width: 200px;
    }

    @media screen and (max-height: 600px) {
      width: 200px;
    }
  }
`;

const ScrollBtn = styled(motion.button)`
  position: absolute;
  width: 50px;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: inherit;
  border: none;
  font-size: 11px;
  color: ${(props) => props.theme.textColor};
  @media screen and (max-width: 1400px) {
    font-size: 11px;
  }
  @media screen and (max-height: 650px) {
    display: none;
  }
`;
const ScrollSvg = styled(motion.svg)`
  width: 9px;
  fill: ${(props) => props.theme.textColor};

  @media screen and (max-width: 1400px) {
    width: 8px;
  }
`;

const AngleSvg = styled(motion.svg)`
  width: 9px;
  fill: ${(props) => props.theme.textColor};
  display: block;
  margin: 0 auto;
  @media screen and (max-width: 1400px) {
    width: 8px;
  }
`;

const introduce = "고투스에 오신것을 환영합니다!";

function Homepage() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const introAni = useAnimation();
  const wrapAni = useAnimation();
  const titleAni = useAnimation();
  const textAni = useAnimation();
  const contentAni = useAnimation();
  const circleAni = useAnimation();

  useEffect(() => {
    let interval: any;
    const divBoxAni = async () => {
      await introAni.start({
        width: window.innerWidth > 1000 ? "50%" : window.innerWidth > 700 ? "70%" : "90%",
        transition: { duration: 0.5, type: "linear" },
      });
      await introAni.start({ height: "16vw", transition: { duration: 0.3, type: "linear" } });
      setText((prev) => prev + introduce[count]);
      setCount((prev) => prev + 1);
    };

    if (count == 0) {
      divBoxAni();
    } else {
      interval = setInterval(() => {
        setText((prev) => prev + introduce[count]);
        setCount((prev) => prev + 1);
      }, 100);
    }

    if (text.length === introduce.length) {
      clearInterval(interval);
      introAni.start({ height: "0px", transition: { delay: 1 } }).then(() =>
        introAni
          .start({ width: "0px", transition: { type: "linear" } })
          .then(() => introAni.start({ display: "none" }))
          .then(() =>
            circleAni.start({
              opacity: 1,
              top: "55%",
              transition: { duration: 0.5 },
            })
          )
      );
    }

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    wrapAni
      .start({ opacity: 1, y: 0 })
      .then(() =>
        titleAni.start({
          left: "50%",
          opacity: 1,
          transition: { duration: 0.5, type: "spring" },
        })
      )
      .then(() =>
        textAni.start({
          left: "50%",
          opacity: 1,
          transition: { duration: 0.5, type: "spring" },
        })
      );
  });

  return (
    <>
      <IntroDiv animate={introAni}>{text}</IntroDiv>
      <Wrapper animate={wrapAni}>
        <Content>
          <Text1 animate={titleAni}>Go to Study!</Text1>
          <Text2 animate={textAni}>고투스에 오신것을 환영합니다!</Text2>
          <CircleContent animate={circleAni}>
            <OneCircle>
              <img src="/images/circle.png" />
              고투스 커뮤니티를 이용하여 정보를 공유하고 사람들과 함께 공부해보세요!
            </OneCircle>
            <Circle1>
              <img src="/images/circle.png" alt="" />
              혼자 공부하면 외롭고 지치지 않으신가요?
              <br />
              <br /> 고투스 커뮤니티를 이용하여 정보를 공유하고 사람들과 함께 공부해보세요!
            </Circle1>

            <Circle2>
              <img src="/images/circle.png" alt="" />
              계획을 세우고 일정을 정리하고 싶은데 메모할 곳이 없으신가요?
              <br />
              <br /> 고투스에서 일정을 세워보고 정리해보세요!
            </Circle2>
            <Circle3>
              <img src="/images/circle.png" alt="" />
              매일 집중이 안되고 시간만 흘러가서 공부의 효율이 떨어지시나요?
              <br />
              <br /> 매일 공부 시간을 기록하고 목표 시간을 달성해보세요!
            </Circle3>
          </CircleContent>
        </Content>
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
    </>
  );
}
export default Homepage;

import styled from "styled-components";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel, Keyboard } from "swiper";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;

  padding-left: 12%;
  padding-right: 12%;

  .swiper {
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
      width: 100%;
    }
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    right: 0;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: black;
  }

  .swiper-button-disabled {
    display: none;
  }
`;

const SwiperContent = styled.div`
  display: flex;

  align-items: center;
  width: 90%;
`;

const Title = styled.div`
  font-size: 3vw;
  margin-bottom: 3vh;
  font-weight: 800;
  text-align: left;
`;

const Description = styled.div`
  margin-left: 5vw;
  min-width: 270px;
  height: 150px;
  text-align: left;
  /* font-size: 1.2vw; */
  font-size: 21px;
  line-height: 1.3;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1300px) {
    font-size: 18px;
  }

  @media screen and (max-width: 800px) {
    font-size: 15px;
  }
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

function Content() {
  return (
    <Wrapper>
      <Swiper
        cssMode={true}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <SwiperContent>
            <div>
              <Title>커뮤니티</Title>
              <img src="/images/data1.png"></img>
            </div>
            <Description>
              고투스 커뮤니티를 이용하여
              <br />
              사람들과 정보를 공유하고
              <br />
              함께 공부해보세요.
            </Description>
          </SwiperContent>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperContent>
            <div>
              <Title>즐겨찾기</Title>
              <img src="/images/data2.png"></img>
            </div>
            <Description>
              커뮤니티를 이용하다가
              <br />
              마음에 드는 글이 있으면
              <br />
              즐겨찾기에 추가해보세요.
            </Description>
          </SwiperContent>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperContent>
            <div>
              <Title>다크모드 지원</Title>
              <img src="/images/data3.png"></img>
            </div>
            <Description>
              다크모드로 변경하여
              <br /> 눈의 피로도를 낮춰보세요.
            </Description>
          </SwiperContent>
        </SwiperSlide>
      </Swiper>
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
export default Content;

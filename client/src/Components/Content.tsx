import styled from "styled-components";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel, Keyboard } from "swiper";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 1000px) {
    margin-top: 30px;
  }
  .swiper {
    min-height: 600px;
    width: 95% !important;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    & img {
      width: 900px;
      margin-right: 50px;
      border: 1px solid gray;

      @media screen and (max-width: 1500px) {
        width: 700px;
      }
      @media screen and (max-height: 800px) {
        width: 600px;
      }
      @media screen and (max-width: 1220px) {
        width: 600px;
        margin-right: 40px;
      }
      @media screen and (max-width: 1120px) {
        width: 500px;
        margin-right: 30px;
      }
      @media screen and (max-width: 1000px) {
        margin-right: 0;
      }
      @media screen and (max-width: 820px) {
        width: 400px;
      }
      @media screen and (max-width: 620px) {
        width: 350px;
      }
      @media screen and (max-width: 520px) {
        width: 350px;
      }
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
    color: ${(props) => props.theme.textColor};
  }

  .swiper-button-disabled {
  }
`;

const SwiperContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: 800;
  text-align: left;

  @media screen and (max-width: 1400px) {
    font-size: 35px;
  }

  @media screen and (max-width: 1000px) {
    text-align: center;
  }
`;

const Description = styled.div`
  height: 150px;
  text-align: left;
  /* font-size: 1.2vw; */
  font-size: 17px;
  line-height: 1.3;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  @media screen and (max-width: 1300px) {
    font-size: 15px;
  }

  @media screen and (max-width: 1000px) {
    font-size: 11px;
    margin-top: 20px;
    align-items: flex-start;
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
              <Title>커뮤니케이션</Title>
              <img src="/images/data1.png"></img>
            </div>
            <Description>
              고투스 커뮤니티를 이용하여
              <br />
              사람들과 정보를 공유하고 함께 공부해보세요.
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
              커뮤니티를 이용하다가 마음에 드는
              <br />
              글이 있으면 즐겨찾기에 추가해보세요.
            </Description>
          </SwiperContent>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperContent>
            <div>
              <Title>테마 선택</Title>
              <img src="/images/data3.png"></img>
            </div>
            <Description>
              다크모드로 변경하여
              <br />
              눈의 피로도를 낮춰보세요.
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

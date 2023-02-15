import styled from "styled-components";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel, Keyboard } from "swiper";

const Wrapper = styled.div`
  width: 1500px;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  .swiper {
    width: 100%;
  }
  .swiper-slide {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & img {
      width: 1000px;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: black;
  }

  .swiper-button-disabled {
    display: none;
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
          <div>타이틀</div>
          <img src="/images/example.png"></img>
          <div>설명</div>
        </SwiperSlide>
        <SwiperSlide>
          <div>타이틀</div>
          <img src="/images/example.png"></img>
          <div>설명</div>
        </SwiperSlide>
        <SwiperSlide>
          <div>타이틀</div>
          <img src="/images/example.png"></img>
          <div>설명</div>
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

import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom, loginAtom, userAtom } from "../atoms";
import { motion, useAnimation } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Homepage from "../Components/Homepage";
import Content from "../Components/Content";

const Wrapper = styled(motion.div)`
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: rgba(255, 255, 255, 1);
  &::after {
    width: 100%;
    height: 100%;
    content: "";
    background-image: //linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
      url(${process.env.PUBLIC_URL + "/images/background2.jpg"});
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.7;
  }

  .swiper {
    width: 100%;
    height: 100vh;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    /* Center slide text vertically */
    display: flex;
  }

  .swiper-pagination {
    position: absolute;
    top: -75px;
    transform: translateY(-50%);
  }
  .swiper-pagination-bullet {
    width: 200px;
    min-height: 30px;
    background: transparent;
    opacity: 1;
    height: 150px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    border-radius: 0;
    margin: 0 !important;
    border-bottom: 1px solid gray;
    display: flex !important;
    align-items: center;
    justify-content: center;
    border-left: 4px solid gray;
  }
  .swiper-pagination-bullet:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .swiper-pagination-bullet-active {
    font-weight: 600;
    border-left: 4px solid yellow;
  }

  .swiper-pagination-bullet-active:before {
    content: "";
    display: block;
    position: absolute;
    transition: all 0.5 ease-in-out;
  }
`;
export interface IDark {
  isDark: boolean;
}

const SideBar = styled(motion.div)<IDark>`
  width: 200px;
  position: fixed;
  display: flex;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  top: 50px;
  height: 400px;
  left: -200px;
  z-index: 3;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    display: none;
  }

  @media screen and (max-height: 650px) {
    display: none;
  }
  & > div:nth-child(1) {
    border-bottom: 1px solid gray;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  & > div:nth-child(2) {
    border-bottom: 1px solid gray;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SideBarBtn = styled(motion.button)<IDark>`
  background-color: ${(props) => (props.isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.6)")};
  border: none;
  border-left: 1px solid gray;
  position: absolute;
  top: 0;
  width: 45px;
  height: 45px;
  right: -45px;
  display: none;
  cursor: pointer;
  & > svg {
    width: 12px;
    fill: white;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

const PagiDiv = styled(motion.div)`
  position: absolute;
  top: 325px;
  left: 7px;
  width: 100%;
  @media screen and (max-height: 600px) {
    top: 300px;
  }
`;

//---------------------------------------------------------------Variants
const wrapVariants = {
  active: (isDark: boolean) => ({
    // backgroundColor: isDark ? "rgba(53, 54, 58, 1)" : "rgba(220, 216, 214, 1)",
    backgroundColor: isDark ? "rgb(53, 54, 58)" : "rgba(255, 255, 255, 0)",
    transition: { duration: 0.1 },
  }),
};

const sideBarVariants = {
  normal: {
    left: "-200px",
  },
  open: {
    left: 0,
    transition: { duration: 0.5, type: "tween" },
  },
  close: {
    left: "-200px",
    transition: { duration: 0.5, type: "tween" },
  },
};

const menuList = ["메인 화면", "컨텐츠 소개"];

function Home() {
  const [sideOpen, setSideOpen] = useState(false); // 사이드 메뉴 유무를 나타내는 boolean 값
  const [isDark, setisDark] = useRecoilState(isDarkAtom);
  const sideAni = useAnimation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSideOpen(true);
    }, 4000);

    sideAni.start({ display: "block", transition: { delay: 4, duration: 0.5 } });
  }, []);

  return (
    <Wrapper variants={wrapVariants} custom={isDark} animate="active">
      <SideBar
        isDark={isDark}
        variants={sideBarVariants}
        initial="normal"
        animate={sideOpen ? "open" : "close"}
      >
        <div>고투스</div>
        <SideBarBtn isDark onClick={() => setSideOpen((current) => !current)} animate={sideAni}>
          {sideOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          )}
        </SideBarBtn>
        <PagiDiv>
          <div className="swiper-pagination"></div>
        </PagiDiv>
      </SideBar>

      <Swiper
        direction={"vertical"}
        speed={600}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + menuList[index] + "</span>";
          },
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Homepage />
        </SwiperSlide>
        <SwiperSlide>
          <Content />
        </SwiperSlide>
      </Swiper>
    </Wrapper>
  );
}
export default Home;

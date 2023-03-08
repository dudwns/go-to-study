import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 0;
`;

function Stack() {
  return (
    <>
      <Wrapper>gdgd</Wrapper>
    </>
  );
}

export default Stack;

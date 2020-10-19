import styled from "styled-components"

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-around;
  height: 78px;
  align-items: center;
  
  & > div {
    max-width: 1080px;
    
    @media screen and (min-width: 1100px) {
      width: 1080px;
    }
  }
  
  img {
    height: 60px;
  }
`;

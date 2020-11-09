import styled from "styled-components";
import Banner from "@components/Banner";

export const Wrapper = styled.main`
  padding-bottom: 30px;
`

export const NewBountyBanner = styled(Banner)`
  display: flex;
  align-items: center;
  
  & > section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media screen and (min-width: 1140px) {
      width: 1128px;
      margin: 0 auto;
    }
    
    @media screen and (max-width: 1140px) {
      width: 100%;
    }
  }
`

export const Note = styled.section`
  display: flex;
  flex-direction: column;
  text-align: right;
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.72);
  }
`

export const Options = styled.ul`
  display: flex;
  li {
    font-size: 14px;
    color: rgba(29, 37, 60, 0.64);
    line-height: 76px;
    cursor: pointer;
    &.active {
      color: #1D253C;
    }
    
    &:not(:first-of-type) {
      margin-left: 30px;
    }
  }
`

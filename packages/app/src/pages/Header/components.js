import styled from "styled-components"

export const Wrapper = styled.header`
  display: flex;
  min-height: 76px;
  align-items: center;
  padding: 0 24px;
  gap: 32px;
  
  img {
    min-width: 117.19px;
    height: 30px;
    cursor: pointer;
  }
`;

export const RightWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
`
export const NavWrapper = styled.div`
  & > a {
    display: inline-block;
    cursor: pointer;
    margin-right: 32px;
    &:hover {
      color: #04D2C5;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`

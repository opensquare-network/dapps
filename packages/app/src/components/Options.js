import styled from "styled-components";

const Options = styled.ul`
  display: flex;
  margin-top: 26px;
  
  li {
    font-size: 14px;
    color: rgba(29, 37, 60, 0.64);
    line-height: 24px;
    cursor: pointer;
    &.active {
      color: #1D253C;
    }
    
    &:not(:first-of-type) {
      margin-left: 30px;
    }
  }
`

export default Options

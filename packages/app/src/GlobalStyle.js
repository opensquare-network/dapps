import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }
  
  body {
    margin: 0;
  }
  
  #root {
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle

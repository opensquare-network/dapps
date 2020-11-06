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
  
  .ui.primary.button, .ui.primary.buttons .button {
    background: #04D2C5;
    
    &:hover, &:active, &:focus {
      background: #04D2C5;
    }
  }
  
  .ui.input.focus>input, .ui.input>input:focus {
    border-color: #04D2C5;
  }
`;

export default GlobalStyle

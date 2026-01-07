import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #FFB7B2;   /* Pastel Red/Pink */
    --secondary: #B5EAD7; /* Pastel Green */
    --accent: #C7CEEA;    /* Pastel Purple */
    --text: #4A4A4A;      /* Soft Black */
    --bg: #FDFCF5;        /* Creamy Background */
    --card-bg: #FFFFFF;
    --shadow: 0 10px 20px rgba(0,0,0,0.05);
    --radius: 24px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Nunito', 'Noto Sans KR', sans-serif;
    background-color: var(--bg);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    body {
        font-family: 'Inter', sans-serif;
        overflow: visible;
        --primary: ${(props) => props.theme.colors.main};
        --text: ${(props) => props.theme.colors.lightTheme.text};
        --text-white: ${(props) => props.theme.colors.lightTheme.textwhite};
        --text-highlight: ${(props) =>
          props.theme.colors.lightTheme.textHighlight};
        --background: ${(props) => props.theme.colors.lightTheme.background};
        --secondaryBackground: ${(props) =>
          props.theme.colors.lightTheme.secondaryBackground};
        --border-radius: 0.3rem;
        background-color: var(--background);
    }
    a {
        text-decoration: none;
    }
`;

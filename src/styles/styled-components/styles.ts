import { css } from "styled-components";

const metallicTheme = css`
  background-image: conic-gradient(
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6,
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6,
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6,
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6
  );

  box-shadow: inset #919191 0 0px 2px -1px, inset hsl(0deg 0% 15% / 80%) 0 -1px 5px 4px, inset #b6b4c5 0 0px 28px 6px;
  border: 1px solid #a1a1a1;
  text-shadow: hsla(0, 0%, 40%, 0.5) 0 -1px 0, hsla(0, 0%, 100%, 0.6) 0 2px 1px;
`;

const buttonStyles = css`
  padding: 12px 40px;
  max-width: 220px;
  border-radius: 8px;
  color: black;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 5px 6px 3px 1px #0000001f;
`;

export { metallicTheme, buttonStyles };

import { css } from "styled-components";

const noTextHiglightStyles = css`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
`;

const defaultScrollBarStyles = css`
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 12px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export { noTextHiglightStyles, defaultScrollBarStyles };

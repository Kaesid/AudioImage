import styled, { css } from "styled-components";

const TrackData = styled.div`
  cursor: pointer;

  ${(props: { readonly $isActive?: boolean }) =>
    props.$isActive &&
    css`
      cursor: default;
      color: red;
    `}
`;

export { TrackData };

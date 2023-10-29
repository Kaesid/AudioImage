import styled from "styled-components";
import { headerHeight } from "../../../constants/styled-components";

const VisualPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${headerHeight});
  position: relative;
`;

const PlayButton = styled.button`
  position: absolute;
  top: 300px;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #248ae3;
`;
export { VisualPage, PlayButton };

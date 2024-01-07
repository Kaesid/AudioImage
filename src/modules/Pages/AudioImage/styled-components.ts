import styled from "styled-components";
import { headerHeight } from "../../../constants/styled-components";

const VisualPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${headerHeight});
  position: relative;

  #canvas {
    background: #1a0d27;
  }
`;

const Loader = styled.div`
  color: white;
`;

export { VisualPage, Loader };

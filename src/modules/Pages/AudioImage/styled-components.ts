import styled from "styled-components";
import { headerHeight } from "../../../constants/styled-components";

const VisualPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${headerHeight});
`;
export { VisualPage };

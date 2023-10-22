import styled from "styled-components";
import { GradientTitle } from "../../../styles/styled-components/basic";
import { buttonStyles } from "../../../styles/styled-components/styles";

const HomeTitle = styled(GradientTitle)`
  margin-bottom: 15px;
`;

const RedirectButton = styled.button`
  ${buttonStyles}
  background-image: linear-gradient(158deg, rgb(110 104 203) 0%, rgb(80 80 151) 68%, rgb(173 122 197) 100%);
  color: white;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export { HomeTitle, RedirectButton, ButtonWrap };

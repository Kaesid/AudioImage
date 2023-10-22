import styled from "styled-components";
import { backgroundImage } from "../../assets/images";
import { headerHeight } from "../../constants/styled-components";

const PageSizeImageWrap = styled.div`
  height: 70vh;

  img {
    object-fit: contain;
    width: 100%;
    max-height: 100%;
  }
`;

const BasicTitle = styled.p`
  max-width: 80%;
  padding: 15px 0;
  margin: 0 auto 15px;
  text-align: center;
  font-size: calc(32px + 1vw);
  font-weight: bold;
`;

const BasicText = styled.p`
  font-size: min(calc(16px + 0.5vw), 21px);
  line-height: 25px;
  margin-bottom: 10px;
`;

const GradientTitle = styled(BasicTitle)`
  background: -webkit-linear-gradient(#43bd9d, #264fab);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DefaultOnePager = styled.div`
  background-color: #e7e7cb;
  height: calc(100vh - ${headerHeight});
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

export { PageSizeImageWrap, BasicTitle, GradientTitle, DefaultOnePager, BasicText };

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
  background: linear-gradient(#ca2ff6, #8aa4df);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DefaultOnePager = styled.div`
  background-color: #6674e1;
  height: calc(100vh - ${headerHeight});
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

const CaptionTextWrap = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 40px max(10%, 20px);
  background-color: #7e42e5c2;
  color: white;
  border-radius: 16px;
`;

export { PageSizeImageWrap, BasicTitle, GradientTitle, DefaultOnePager, BasicText, CaptionTextWrap };

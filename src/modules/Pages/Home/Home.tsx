import { useNavigate } from "react-router-dom";
import { DefaultOnePager, GradientTitle, PageSizeImageWrap } from "../../../styles/styled-components/basic";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { redirectToCanvasActionName } from "./constants";
import { canvasImage } from "../../../assets/images";
import { ButtonWrap, RedirectButton } from "./styled-components";
import { appName, Messages } from "../../../constants/text";
import { getIsSessionActive } from "../../../redux/slice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const redirectWithSagaJustForFun = () => dispatch({ type: redirectToCanvasActionName, navigate });
  const isSessionActive = useAppSelector(getIsSessionActive);

  return (
    <DefaultOnePager>
      <GradientTitle>{appName}</GradientTitle>
      <ButtonWrap>
        <RedirectButton onClick={redirectWithSagaJustForFun}>
          {isSessionActive ? Messages.HOME__BUTTON_TEXT_ACTIVE : Messages.HOME__BUTTON_TEXT}
        </RedirectButton>
      </ButtonWrap>
      <PageSizeImageWrap>
        <img src={canvasImage} alt="canvas" />
      </PageSizeImageWrap>
    </DefaultOnePager>
  );
};

export default Home;

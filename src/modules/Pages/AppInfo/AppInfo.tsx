import { appName, Messages } from "../../../constants/text";
import { BasicText, CaptionTextWrap, DefaultOnePager, GradientTitle } from "../../../styles/styled-components/basic";

const AppInfo = () => {
  return (
    <DefaultOnePager>
      <GradientTitle>{appName}</GradientTitle>
      <CaptionTextWrap>
        <BasicText>{Messages.ABOUT__FIRST_BLOCK}</BasicText>
        <BasicText>{Messages.ABOUT__SECOND_BLOCK}</BasicText>
        <BasicText>{Messages.ABOUT__THIRD_BLOCK}</BasicText>
        <BasicText>{Messages.ABOUT__PARTING_WORDS}</BasicText>
      </CaptionTextWrap>
    </DefaultOnePager>
  );
};

export default AppInfo;

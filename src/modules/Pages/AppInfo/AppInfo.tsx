import { appName, Messages } from "../../../constants/text";
import { BasicText, DefaultOnePager, GradientTitle } from "../../../styles/styled-components/basic";
import { AboutTextWrap } from "./styled-components";

const AppInfo = () => {
  return (
    <DefaultOnePager>
      <GradientTitle>{appName}</GradientTitle>
      <AboutTextWrap>
        <BasicText>{Messages.ABOUT__FIRST_BLOCK}</BasicText>
        <BasicText>{Messages.ABOUT__SECOND_BLOCK}</BasicText>
        <BasicText>{Messages.ABOUT__THIRD_BLOCK}</BasicText>
        <BasicText>{Messages.ABOUT__PARTING_WORDS}</BasicText>
      </AboutTextWrap>
    </DefaultOnePager>
  );
};

export default AppInfo;

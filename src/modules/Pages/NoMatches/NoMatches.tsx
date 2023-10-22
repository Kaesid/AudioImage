import { noMatchImage } from "../../../assets/images";
import { Messages } from "../../../constants/text";
import { PageSizeImageWrap } from "../../../styles/styled-components/basic";
import { NoMatchTitle } from "./styled-components";

const NoMatches = () => {
  return (
    <div>
      <NoMatchTitle>{Messages.WRONG_PAGE}</NoMatchTitle>
      <PageSizeImageWrap>
        <img src={noMatchImage} alt="bugs bunny" />
      </PageSizeImageWrap>
    </div>
  );
};

export default NoMatches;

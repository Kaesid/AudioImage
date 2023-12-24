import { Html } from "@react-three/drei";
import styled, { css } from "styled-components";
import { defaultScrollBarStyles } from "../../../../../styles/styled-components/helpers";

const HtmlWrap = styled(Html)``;

const trackListHeight = 300;

const TrackList = styled.div`
  position: absolute;
  right: 1px;
  bottom: 21px;
  transform: translate3d(50vw, 50vh, 0px);
  padding: 10px;
  background: white;
  max-height: ${trackListHeight + 20}px;
  width: min(350px, 100vw);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid purple;
  border-radius: 12px;

  #content {
    max-height: 170px;
    overflow-y: auto;
    ${defaultScrollBarStyles}
    margin-bottom: 10px;
  }
`;

const TrackListBox = styled.div`
  /* max-height: ${trackListHeight}px; */
  /* overflow-y: auto; */
`;

const TrackData = styled.div`
  cursor: pointer;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow-x: hidden;
  border: 1px solid purple;
  border-radius: 4px;
  padding: 5px;

  ${(props: { readonly $isActive?: boolean }) =>
    props.$isActive &&
    css`
      cursor: default;
      color: red;
    `}
`;

const AddTrack = styled.div`
  &:only-child {
    /* margin-left: auto; */
  }
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  gap: 8px;
  flex-grow: 1;
`;

const ControlPanelTime = styled.div`
  display: flex;
  gap: 4px;
`;

const ControlPanelButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
`;

const ControlTrackButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const InputLabel = styled.label`
  font-size: 29px;
  background-color: purple;
  color: white;
  display: flex;
  justify-content: center;
  align-items: baseline;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  box-shadow: 5px 6px 3px 1px #0000001f;

  cursor: pointer;
`;

const PlayButton = styled.button`
  padding: 8px 12px;
  min-width: 70px;
  border-radius: 6px;
  background-color: purple;
  color: white;
  box-shadow: 5px 6px 3px 1px #0000001f;
`;

const VolumeInput = styled.div`
  input[type="range"] {
    cursor: pointer;
    max-width: 80px;
  }
`;

const PlayerTopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 2px solid purple;
`;

const AppName = styled.p`
  font-size: 20px;
  height: 35px;
  background: linear-gradient(178deg, #b115d0, #18dfbd);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
`;

const TrackListTrigger = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    box-shadow: 5px 6px 3px 1px #0000001f;
    border-radius: 16px;
    padding: 5px 40px;
    background-image: linear-gradient(203deg, rgb(145 100 165) 0%, rgb(202 86 185) 68%, rgb(173 122 197) 100%);
    color: white;

    p {
    }

    svg {
      fill: white;
      width: 16px;
      height: 16px;
      object-fit: contain;
      transform: rotate(180deg);
    }

    ${(props: { $isOpen: boolean }) =>
      props.$isOpen &&
      css`
        & svg {
          transform: unset;
        }
      `}
  }
`;

export {
  TrackData,
  TrackList,
  TrackListBox,
  AddTrack,
  HtmlWrap,
  ControlPanel,
  HiddenInput,
  InputLabel,
  ControlPanelTime,
  ControlPanelButtons,
  PlayButton,
  ControlTrackButtons,
  VolumeInput,
  PlayerTopContent,
  AppName,
  TrackListTrigger,
};

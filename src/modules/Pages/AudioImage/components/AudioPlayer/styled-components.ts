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
  height: ${trackListHeight + 20}px;
  width: min(350px, 100vw);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid black;
  border-radius: 12px;
`;

const TrackListBox = styled.div`
  margin-bottom: 10px;
  height: ${trackListHeight}px;
  overflow-y: auto;
  ${defaultScrollBarStyles}
`;

const TrackData = styled.div`
  cursor: pointer;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow-x: hidden;
  border: 1px solid black;
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
    margin-left: auto;
  }
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  gap: 8px;
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
};

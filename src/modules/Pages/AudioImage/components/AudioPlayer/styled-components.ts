import { Html } from "@react-three/drei";
import styled, { css } from "styled-components";

const HtmlWrap = styled(Html)``;

const TrackList = styled.div`
  position: absolute;
  left: 80px;
  top: 200px;
  padding: 10px;
  background: white;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TrackListBox = styled.div`
  margin-bottom: 20px;
  max-height: 200px;
  overflow-y: auto;
`;

const TrackData = styled.div`
  cursor: pointer;
  max-width: 300px;
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
  display: flex;
  gap: 5px;
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  position: absolute;
  top: 300px;
  left: -150px;
  gap: 8px;
`;

const ControlPanelTime = styled.div`
  color: white;
  display: flex;
  gap: 4px;
`;

const ControlPanelButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const HiddenInput = styled.input`
  visibility: hidden;
`;

const InputLabel = styled.label`
  /* padding: 4px; */
  font-size: 35px;
  background-color: purple;
  color: white;
  display: flex;
  justify-content: center;
  align-items: baseline;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 5px 6px 3px 1px #0000001f;

  cursor: pointer;
`;

const PlayButton = styled.button`
  /* position: absolute; */
  /* top: 300px; */
  padding: 8px 12px;
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
};

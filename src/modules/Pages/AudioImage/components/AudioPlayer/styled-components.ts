import { Html } from "@react-three/drei";
import styled, { css } from "styled-components";

const HtmlWrap = styled(Html)``;

const TrackList = styled.div`
  position: absolute;
  left: 80px;
  top: 230px;
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
  padding-top: 5px;
  padding-bottom: 5px;
  max-width: 300px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  border: 1px solid black;

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
  justify-content: space-between;
  align-items: center;
  background: transparent;
  position: absolute;
  top: 300px;
  left: -150px;
  gap: 10px;
`;

export { TrackData, TrackList, TrackListBox, AddTrack, HtmlWrap, ControlPanel };

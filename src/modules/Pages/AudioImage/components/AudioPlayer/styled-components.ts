import styled, { css } from "styled-components";

const TrackList = styled.div`
  background: white;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TrackListBox = styled.div`
  margin-bottom: 20px;
`;

const TrackData = styled.div`
  cursor: pointer;
  padding-top: 5px;
  padding-bottom: 5px;

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

export { TrackData, TrackList, TrackListBox, AddTrack };

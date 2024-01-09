import { ChangeEvent } from "react";
import { HiddenInput, InputLabel } from "../styled-components";
import { UpdateTracks } from "../types";
import { IconPlus } from "../../../../../../assets/images/svgrepo";

const AddTrackButton = ({ updateTracks }: { updateTracks: UpdateTracks }) => {
  const addFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];

    if (files[0]) updateTracks(files[0]);
  };

  return (
    <div>
      <InputLabel htmlFor="audio">
        <IconPlus />
      </InputLabel>
      <HiddenInput id="audio" accept="audio/*" type="file" onChange={addFile} />
    </div>
  );
};

export default AddTrackButton;

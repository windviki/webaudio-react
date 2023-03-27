import React, { Fragment, useState } from "react";
import MicIcon from "@material-ui/icons/Mic";
import StopIcon from "@material-ui/icons/Stop";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";

const StyledFab = styled(Fab)`
  position: relative;
  background-color: ${props => (props.recording ? "#272727" : "#8f3934")};
  color: white;
  opacity: 1;
  margin: 12px;
  z-index: 3;
  transition: all 0.2s;
  :hover {
    background-color: ${props => (props.recording ? "#272727" : "#8f3934")};
    opacity: 0.9;
  }
`;

export default function RecordButton(props) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <Fragment>
      {isRecording ? (
        <Tooltip title="Stop Recording" aria-label="record" placement="right">
          <StyledFab
            onClick={() => {
              setIsRecording(false);
              props.onClick();
            }}
            color="secondary"
            aria-label="record"
          >
            <StopIcon />
          </StyledFab>
        </Tooltip>
      ) : (
        <Tooltip title="Start Recording" aria-label="record" placement="right">
          <StyledFab
            recording
            onClick={() => {
              setIsRecording(true);
              props.onClick();
            }}
            color="secondary"
            aria-label="record"
          >
            <MicIcon />
          </StyledFab>
        </Tooltip>
      )}
    </Fragment>
  );
}

import React, { Fragment } from "react";
import StopIcon from "@material-ui/icons/Stop";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";

const StyledFab = styled(Fab)`
  position: relative;
  background-color: #8f3934;
  color: white;
  opacity: 1;
  margin: 12px;
  z-index: 3;
  transition: all 0.2s;
  :hover {
    background-color: #8f3934;
    opacity: 0.9;
  }
`;

export default function StopButton(props) {
  return (
    <Fragment>
      <Tooltip title="Start Recording" aria-label="record">
        <StyledFab
          //onClick={props.onClick}
          color="secondary"
          aria-label="record"
        >
          <StopIcon />
        </StyledFab>
      </Tooltip>
    </Fragment>
  );
}

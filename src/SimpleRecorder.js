import React, { Fragment, useState, useContext } from "react";
import { MainContext } from "./contexts/MainContext.js";
import RecordButton from "./RecordButton.js";
import StopButton from "./StopButton.js";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

const StyledBox = styled(Box)`
  margin: 1em;
`;

const SimpleRecorder = () => {
  const { audioURL, setAudioURL } = useContext(MainContext);
  const [isRecording, setIsRecording] = useState(false);
  var recorder, gumStream;
  //var recordButton = document.getElementById("recordButton");

  function toggleRecording() {
    if (recorder && recorder.state === "recording") {
      recorder.stop();
      gumStream.getAudioTracks()[0].stop();
    } else {
      navigator.mediaDevices
        .getUserMedia({
          audio: true
        })
        .then(function(stream) {
          var oldPreviewElm;
          oldPreviewElm = document.getElementById("preview");
          if (oldPreviewElm.hasChildNodes()) {
            oldPreviewElm.removeChild(oldPreviewElm.childNodes[0]);
          }
          gumStream = stream;
          recorder = new MediaRecorder(stream);
          recorder.ondataavailable = function(e) {
            var url = URL.createObjectURL(e.data);
            var preview = document.createElement("audio");
            preview.controls = true;
            preview.src = url;
            //console.log("recorder:", recorder);
            //document.body.appendChild(preview);
            setAudioURL(preview);
            var previewElm;
            previewElm = document.getElementById("preview");
            if (previewElm.hasChildNodes()) {
              previewElm.replaceChild(preview, previewElm.childNodes[0]);
            } else {
              previewElm.appendChild(preview);
            }
            console.log(previewElm);
          };
          recorder.start();
        });
    }
  }
  const toggleIsRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <Fragment>
      <RecordButton
        id="recordButton"
        onClick={() => {
          toggleRecording();
          // toggleIsRecording();
        }}
      />
      <StyledBox id="preview" />
    </Fragment>
  );
};

export default SimpleRecorder;

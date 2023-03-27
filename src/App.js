/*After much pain I discovered this codepen (https://codepen.io/naicuoctavian/pen/GRgzqBg)
which simply and beutifully recorded audio in the browser with the Web Audio API.
I have added a few features and imporved the UX to create what should be a nice starting
point for implementing audio recording in your Reactjs App.
Notes on encoding MP3;
https://blog.addpipe.com/using-webaudiorecorder-js-to-record-audio-on-your-website/
https://addpipe.com/simple-web-audio-recorder-demo/
https://github.com/addpipe/simple-web-audio-recorder-demo
*/

import React, { useContext } from "react";
import { MainContext } from "./contexts/MainContext.js";
import SimpleRecorder from "./SimpleRecorder.js";
import WebAudioRecorderComponent from "./WebAudioRecorderComponent.js";
import WaveSurferComponent from "./WaveSurferComponent.js";
import Box from "@material-ui/core/Box";
import "./styles.css";
import styled from "styled-components";

const StyledBox = styled(Box)`
  #waveform {
    margin: 24px auto;
  }
`;

export default function App() {
  const { audioURL } = useContext(MainContext);

  return (
    <div className="App">
      <h1>Simple Audio Recorder</h1>
      <h2>Using MediaRecorder API</h2>
      <WebAudioRecorderComponent />
      <SimpleRecorder />
      <StyledBox>
        <WaveSurferComponent audioURL={audioURL} />
      </StyledBox>
    </div>
  );
}

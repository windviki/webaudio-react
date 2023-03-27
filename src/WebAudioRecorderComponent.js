import React, { Fragment } from "react";
import WebAudioRecorder from "./war/WebAudioRecorder.min.js";

//require("web-audio-recorder-js/lib-minified/WebAudioRecorder.min");

export default function WebAudioRecorderComponent() {
  //webkitURL is deprecated but nevertheless
  URL = window.URL || window.webkitURL;

  var gumStream; //stream from getUserMedia()
  var recorder; //WebAudioRecorder object
  var input; //MediaStreamAudioSourceNode  we'll be recording
  var encodingType; //holds selected encoding for resulting audio (file)
  var encodeAfterRecord = true; // when to encode

  // shim for AudioContext when it's not avb.
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext; //new audio context to help us record

  var encodingTypeSelect = document.getElementById("encodingTypeSelect");
  var recordButton = document.getElementById("recordButton");
  var stopButton = document.getElementById("stopButton");

  // //add events to those 2 buttons
  // recordButton.addEventListener("click", startRecording);
  // stopButton.addEventListener("click", stopRecording);

  function toggleRecording() {
    if (recorder) {
      console.log("stopRecording() called");
      console.log("recorder:", recorder);

      //stop microphone access
      gumStream.getAudioTracks()[0].stop();

      //disable the stop button
      // stopButton.disabled = true;
      // recordButton.disabled = false;

      //tell the recorder to finish the recording (stop recording + encode the recorded audio)
      recorder.finishRecording();
      recorder = null;
      __log("Recording stopped");
    } else {
      console.log("startRecording() called");

      /*
		Simple constraints object, for more advanced features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/

      var constraints = { audio: true, video: false };

      /*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          __log(
            "getUserMedia() success, stream created, initializing WebAudioRecorder..."
          );
          console.log("code passed");
          gumStream = stream;

          /*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device
		*/
          audioContext = new AudioContext();
          console.log("code passed 2");

          //update the format
          document.getElementById("formats").innerHTML =
            "Format: 2 channel " +
            encodingTypeSelect.options[encodingTypeSelect.selectedIndex].value +
            " @ " +
            audioContext.sampleRate / 1000 +
            "kHz";
          console.log("code passed 3");

          //assign to gumStream for later use
          gumStream = stream;

          /* use the stream */
          input = audioContext.createMediaStreamSource(stream);

          //stop the input from playing back through the speakers
          //input.connect(audioContext.destination)

          //get the encoding
          encodingType =
            encodingTypeSelect.options[encodingTypeSelect.selectedIndex].value;

          //disable the encoding selector
          encodingTypeSelect.disabled = true;
          console.log("code passed 4a");

          recorder = new window.WebAudioRecorder(input, {
            workerDir: "src/war/", // must end with slash
            encoding: encodingType,
            numChannels: 2, //2 is the default, mp3 encoding supports only 2
            onEncoderLoading: function(recorder, encoding) {
              // show "loading encoder..." display
              console.log("code passed 4b", encodingType);
              __log("Loading " + encoding + " encoder...");
            },
            onEncoderLoaded: function(recorder, encoding) {
              // hide "loading encoder..." display
              __log(encoding + " encoder loaded");
            }
          });
          console.log("code passed 4");

          recorder.onComplete = function(recorder, blob) {
            __log("Encoding complete");
            createDownloadLink(blob, recorder.encoding);
            console.log("createDownloadLink() called");
            encodingTypeSelect.disabled = false;
          };

          console.log("code passed 5");

          recorder.setOptions({
            timeLimit: 120,
            encodeAfterRecord: encodeAfterRecord,
            ogg: { quality: 0.5 },
            mp3: { bitRate: 160 }
          });

          //start the recording process
          recorder.startRecording();

          __log("Recording started");
          console.log("Recording started");
        })
        .catch(function(err) {
          //enable the record button if getUSerMedia() fails
          // recordButton.disabled = false;
          // stopButton.disabled = true;
        });

      //disable the record button
      // recordButton.disabled = true;
      // stopButton.disabled = false;
      console.log("recorder:", recorder);
    }
  }

  function createDownloadLink(blob, encoding) {
    var url = URL.createObjectURL(blob);
    var au = document.createElement("audio");
    var li = document.createElement("li");
    var link = document.createElement("a");

    //add controls to the <audio> element
    au.controls = true;
    au.src = url;

    //link the a element to the blob
    link.href = url;
    link.download = new Date().toISOString() + "." + encoding;
    link.innerHTML = link.download;

    //add the new audio and a elements to the li element
    li.appendChild(au);
    li.appendChild(link);

    //add the li element to the ordered list
    recordingsList.appendChild(li);
  }

  //helper function
  function __log(e, data) {
    log.innerHTML += "\n" + e + " " + (data || "");
  }

  return (
    //Convert audio to:
    <Fragment>
      <select id="encodingTypeSelect">
        <option value="wav">Waveform Audio (.wav)</option>
        <option value="mp3">MP3 (MPEG-1 Audio Layer III) (.mp3)</option>
        <option value="ogg">Ogg Vorbis (.ogg)</option>
      </select>

      <button onClick={toggleRecording} id="recordButton">
        Record
      </button>
      <button onClick={toggleRecording} id="stopButton">
        Stop
      </button>
      <div id="formats" />

      <h3>Log</h3>
      <pre id="log" />

      <h3>Recordings</h3>
      <ol id="recordingsList" />
    </Fragment>
  );
}

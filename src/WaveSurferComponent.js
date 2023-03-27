import React from "react";
//import { peaks } from "./peaks.js";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";

// .ebee
class WaveSurferComponent extends React.Component {
  state = {
    regions: [
      // {
      //   id: "sample1",
      //   start: 2, // time in seconds
      //   end: 50, // time in seconds
      //   color: "hsla(100, 100%, 30%, 0.1)"
      // }
    ],
    // words: [],
    // isLoading: true,
    // errors: null
    context: null,
    processor: null
  };

  componentDidMount() {
    const aud = document.querySelector("#song");

    this.wavesurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: "#waveform",
      backend: "MediaElement",
      height: 80,
      progressColor: "#4a74a5",
      responsive: true,
      waveColor: "#ccc",
      cursorColor: "#4a74a5",
      plugins: [
        RegionsPlugin.create({
          regions: this.state.regions,
          dragSelection: {
            slop: 5
          }
        })
      ]
    });
    // this.wavesurfer.load(aud, peaks);
    this.wavesurfer.load(aud);
    /* Using an arrow function for the callback below allows
    this.wavesurfer to be used by correctly scoping "this";
    https://stackoverflow.com/questions/48967390/wavesurfer-2-0-events-implementation-in-react
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this */
    this.wavesurfer.on("region-click", (region, e) => {
      console.log(region.start);
      console.log(region.end);
      e.stopPropagation();
      this.wavesurfer.play(region.start, region.end);
      console.log("regions;", this.wavesurfer.regions);
    });

    this.wavesurfer.on("region-created", (region, e) => {
      this.wavesurfer.clearRegions();
      this.setState({ regions: region });
      console.log(
        "region-created",
        this.state.regions.start,
        this.state.regions.end
      );
    });

    //console.log(peaks.length);
  }

  // componentDidUpdate() {
  //   this.wavesurfer.load(this.props.audioURL);
  // }

  playIt = () => {
    this.wavesurfer.playPause();
  };

  playRegion = () => {
    this.wavesurfer.play(
      this.state.regions.start,
      this.state.regions.end
      // this.wavesurfer.regions.params.regions[0].start,
      // this.wavesurfer.regions.params.regions[0].end
    );
  };

  removeAllRegions = () => {
    this.wavesurfer.clearRegions();
  };

  // 472, 780, +

  render() {
    return (
      <div>
        <button onClick={this.playIt}>Play</button>
        <div
          style={{ border: "1px solid grey", width: 150, height: 80 }}
          id="waveform"
        />
        <audio
          id="song"
          src={this.props.audioURL}
          //src="https://reelcrafter-east.s3.amazonaws.com/aux/test.m4a"
        />
        <button
          onClick={() => {
            console.log(
              "this.wavesurfer:",
              this.wavesurfer,
              "t.s.regions:",
              this.state.regions
              // this.wavesurfer.regions.params.regions
            );
          }}
        >
          Log
        </button>
        <button onClick={this.playRegion}>Play Region 0</button>
        <button onClick={this.removeAllRegions}>Remove Regions</button>
      </div>
    );
  }
}

export default WaveSurferComponent;

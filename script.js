
//const { createFFmpeg } = FFmpeg;
//const ffmpeg = createFFmpeg({ log: true });

//await ffmpeg.load();

//const videoData = await fetchFile('path/to/video.mp4');
//await ffmpeg.FS('writeFile', 'input.mp4', videoData);


//const ffmpeg = require("ffmpeg.js");
//const { createFFmpeg } = FFmpeg;
//const ffmpeg = createFFmpeg({ log: true });

const worker = new Worker("node_modules/ffmpeg.js/ffmpeg-worker-webm.js");
worker.onmessage = function(e) {
  const msg = e.data;
  switch (msg.type) {
  case "ready":
    worker.postMessage({type: "run", arguments: ["-version"]});
    break;
  case "stdout":
    console.log(msg.data);
    break;
  case "stderr":
    console.log(msg.data);
    break;
  case "done":
    console.log(msg.data);
    break;
  }
};

//console.log();

const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", (e)=>{

    const videoData = e.target.files[0];
    console.log(videoData);
});
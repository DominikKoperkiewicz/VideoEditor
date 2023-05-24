const fileInput = document.getElementById("file-input");
const resourcesContainer = document.getElementById("resources-container");
const importCanvas = document.getElementById("import-canvas");
const importPlayer = document.getElementById("import-player");
const videoContainer = document.getElementById("video-container");

const previewPlayer = document.getElementById("preview-player");
const cutPlayer = document.getElementById("cut-player");
let activePlayer = previewPlayer;

timeline = new Timeline();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let videosArray = [];

fileInput.addEventListener("change", async (e) => {
    /*
    const videoFile = e.target.files[0];
    console.log(videoFile.type);
    let videoURL = URL.createObjectURL(videoFile);

    importPlayer.src = videoURL;
    while(importPlayer.readyState != 4) { await sleep(0.1); console.log(importPlayer.readyState); };
    videosArray.push(new VideoData(importCanvas, importPlayer));*/
    const file = e.target.files[0];
    if(file === undefined) { return; }
    switch(file.type.split('/')[0]) {
        case 'video':
            videosArray.push(new VideoData(file));
            break;
    }
});

const fileInput = document.getElementById("file-input");
const resourcesContainer = document.getElementById("resources-container");
const importCanvas = document.getElementById("import-canvas");
const importPlayer = document.getElementById("import-player");
const videoContainer = document.getElementById("video-container");

const player = document.getElementById("cut-player");
timeline = new Timeline();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let videosArray = [];

fileInput.addEventListener("change", async (e) => {
    const videoFile = e.target.files[0];
    var videoURL = URL.createObjectURL(videoFile);

    importPlayer.src = videoURL;
    while(importPlayer.readyState != 4) { await sleep(0.1) };
    videosArray.push(new VideoData(importCanvas, importPlayer));
});

player.addEventListener("click", () => {
    videosArray[0].play(player);
})
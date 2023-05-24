import Whammy from '../node_modules/ts-whammy/libs-esm/index.js';

let exportButton = document.getElementById("export-button");

function saveBlobAsFile(blob, fileName) {
    // Create a temporary URL for the Blob
    const blobUrl = URL.createObjectURL(blob);
  
    // Create a link element
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
  
    // Programmatically click the link to trigger the download
    link.click();
  
    // Clean up by revoking the object URL
    URL.revokeObjectURL(blobUrl);
  }

//WHAMMY
exportButton.addEventListener("click", () => {
    if(timeline.endTime === 0) { return; }

    let frames = [];
    timeline.videoList.forEach(element => {
        for(let i = element.startFrame; i < element.endFrame; i++) {
            frames.push(element.videoData.frames[i].src);
        }
    });

    let encodedVideo = Whammy.fromImageArray(frames, 24);

    const nameInput = document.getElementById("name-input");
    const format = "webm";
    let fileName = nameInput.value + "." + format;
    if(nameInput.value === "") {
        fileName = nameInput.placeholder + "." + format;
    }

    saveBlobAsFile(encodedVideo, fileName);
    
})

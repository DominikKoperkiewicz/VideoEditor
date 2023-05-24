
class VideoBlock {
    videoData = null;
    startFrame = 0;
    endFrame = 0;
    time = 0;
    blockDiv = null;

    get length() {
        return this.endFrame - this.startFrame;
    }

    constructor(videoData, time, nodeReference) {
        this.videoData = videoData;
        this.time = time;
        this.startFrame = 0;
        this.endFrame = this.videoData.length;

        this.blockDiv = document.createElement("div");
        this.blockDiv.classList.add("video-block");
        this.blockDiv.style.minWidth = this.length * timeline.frameScale + "px";

        const videoImage = document.createElement("div");
        videoImage.classList.add("image-block");
        
        videoImage.style.backgroundImage = 'url(' + this.videoData.frames[0].src + ')';
        this.blockDiv.appendChild(videoImage);

        videoContainer.insertBefore(this.blockDiv, nodeReference);
        //videoContainer.appendChild(this.blockDiv);

        this.blockDiv.addEventListener("click", () => {
            timeline.selectBlock(this);
        });
    }

    get length() {
        return this.endFrame - this.startFrame;
    }

    destroy() {
        this.blockDiv.remove();
    }

    select(value) {
        if(value) {
            this.blockDiv.classList.add("active");
        } else {
            this.blockDiv.classList.remove("active");
        }
    }

    updateDiv() {
        this.blockDiv.style.minWidth = (this.endFrame - this.startFrame) * timeline.frameScale + "px";
    }
}
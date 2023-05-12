
class VideoBlock {
    videoData = null;
    startFrame = 0;
    endFrame = 0;
    time = 0;
    blockDiv = null;

    constructor(videoData, time) {
        this.videoData = videoData;
        this.time = time;
        this.endFrame = this.videoData.length;

        this.blockDiv = document.createElement("div");
        this.blockDiv.classList.add("video-block");
        this.blockDiv.style.minWidth = this.length + "em";

        const videoImage = document.createElement("div");
        videoImage.classList.add("image-block");
        
        videoImage.style.backgroundImage = 'url(' + this.videoData.frames[0].src + ')';
        this.blockDiv.appendChild(videoImage);

        videoContainer.appendChild(this.blockDiv);

        this.blockDiv.addEventListener("click", () => {
            timeline.selectBlock(this);
        });
    }

    destroy() {
        this.blockDiv.remove();
    }

    get length() {
        return this.endFrame - this.startFrame;
    }

    select(value) {
        if(value) {
            this.blockDiv.classList.add("active");
        } else {
            this.blockDiv.classList.remove("active");
        }
    }
}
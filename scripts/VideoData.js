
class VideoData {
    frames = [];
    fileDiv = null;

    constructor(canvas, videoPlayer) {
        this.fileDiv = document.createElement("div");
        this.fileDiv.classList.add("resource-block");
        const videoImage = document.createElement("img");

        this.fileDiv.appendChild(videoImage);
        resourcesContainer.appendChild(this.fileDiv);
        this.loadVideo(canvas, videoPlayer);
            //*********** CLICK EVENT - DELETE THIS LATER ********** */
        this.fileDiv.addEventListener("click", () => {
            //timeline.videoList.push(new VideoBlock(this, 0));
            timeline.addVideoBlock(this);
        });
    }

    get length() {
        return this.frames.length;
    }

    async loadVideo(canvas, videoPlayer) {
        console.log("loading started!");
        let framesNumber = videoPlayer.duration * 24;
        let ctx = canvas.getContext('2d');
        this.frames = [];
        for(let i = 0; i < framesNumber; i++) {
            let image = new Image();
            this.frames.push(image);
        }

        for(let i = 0; i < framesNumber; i++) {
            console.log("Frame processing: " + i);
            videoPlayer.currentTime = (1/24) * i + 1/48;
            while(videoPlayer.seeking) {await sleep(0.1);}
            ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
            this.frames[i].src = canvas.toDataURL("image/png");
        }

        this.fileDiv.children[0].src = this.frames[0].src;
        console.log("loading finished");
    }

    displayFrame(canvas, frame) {
        if(frame > this.frames.length) { console.log("frame out of range!"); return; }

        let ctx = canvas.getContext('2d');
        ctx.drawImage(this.frames[frame], 0, 0, canvas.width, canvas.height);
    }

    async play(canvas) {
        for(let i = 0; i < this.frames.length; i++) {
            this.displayFrame(canvas, i);
            console.log(i + "/" + this.frames.length);
            await sleep(1000/24);
        }
        console.log("playing finished!");
    }
}
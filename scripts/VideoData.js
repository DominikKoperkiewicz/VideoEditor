let format = "image/webp";
//format = 'image/webp; codecs="vp8"';

class VideoData {
    frames = [];
    fileDiv = null;

    constructor(file) {
        this.fileDiv = document.createElement("div");
        this.fileDiv.classList.add("resource-block");
        const videoImage = document.createElement("img");
        videoImage.src = '../img/loading.png';

        this.fileDiv.appendChild(videoImage);
        resourcesContainer.appendChild(this.fileDiv);

        let nameLabel = document.createElement("label");
        nameLabel.textContent = file.name;
        this.fileDiv.appendChild(nameLabel);
        
        let loadingBar = document.createElement("div");
        loadingBar.classList.add("loading-bar");
        this.fileDiv.appendChild(loadingBar);


        this.loadVideo(file);
            //*********** CLICK EVENT - DELETE THIS LATER ********** */
        this.fileDiv.addEventListener("click", () => {
            //timeline.videoList.push(new VideoBlock(this, 0));
            timeline.addVideoBlock(this);
        });
    }

    get length() {
        return this.frames.length;
    }

    async loadVideo(file) {

        let videoURL = URL.createObjectURL(file);
        // CREATE PLAYER
        let videoPlayer = document.createElement("video");
        videoPlayer.width = 1920;
        videoPlayer.height = 1080;
        videoPlayer.style = "display: none;";

        // CREATE CANVAS
        let canvas = document.createElement("canvas");
        canvas.width = 1920;
        canvas.height = 1080;
        canvas.style = "display: none;";
    
        videoPlayer.src = videoURL;
        while(videoPlayer.readyState != 4) { await sleep(0.1); /*console.log(videoPlayer.readyState);*/ }

        let loadingBar = this.fileDiv.querySelector('.loading-bar');
        /*** */

        console.log("loading started!");
        let framesNumber = videoPlayer.duration * 24;
        let ctx = canvas.getContext('2d');
        this.frames = [];
        for(let i = 0; i < framesNumber; i++) {
            let image = new Image();
            this.frames.push(image);
        }

        console.log(videoPlayer.videoWidth + "x" + videoPlayer.videoHeight);
        //*** CALCULATE POSITION ***//
        let videoInfo = this.calculateVideoInfo(videoPlayer);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        console.log(videoInfo);

        for(let i = 0; i < framesNumber; i++) {
            console.log("Frame processing: " + i + "/" + Math.floor(framesNumber));
            videoPlayer.currentTime = (1/24) * i + 1/48;
            while(videoPlayer.seeking) {await sleep(0.1);}
            ctx.drawImage(videoPlayer, videoInfo.x, videoInfo.y, videoInfo.width, videoInfo.height);
            this.frames[i].src = canvas.toDataURL(/*"image/webp"*/format, 0.5);
            
            loadingBar.style.width = 100 * i / framesNumber + "%";
        }

        //this.fileDiv.children[0].src = this.frames[0].src;
        this.fileDiv.querySelector('img').src = this.frames[0].src;
        // DELETE PLAYER, CANVAS AND LOADING BAR
        videoPlayer.remove();
        canvas.remove();
        loadingBar.remove();

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

    calculateVideoInfo(videoPlayer) {
        let info = {
            x: 0,
            y: 0,
            width: 1920,
            height: 1080,
        }

        if(videoPlayer.videoWidth / videoPlayer.videoHeight <= 16 / 9) {
            let scale = 1080 / videoPlayer.videoHeight;
            info.width = videoPlayer.videoWidth * scale;
            info.x = (1920 - info.width) / 2;
        } else {
            let scale =  1920 / videoPlayer.videoWidth;
            info.height = videoPlayer.videoHeight * scale;
            info.y = (1080 - info.height) / 2;
        }

        return info;
    }
}

/*

    async loadVideo(canvas, videoPlayer) {
        console.log("loading started!");
        let framesNumber = videoPlayer.duration * 24;
        let ctx = canvas.getContext('2d');
        this.frames = [];
        for(let i = 0; i < framesNumber; i++) {
            let image = new Image();
            this.frames.push(image);
        }

        console.log(videoPlayer.videoWidth + "x" + videoPlayer.videoHeight);
        // CALCULATE POSITION 
        let videoInfo = this.calculateVideoInfo(videoPlayer);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        console.log(videoInfo);

        for(let i = 0; i < framesNumber; i++) {
            console.log("Frame processing: " + i + "/" + Math.floor(framesNumber));
            videoPlayer.currentTime = (1/24) * i + 1/48;
            while(videoPlayer.seeking) {await sleep(0.1);}
            ctx.drawImage(videoPlayer, videoInfo.x, videoInfo.y, videoInfo.width, videoInfo.height);
            this.frames[i].src = canvas.toDataURL("image/png");
        }

        this.fileDiv.children[0].src = this.frames[0].src;
        console.log("loading finished");
    }
    */
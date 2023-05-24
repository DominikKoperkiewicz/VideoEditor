
class Timeline {
    videoList = [];
    select = null;
    frame = 0;
    frameScale = 10;
    static div = document.getElementById("timeline");
    isPlaying = false;
    playStartDate = null;

    get endTime() {
        if(this.videoList.length === 0) { return 0; }
        let last = this.videoList[this.videoList.length-1];
        return last.time + last.length;
    }

    constructor() { }

    deleteBlock() {
        let index = this.videoList.indexOf(this.select);
        if (index > -1) {
            let deleteTime = this.videoList[index].length;
            for(let i = index+1; i < this.videoList.length; i++) {
                this.videoList[i].time -= deleteTime;
            }
            this.select.destroy();
            this.videoList.splice(index, 1);
            if(this.endTime < this.frame) { this.setFrame(this.endTime); }
        }
        this.select = null;
        this.updateTimeAxis();
    }

    cutBlock() {
        for(let i = 0; i < this.videoList.length; i++) {
            if(this.frame > this.videoList[i].time && this.frame < this.videoList[i].time + this.videoList[i].length) {
                
                //let tmpEndTime = this.videoList[i].endFrame;
                //this.videoList[i].endFrame = this.frame - this.videoList[i].time + this.videoList[i].startFrame;

                let tmpStartTime = this.videoList[i].startFrame;
                this.videoList.splice(i, 0, new VideoBlock(this.videoList[i].videoData, this.videoList[i].time, this.videoList[i].blockDiv));
                this.videoList[i].startFrame = tmpStartTime;
                this.videoList[i].endFrame = this.frame - this.videoList[i].time + this.videoList[i].startFrame;

                this.videoList[i+1].time += this.videoList[i].length;
                this.videoList[i+1].startFrame += this.videoList[i].length;

                //this.videoList[i+1].startFrame = this.videoList[i].endFrame;
                //this.videoList[i+1].endFrame = tmpEndTime;

                this.videoList[i].updateDiv();
                this.videoList[i+1].updateDiv();

                //console.log(i);
                return;
            }
        }
    }

    selectBlock(block) {
        this.videoList.forEach(element=>{
            if(element === block) {
                this.select = block;
                element.select(true);
            } else {
                element.select(false);
            }
        });
    }

    addVideoBlock(videoData) {
        const rightOffsetBlock = document.getElementById("right-offset-block");
        let newBlock = new VideoBlock(videoData, this.endTime, rightOffsetBlock);
        this.videoList.push(newBlock);
        this.updateTimeAxis();
    }

    setFrame(value) {
        if(value < 0) { value = 0; }
        if(value > this.endTime) { value = this.endTime; }
        this.frame = value;
        const frameNumber = document.getElementById("frame-number");
        frameNumber.textContent = "Frame: " + value;
        this.displayFrame();
    }

    displayFrame() {
        //Get image
        for(let i = 0; i < this.videoList.length; i++) {
            if(this.frame >= this.videoList[i].time && this.frame < this.videoList[i].time + this.videoList[i].length) {
                // console.log("BLOCK: " + i);
                this.videoList[i].videoData.displayFrame(activePlayer, this.frame - this.videoList[i].time + this.videoList[i].startFrame);
                return;
            }
        }
    }

    async play() {
        const playButton = document.getElementById("play-button");
        playButton.src = "img/stop_icon.svg";
        this.isPlaying = true;
        this.playStartDate = new Date();
        this.playNextFrame(this.frame);
    }

    stop() {
        const playButton = document.getElementById("play-button");
        playButton.src = "img/play_icon.svg";
        this.isPlaying = false;
    }

    async playNextFrame(start) {
        while(this.isPlaying) {
            if(this.isPlaying && this.frame != this.endTime) {
                let currentDate = new Date();
                let targetFrame = Math.floor((currentDate - this.playStartDate) * 24 / 1000) + start;
                if(this.frame != targetFrame) {
                    this.setFrame(targetFrame);
                    // Timeline.div.scrollLeft = timeline.frame * timeline.frameScale;
                    timeline.snapToFrame();
                }
                await sleep(8);
            } else {
                this.stop();
                return;
            }
        }
    }

    snapToFrame() {
        const previewSlider = document.getElementById("preview-slider");
        const previewTimeStamp = document.getElementById("time-stamp");
        previewTimeStamp.textContent = String(Math.floor(timeline.frame / (24*60))).padStart(2,'0') + ":" + String(Math.floor(timeline.frame / 24 % 60)).padStart(2,'0');
        previewSlider.value = (Math.floor((timeline.frame / timeline.endTime) * 1000));
        Timeline.div.scrollLeft = timeline.frame * timeline.frameScale;
    }

    togglePlay() {
        if(this.isPlaying) {
            this.stop();
        } else {
            this.play();
        }
    }

    updateBlocks() {
        this.videoList.forEach(element => {
            element.updateDiv();
        });
        this.updateTimeAxis();
    }

    zoomIn(value) {
        const maxZoom = 20;

        if(this.frameScale < maxZoom) {
            // this.frameScale *= 1.125;
            this.frameScale += value;
        }

        if(this.frameScale > maxZoom) {
            this.frameScale = maxZoom;
        }
        this.snapToFrame();
        this.updateBlocks();
    }

    zoomOut(value) {
        const minZoom = 5;

        if(this.frameScale > minZoom) {
            // this.frameScale *= 0.875;
            this.frameScale -= value;
        } 

        if(this.frameScale < minZoom) {
            this.frameScale = minZoom;
        }
        this.snapToFrame();
        this.updateBlocks();
    }

    updateTimeAxis() {
        const rulerContainer = document.getElementById("time-rulers-container");
        const rulersNumber = Math.ceil(this.endTime / 24);

        //console.log(children);

        if( rulersNumber > rulerContainer.children.length) {
            for(let i = rulerContainer.children.length; i < rulersNumber; i++) {
                const ruler = document.createElement("div");
                ruler.classList.add("time-ruler");
                ruler.textContent = Math.floor(i / 60) + ":" + String(i % 60).padStart(2, '0');
                rulerContainer.appendChild(ruler);
            }
        }

        while( rulersNumber < rulerContainer.children.length ) {
            rulerContainer.removeChild(rulerContainer.lastChild);
        }

        const children = Array.from(rulerContainer.children);
        children.forEach(element => {
            element.style.minWidth = 24 * this.frameScale + "px";
        });

        if (this.endTime % 24 != 0) {
            children[children.length-1].style.minWidth = (this.endTime % 24) * this.frameScale + "px";
        }
    }
}



//** EVENTS **//
{
// Update on scroll
Timeline.div.addEventListener("scroll", () => {
    const pointer = document.getElementById("time-pointer");
    pointer.style.transform = "translate(" + Timeline.div.scrollLeft + "px)";
    //console.log(Timeline.div.scrollLeft);
    //timeline.frame = Math.floor(Timeline.div.scrollLeft / 10);
    timeline.setFrame(Math.round(Timeline.div.scrollLeft / timeline.frameScale));
});

// Snap to frame
var timelineScrollTimer = null;
Timeline.div.addEventListener('scroll', function() {
    if(timelineScrollTimer !== null) {
        clearTimeout(timelineScrollTimer);        
    }
    timelineScrollTimer = setTimeout(function() {
        timeline.snapToFrame();
    }, 150);
}, false);


document.getElementById("delete-button").addEventListener("click", () => {
    timeline.deleteBlock();
});


document.getElementById("cut-button").addEventListener("click", () => {
    timeline.cutBlock();
});

// CONTROL PANELS
document.getElementById("fastbackward-button").addEventListener("click", () => {
    timeline.setFrame(0);
    timeline.snapToFrame();
});

document.getElementById("play-button").addEventListener("click", () => {
    timeline.togglePlay();
});

document.getElementById("fastforward-button").addEventListener("click", () => {
    timeline.setFrame(timeline.endTime);
    timeline.snapToFrame();
});

document.getElementById("fastbackward-preview-button").addEventListener("click", () => {
    timeline.setFrame(0);
    timeline.snapToFrame();
});

document.getElementById("play-preview-button").addEventListener("click", () => {
    timeline.togglePlay();
});

document.getElementById("fastforward-preview-button").addEventListener("click", () => {
    timeline.setFrame(timeline.endTime);
    timeline.snapToFrame();
});

// KEYBOARD
addEventListener("keydown", (event) => {
    //console.log(event.key);
    switch(event.key) {
        case "ArrowRight":
            timeline.setFrame(timeline.frame+1);
            timeline.snapToFrame();
            break;
        case "ArrowLeft":
            timeline.setFrame(timeline.frame-1);
            timeline.snapToFrame();
            break;
        case "Delete":
            timeline.deleteBlock();
            break;
        case " ":
            timeline.togglePlay();
            break;
    }
});


let initialDistance = 0;

Timeline.div.addEventListener('touchstart', function(event) {
    if (event.touches.length === 2) {
        initialDistance = getPinchDistance(event);
    }
});

Timeline.div.addEventListener('touchmove', function(event) {
    if (event.touches.length === 2) {
        const currentDistance = getPinchDistance(event);
        let zoom = currentDistance - initialDistance;

        if( zoom > 1 ) {
            timeline.zoomIn(zoom*0.05);
            initialDistance = currentDistance;
        }

        if( zoom < -1 ) {
            timeline.zoomOut(-zoom*0.05);
            initialDistance = currentDistance;
        }
    }
});

function getPinchDistance(event) {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    return Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
}

const previewSlider = document.getElementById("preview-slider");
const previewTimeStamp = document.getElementById("time-stamp");

previewSlider.addEventListener("input", (event) => {
    let frame = Math.floor(timeline.endTime * previewSlider.value * 0.001);
    previewTimeStamp.textContent = String(Math.floor(timeline.frame / (24*60))).padStart(2,'0') + ":" + String(Math.floor(timeline.frame / 24 % 60)).padStart(2,'0');
    timeline.setFrame(frame);
});

}
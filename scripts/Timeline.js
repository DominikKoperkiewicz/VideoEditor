
class Timeline {
    videoList = [];
    select = null;
    frame = 0;

    constructor() { 
        document.getElementById("delete-button").addEventListener("click", () => {
            let index = this.videoList.indexOf(this.select);
            if (index > -1) {
                this.select.destroy();
                this.videoList.splice(index, 1);
            }
            this.select = null;
        });
    }

    selectBlock(block) {
        this.videoList.forEach(element=>{
            if(element === block) {
                this.select = block;
                element.select(true);
            } else {
                element.select(false);
            }
        })
    }

    addVideoBlock(videoData) {
        let last = this.videoList.slice(-1);
        let time = last.time + last.length;

        this.videoList.push(new VideoBlock(this, time));
    }
}

//**COMMENT**
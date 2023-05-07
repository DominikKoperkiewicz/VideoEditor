const { createFFmpeg, fetchFile } = FFmpeg;
    const ffmpeg = createFFmpeg({ log: true });
    const transcode = async ({ target: { files } }) => {
      const { name } = files[0];
      await ffmpeg.load();
      ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
      await ffmpeg.run('-i', name,  'output.mp4');
      const data = ffmpeg.FS('readFile', 'output.mp4');
      const video = document.getElementById('preview-player');
      video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    }
    document
      .getElementById('file-input').addEventListener('change', transcode);


//*********************************************

const fileInput = document.getElementById("file-input");
/*
fileInput.addEventListener("change", (e)=>{

    const videoData = e.target.files[0];
    //console.log(videoData);
    //worker.postMessage({ type: 'process', payload: videoData });
    //worker.postMessage({ type: 'run', payload: videoData });
    const testData = new Uint8Array(fs.readFileSync("test.webm"));
    
    // Encode test video to VP8.
    const result = ffmpeg({
      MEMFS: [{name: "test.webm", data: testData}],
      arguments: ["-i", "test.webm", "-c:v", "libvpx", "-an", "out.webm"],
    });
    // Write out.webm to disk.
    const out = result.MEMFS[0];
    fs.writeFileSync(out.name, Buffer(out.data));
});
*/
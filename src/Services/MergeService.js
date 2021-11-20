const { default: Crunker } = require("crunker");

const MergeService = async (paths, length) => {
    let crunker = new Crunker();
    // fetch data
    const buffers = await crunker.fetchAudio(...paths)
    const merged = crunker.mergeAudio(buffers)
    const output = crunker.export(merged, "audio/mp3");
    crunker.download(output.blob);

    crunker.notSupported(() => {
        // Handle no browser support
        console.log("crunker library isn't supported in this currect browser");
    });
};

export default MergeService;
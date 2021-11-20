import audioBufferSlice from 'audiobuffer-slice';
import Crunker from "crunker";

const MergeService = async (masterTrack, length) => {

    // iterative
    let res = undefined;
    let crunker = new Crunker();
    const numberOfLoops = Math.ceil(length / 8);
    for (let i = 0; i < numberOfLoops; i++) {
        // check sounds in the loop
        let sounds = [];
        for (let index = 0; index < masterTrack.length; index++) {
            // in current loop
            if(masterTrack[index].loop <= i && (masterTrack[index].endLoop >= i || masterTrack[index].endLoop === -1))
                sounds.push(masterTrack[index].music);
        }

        if(sounds.length === 0) continue;

        const buffers = await crunker.fetchAudio(...sounds)
        const merged = crunker.mergeAudio(buffers);
        
        // add to res
        if(res === undefined){
            res = merged;
        }
        else{
            const concat = crunker.concatAudio([res,merged]);
            res = concat;
        }
    }

    crunker.notSupported(() => {
        // Handle no browser support
        console.log("crunker library isn't supported in this currect browser");
    });
    
    // trim
    let finalSound = undefined;
    await audioBufferSlice(res, 0, length * 1000, function(error, slicedAudioBuffer) {
        if (error) {
          console.error(error);
        }
        else {
            const output = crunker.export(slicedAudioBuffer, "audio/mp3");
            finalSound = output;
        }
    });
    return finalSound;
};

export default MergeService;
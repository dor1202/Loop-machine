import audioBufferSlice from 'audiobuffer-slice';
import Crunker from "crunker";

const MergeService = async (masterTrack, length) => {

    let mergedSound = undefined;
    let crunker = new Crunker();
    const numberOfLoops = Math.ceil(length / 8);
    for (let i = 0; i < numberOfLoops; i++) {
        // check sounds in the loop
        let soundsInTheCurrentLoop = [];
        for (let index = 0; index < masterTrack.length; index++) {
            // in current loop
            if(masterTrack[index].loop <= i && (masterTrack[index].endLoop >= i || masterTrack[index].endLoop === -1))
                soundsInTheCurrentLoop.push(masterTrack[index].music);
        }

        if(soundsInTheCurrentLoop.length === 0) continue;

        const buffers = await crunker.fetchAudio(...soundsInTheCurrentLoop)
        const merged = crunker.mergeAudio(buffers);
        
        // check if first add
        if(mergedSound === undefined) mergedSound = merged;
        else{
            const concat = crunker.concatAudio([mergedSound,merged]);
            mergedSound = concat;
        }
    }

    crunker.notSupported(() => {
        // Handle no browser support
        console.log("crunker library isn't supported in this currect browser");
    });
    
    // trim
    if(mergedSound === undefined) return null;

    let finalSoundAfterSlice = undefined;
    await audioBufferSlice(mergedSound, 0, length * 1000, function(error, slicedAudioBuffer) {
        if (error) console.error(error);
        else {
            const outputMP3 = crunker.export(slicedAudioBuffer, "audio/mp3");
            finalSoundAfterSlice = outputMP3;
        }
    });
    return finalSoundAfterSlice;
};

export default MergeService;
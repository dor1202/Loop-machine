import snd0 from '../Sounds/120_future_funk_beats_25.mp3';
import snd1 from '../Sounds/120_stutter_breakbeats_16.mp3';
import snd2 from '../Sounds/Bass Warwick heavy funk groove on E 120 BPM.mp3';
import snd3 from '../Sounds/electric guitar coutry slide 120bpm - B.mp3';
import snd4 from '../Sounds/FUD_120_StompySlosh.mp3';
import snd5 from '../Sounds/GrooveB_120bpm_Tanggu.mp3';
import snd6 from '../Sounds/MazePolitics_120_Perc.mp3';
import snd7 from '../Sounds/PAS3GROOVE1.03B.mp3';
import snd8 from '../Sounds/SilentStar_120_Em_OrganSynth.mp3';
const soundArr = [snd0,snd1,snd2,snd3,snd4,snd5,snd6,snd7,snd8];

const { default: Crunker } = require("crunker");

const MergeService = (paths, length) => {
    let wantedSounds = [];
    paths.forEach(element => {
        wantedSounds.push(soundArr[element]);
    });
    let crunker = new Crunker();

    // TODO: sort why and array isn't working but params does
    crunker
        .fetchAudio(snd0,snd1,snd2,snd3,snd4,snd5)
        .then(buffers => {
            // => [AudioBuffer, AudioBuffer]
            return crunker.mergeAudio(buffers);
        })
        .then(merged => {
            // => AudioBuffer
            return crunker.export(merged, "audio/mp3");
        })
        .then(output => {
            // => {blob, element, url}
            crunker.download(output.blob);
            document.body.append(output.element);
            console.log(output.url);
        })
        .catch(error => {
            // => Error Message
        });

    crunker.notSupported(() => {
        // Handle no browser support
    });
};

export default MergeService;
import { Howl } from 'howler';
import BenzAMRRecorder from 'benz-amr-recorder'

// for 'amr' files
const GenerateAmr = (src) => {
    const amr = new BenzAMRRecorder();
    const player = amr.initWithUrl(src);
    return [amr,player];
};

// for 'mpeg', 'opus', 'ogg', 'oga', 'aac', 'caf', 'm4a', 'mp4', 'weba', 'webm', 'dolby', 'flac', 'wma', 'mp3', 'wav', 'ogg' files
const GenerateHowl = (src) => {
    const sound = new Howl({
        src: [src],
        html5: true,
    });
    return sound;
};

const SoundObjGenerator = {
    GenerateAmr,
    GenerateHowl
};

export default SoundObjGenerator;
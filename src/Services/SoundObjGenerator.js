import { Howl } from 'howler';

// for 'mpeg', 'opus', 'ogg', 'oga', 'aac', 'caf', 'm4a', 'mp4', 'weba', 'webm', 'dolby', 'flac', 'wma', 'mp3', 'wav', 'ogg' files
const GenerateHowl = (src) => {
    const sound = new Howl({
        src: [src],
        html5: true,
    });
    return sound;
};

const SoundObjGenerator = {
    GenerateHowl
};

export default SoundObjGenerator;
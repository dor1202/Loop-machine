
const howlPlayHandler = (sound) => {
    sound.play();
}

const howlPtopHandler = (sound) => {
    sound.pause();
}

const SoundService = {
    howlPlayHandler,
    howlPtopHandler
};

export default SoundService;
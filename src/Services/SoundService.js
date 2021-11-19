
const playHandler = (amr, player) => {
    player.then(function () {
        amr.play();
    });
}
const stopHandler = (amr) => {
    amr.stop();
}

const howlPlayHandler = (sound) => {
    sound.play();
}

const howlPtopHandler = (sound) => {
    sound.pause();
}

const SoundService = {
    playHandler,
    stopHandler,
    howlPlayHandler,
    howlPtopHandler
};

export default SoundService;
const CreateTrackModel = (id,music, loopNumber) => {
    return {id: id, music: music, loop: loopNumber, endLoop: -1};
};

export default CreateTrackModel;
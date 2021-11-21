import DrumPad from "Components/DrumPad/DrumPad";
import MusicPlayer from "Components/MusicPlayer/MusicPlayer";
import Popup from "Components/Popup/Popup";
import Crunker from "crunker";
import React, { useState } from "react";

const MainPage = () => {
    const crunker = new Crunker();
    const [OpenBeforeTestPop, setOpenBeforeTestPop] = useState(false);
    const [FinalSound, setFinalSound] = useState(null);
    const [JsonData, setJsonData] = useState({});

    const downloadMusic = (e) => {
        if (FinalSound !== null) {
            // download js and mp3
            saveFile();
            crunker.download(FinalSound.blob);
        }

    };

    const saveFile = async () => {
        const a = document.createElement('a');
        a.download = 'drum-machine.json';
        const blob = new Blob([JSON.stringify(JsonData, null, 2)], { type: 'application/json' });
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
    };

    const receiveFinalSound = (e, MasterTrack) => {
        setFinalSound(e);
        setJsonData(MasterTrack);
        setOpenBeforeTestPop(true);
    };

    return (
        <div className='mainDiv'>
            <DrumPad openPopup={receiveFinalSound} />

            <Popup setPop={() => { setOpenBeforeTestPop(false) }} Pop={OpenBeforeTestPop}>
                <MusicPlayer downloadSound={downloadMusic} src={FinalSound === null ? '' : FinalSound.element.src} />
            </Popup>
        </div>
    );
};

export default MainPage;
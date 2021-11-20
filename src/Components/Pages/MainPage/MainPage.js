import DrumPad from "Components/DrumPad/DrumPad";
import MusicPlayer from "Components/MusicPlayer/MusicPlayer";
import Popup from "Components/Popup/Popup";
import Crunker from "crunker";
import React, { useState } from "react";

const MainPage = () => {
    const crunker = new Crunker();
    const [OpenBeforeTestPop, setOpenBeforeTestPop] = useState(false);
    const [FinalSound, setFinalSound] = useState(null);

    const downloadMusic = (e) => {
        if(FinalSound !== null) crunker.download(FinalSound.blob);
    };

    const receiveFinalSound = (e) => {
        setFinalSound(e);
        setOpenBeforeTestPop(true);
    };

    return(
        <div className='mainDiv'>
            <DrumPad openPopup={receiveFinalSound}/>

            <Popup setPop={() => { setOpenBeforeTestPop(false) }} Pop={OpenBeforeTestPop}>
                <MusicPlayer downloadSound={downloadMusic} src={FinalSound === null ? '' : FinalSound.element.src} />
            </Popup>
        </div>
    );
};

export default MainPage;
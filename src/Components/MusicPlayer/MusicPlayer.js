import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './MusicPlayer.css';

const MusicPlayer = ({ src = undefined, downloadSound = undefined}) => {
    return (
        <div>
            <AudioPlayer
                src={src}
            />
            <button onClick={downloadSound} className='downloadBtn-style'>Download Sound</button>
        </div>
    );
};

export default MusicPlayer;
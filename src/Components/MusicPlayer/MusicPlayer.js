import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Button } from 'semantic-ui-react';
import './MusicPlayer.css';
import React from 'react';

const MusicPlayer = ({ src = undefined, downloadSound = undefined}) => {
    return (
        <div>
            <AudioPlayer src={src} />
            <Button pri onClick={downloadSound} className='downloadBtn-style' icon='download'></Button>
        </div>
    );
};

export default MusicPlayer;
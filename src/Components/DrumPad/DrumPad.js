import DrumPadButton from "Components/DrumPadButton/DrumPadButton";
import React, { useState } from "react";
import { Button, Divider, Grid } from "semantic-ui-react";
import SoundObjGenerator from "Services/SoundObjGenerator";
import SoundService from "Services/SoundService";
import TrackModel from "Models/TrackModel";
import TimeService from "Services/TimeService";
import './DrumPad.css';
import MergeService from "Services/MergeService";

import snd0 from '../../Sounds/120_future_funk_beats_25.mp3';
import snd1 from '../../Sounds/120_stutter_breakbeats_16.mp3';
import snd2 from '../../Sounds/Bass Warwick heavy funk groove on E 120 BPM.mp3';
import snd3 from '../../Sounds/electric guitar coutry slide 120bpm - B.mp3';
import snd4 from '../../Sounds/FUD_120_StompySlosh.mp3';
import snd5 from '../../Sounds/GrooveB_120bpm_Tanggu.mp3';
import snd6 from '../../Sounds/MazePolitics_120_Perc.mp3';
import snd7 from '../../Sounds/PAS3GROOVE1.03B.mp3';
import snd8 from '../../Sounds/SilentStar_120_Em_OrganSynth.mp3';

import img0 from '../../Icons/accordion.png';
import img1 from '../../Icons/acoustic-guitar.png';
import img2 from '../../Icons/bass-guitar.png';
import img3 from '../../Icons/conga.png';
import img4 from '../../Icons/cymbals.png';
import img5 from '../../Icons/electric-guitar.png';
import img6 from '../../Icons/flute.png';
import img7 from '../../Icons/goblet-drum.png';
import img8 from '../../Icons/loudspeaker.png';

const soundArr = [snd0,snd1,snd2,snd3,snd4,snd5,snd6,snd7,snd8];

const DrumPad = () => {
    const [MasterTrack, setMasterTrack] = useState([]);
    const [IsPlaying, setIsPlaying] = useState(false);
    const [IsRecording, setIsRecording] = useState(false);
    // Timers
    let timerLoop = 0;
    const [Timer, setTimer] = useState(null);
    const [RecordTimer, setRecordTimer] = useState(null);
    // for displaying progress bar
    const [TimerLoop, setTimerLoop] = useState(0);
    let recordLoop = 0;
    const [RecordLength, setRecordLength] = useState(0);
    const [CurrentActiveTracks, setCurrentActiveTracks] = useState([]);

    const timerFunction = () => {
        // check music to start
        if (timerLoop === 0) {
            // play all sound
            for (let index = 0; index < MasterTrack.length; index++) {
                let a = SoundObjGenerator.GenerateHowl(MasterTrack[index].music);
                setCurrentActiveTracks([...CurrentActiveTracks, a]);
                SoundService.howlPlayHandler(a);
            }
        }
        setTimerLoop(timerLoop)
        timerLoop++;
        if (timerLoop >= 8) {
            timerLoop = 0;
            setCurrentActiveTracks([]);
        }
    };

    const changeTrack = (e) => {
        // remove track
        for (let index = 0; index < MasterTrack.length; index++) {
            if (MasterTrack[index].id === e) {
                // remove sound
                MasterTrack.splice(index, 1);
                setMasterTrack(MasterTrack);
                return;
            }
        }
        // add sound
        const trackModel = TrackModel(e, soundArr[e]);
        const tmp = MasterTrack;
        tmp.push(trackModel);
        setMasterTrack(tmp);
    };

    const pauseSound = (e) => {
        if (IsPlaying) {
            clearInterval(Timer);
            setIsPlaying(!IsPlaying);
            // stop sounds
            // TODO: fix the stop, isn't working cleanly
            for (let index = 0; index < CurrentActiveTracks.length; index++) {
                SoundService.howlPtopHandler(CurrentActiveTracks[index]);
            }
        }
        else {
            setIsPlaying(!IsPlaying);
            timerLoop = 0;
            let timer = setInterval(timerFunction, 1000);
            setTimer(timer);
        }
    };

    const recordTimerFunction = () => {
        setRecordLength(recordLoop);
        recordLoop++;
    };

    const startRecord = (e) => {
        if(IsRecording){
            clearInterval(RecordTimer);
            setIsRecording(false);
            // create downloadable track
            let mergeArray = [];
            for (let i = 0; i < MasterTrack.length; i++) {
                // find number in array
                for (let j = 0; j < soundArr.length; j++) {
                    if(soundArr[j] === MasterTrack[i].music){
                        const id = j;
                        mergeArray.push(id);
                        break;
                    }
                }
            }
            MergeService(mergeArray, RecordLength)
        }
        else{
            let timer = setInterval(recordTimerFunction, 1000);
            setRecordTimer(timer);
            setIsRecording(true);
        }
    };

    return (
        <div>
            <div>
                <Button icon={IsPlaying ? 'pause' : 'play'} onClick={pauseSound}></Button>
                <Button
                    onClick={startRecord}
                    color='red'
                    content='Record'
                    icon='record'
                    label={{ basic: true, color: 'red', pointing: 'left', content: TimeService(RecordLength) }}
                />
            </div>
            <progress className='progressBars-style' value={TimerLoop} max="7"></progress>
            <Divider />
            <Grid divided columns={3} className='DrumPad-style'>
                <Grid.Row>
                    <Grid.Column>
                        <DrumPadButton buttonId={0} onPress={changeTrack} icon={img0} />
                    </Grid.Column>
                    <Grid.Column>
                        <DrumPadButton buttonId={1} onPress={changeTrack} icon={img1} />
                    </Grid.Column>
                    <Grid.Column>
                        <DrumPadButton buttonId={2} onPress={changeTrack} icon={img2} />
                    </Grid.Column>

                </Grid.Row>
                <Divider/>
                <Grid.Row>
                    <Grid.Column>
                        <DrumPadButton buttonId={3} onPress={changeTrack} icon={img3} />
                    </Grid.Column>
                    <Grid.Column>
                        <DrumPadButton buttonId={4} onPress={changeTrack} icon={img4} />
                    </Grid.Column>
                    <Grid.Column>
                        <DrumPadButton buttonId={5} onPress={changeTrack} icon={img5} />
                    </Grid.Column>
                </Grid.Row>
                <Divider/>
                <Grid.Row>
                    <Grid.Column>
                        <DrumPadButton buttonId={6} onPress={changeTrack} icon={img6} />
                    </Grid.Column>
                    <Grid.Column>
                        <DrumPadButton buttonId={7} onPress={changeTrack} icon={img7} />
                    </Grid.Column>
                    <Grid.Column>
                        <DrumPadButton buttonId={8} onPress={changeTrack} icon={img8} />
                    </Grid.Column>
                </Grid.Row>
                
                <Grid.Row></Grid.Row>
            </Grid>
        </div>
    );
};

export default DrumPad;
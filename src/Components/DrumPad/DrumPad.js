import DrumPadButton from "Components/DrumPadButton/DrumPadButton";
import React, { useState } from "react";
import { Button, Divider, Grid } from "semantic-ui-react";
import SoundObjGenerator from "Services/SoundObjGenerator";
import SoundService from "Services/SoundService";
import TrackModel from "Models/TrackModel";
import TimeService from "Services/TimeService";
import './DrumPad.css';
import MergeService from "Services/MergeService";
import Images from "Services/StaticFiles/Images";
import Sounds from "Services/StaticFiles/Sounds";

const DrumPad = ({openPopup = undefined}) => {
    const images = Images;
    const sounds = Sounds;

    const [MasterTrack, setMasterTrack] = useState([]);
    const [IsPlaying, setIsPlaying] = useState(false);
    const [IsRecording, setIsRecording] = useState(false);
    // Timers
    let timerLoop = 0;
    const [Timer, setTimer] = useState(null);
    const [RecordTimer, setRecordTimer] = useState(null);
    // for displaying progress bar
    const [LoopNumber, setLoopNumber] = useState(0);
    const [TimerLoop, setTimerLoop] = useState(0);
    let recordLoop = 0;
    const [RecordLength, setRecordLength] = useState(0);
    const [CurrentActiveTracks, setCurrentActiveTracks] = useState([]);

    const timerFunction = () => {
        // check music to start
        if (timerLoop === 0) {
            // play all sound
            let activeTracks = [];
            for (let index = 0; index < MasterTrack.length; index++) {
                console.log(MasterTrack[index]);
                if (MasterTrack[index].endLoop === -1) {
                    let a = SoundObjGenerator.GenerateHowl(MasterTrack[index].music);
                    activeTracks.push(a);
                    SoundService.howlPlayHandler(a);
                }
            }
            setCurrentActiveTracks(activeTracks);
        }
        setTimerLoop(timerLoop)
        timerLoop++;
        if (timerLoop >= 8) {
            timerLoop = 0;
            setCurrentActiveTracks([]);
            let a = LoopNumber + 1;
            setLoopNumber(a);
        }
    };

    const changeTrack = async (e) => {
        // remove track
        for (let index = 0; index < MasterTrack.length; index++) {
            if (MasterTrack[index].id === e) {
                // remove sound
                MasterTrack[index].endLoop = LoopNumber;
                setMasterTrack(MasterTrack);
                return;
            }
        }
        // add sound
        const trackModel = TrackModel(e, sounds[e], LoopNumber);
        const tmp = MasterTrack;
        tmp.push(trackModel);
        setMasterTrack(tmp);
    };

    const stopTimerFunction = () => {
        clearInterval(Timer);
        setIsPlaying(!IsPlaying);
        // stop sound
        for (let index = 0; index < CurrentActiveTracks.length; index++) {
            SoundService.howlPtopHandler(CurrentActiveTracks[index]);
        }
    };

    const pauseSound = (e) => {
        if (IsPlaying) {
            stopTimerFunction();
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

    const startRecord = async (e) => {
        if (IsRecording) {
            clearInterval(RecordTimer);
            setIsRecording(false);
            // create downloadable track
            const finalSound = await MergeService(MasterTrack, RecordLength);
            stopTimerFunction();
            openPopup(finalSound);
        }
        else {
            let timer = setInterval(recordTimerFunction, 1000);
            setRecordTimer(timer);
            setIsRecording(true);
        }
    };

    const createButtons = () => {
        let elements = [];
        for (let index = 0; index < 3; index++) {
            elements.push( <Grid.Row> {createRow(index)} </Grid.Row> );
        }
        return elements;
    };

    const createRow = (rowNumber) => {
        let elements = [];
        for (let index = 0; index < 3; index++) {
            const id = rowNumber * 3 + index;
            elements.push(
                <Grid.Column> <DrumPadButton buttonId={id} onPress={changeTrack} icon={images[id]} /> </Grid.Column>
            );
        }
        return elements;
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
                {createButtons()}

                {/* For padding the bottom */}
                <Grid.Row></Grid.Row>
            </Grid>
        </div>
    );
};

export default DrumPad;
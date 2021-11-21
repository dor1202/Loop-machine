import DrumPadButton from "Components/DrumPadButton/DrumPadButton";
import SoundObjGenerator from "Services/SoundObjGenerator";
import { Button, Divider, Grid } from "semantic-ui-react";
import SoundService from "Services/SoundService";
import MergeService from "Services/MergeService";
import TrackModel from "Models/TrackModel";
import React, { useRef, useState } from "react";
import TimePipe from "Pipes/TimePipe";
import Images from "Models/Images";
import Sounds from "Models/Sounds";
import './DrumPad.css';

const DrumPad = ({ openPopup = undefined }) => {
    // States
    const images = Images;
    const sounds = Sounds;

    const [CurrentActiveTracks, setCurrentActiveTracks] = useState([]);
    const [IsRecording, setIsRecording] = useState(false);
    const [MasterTrack, setMasterTrack] = useState([]);
    const [IsPlaying, setIsPlaying] = useState(false);
    const [LoopNumber, setLoopNumber] = useState(0);
    // Timers
    const [RecordTimer, setRecordTimer] = useState(null);
    const [Timer, setTimer] = useState(null);
    let timerLoop = 0;
    // for displaying progress bar
    const [RecordLength, setRecordLength] = useState(0);
    const [TimerLoop, setTimerLoop] = useState(0);
    let recordLoop = 0;
    const fileInputRef = useRef({});

    const [c0, setc0] = useState(false);
    const [c1, setc1] = useState(false);
    const [c2, setc2] = useState(false);
    const [c3, setc3] = useState(false);
    const [c4, setc4] = useState(false);
    const [c5, setc5] = useState(false);
    const [c6, setc6] = useState(false);
    const [c7, setc7] = useState(false);
    const [c8, setc8] = useState(false);
    const flagArray = [
        [c0, setc0],
        [c1, setc1],
        [c2, setc2],
        [c3, setc3],
        [c4, setc4],
        [c5, setc5],
        [c6, setc6],
        [c7, setc7],
        [c8, setc8]
    ];

    // Functions
    const timerFunction = () => {
        // check music to start
        if (timerLoop === 0) {
            // play all sound
            let activeTracks = [];
            for (let index = 0; index < MasterTrack.length; index++) {
                if (MasterTrack[index].endLoop === -1) {
                    let a = SoundObjGenerator.GenerateHowl(MasterTrack[index].music);
                    activeTracks.push({ id: MasterTrack[index].id, howler: a });
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
        let similarSoundsInMaster = [];
        for (let index = 0; index < MasterTrack.length; index++) {
            if (MasterTrack[index].id === e) {
                similarSoundsInMaster.push(MasterTrack[index]);

                // not an ended same sound, for the ability to add it in next loops again
                if (MasterTrack[index].endLoop === -1) {
                    for (let index = 0; index < CurrentActiveTracks.length; index++) {
                        // stop sound
                        if (CurrentActiveTracks[index].id === e)
                            SoundService.howlPtopHandler(CurrentActiveTracks[index].howler);
                    }
                    // remove sound if already exist in the loop number
                    if (MasterTrack[index].loop !== LoopNumber) MasterTrack[index].endLoop = LoopNumber;
                    else MasterTrack.splice(index, 1);
                    setMasterTrack(MasterTrack);

                    return;
                }
            }
        }
        // add sound if not in the same loop
        if (similarSoundsInMaster.length === 0) addSound(e, sounds[e], LoopNumber);
        else {
            for (let index = 0; index < similarSoundsInMaster.length; index++) {
                // track in the same loop            
                if (similarSoundsInMaster[index].loop === LoopNumber) return;
            }
            addSound(e, sounds[e], LoopNumber);
        }
    };

    const addSound = (id, sound, loopNumber) => {
        const trackModel = TrackModel(id, sound, loopNumber);
        const tmp = MasterTrack;
        tmp.push(trackModel);
        setMasterTrack(tmp);
    };

    const stopTimerFunction = () => {
        clearInterval(Timer);
        setIsPlaying(!IsPlaying);
        // stop sound
        for (let index = 0; index < CurrentActiveTracks.length; index++) {
            SoundService.howlPtopHandler(CurrentActiveTracks[index].howler);
        }
        setCurrentActiveTracks([]);
        setLoopNumber(0);
    };

    const pauseSound = (e) => {
        if (IsPlaying) {
            stopTimerFunction();
        }
        else {
            // reset data
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
            openPopup(finalSound, MasterTrack);
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
            elements.push(<Grid.Row> {createRow(index)} </Grid.Row>);
        }
        return elements;
    };

    const createRow = (rowNumber) => {
        let elements = [];
        for (let index = 0; index < 3; index++) {
            const id = rowNumber * 3 + index;
            elements.push(
                <Grid.Column> <DrumPadButton buttonId={id} onPress={changeTrack} icon={images[id]} flag={flagArray[id][0]}/> </Grid.Column>
            );
        }
        return elements;
    };

    const uploadSound = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const uploadJsonData = JSON.parse(e.target.result);
            setMasterTrack(uploadJsonData);
            updateLightAfterUpload(uploadJsonData);
        };
    };

    const updateLightAfterUpload = (uploadJsonData) => {
        for (let index = 0; index < uploadJsonData.length; index++) {
            // check if in first loop
            console.log(uploadJsonData[index].id);
            if(uploadJsonData[index].loop === 0){
                // show light after load
                flagArray[uploadJsonData[index].id][1](true);
            }
        }
    };

    return (
        <div>
            <div>
                <Button className='playButton-style' icon='upload' onClick={() => fileInputRef.current.click()} type='file'></Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    onChange={uploadSound}
                />
                <Button className='playButton-style' icon={IsPlaying ? 'pause' : 'play'} onClick={pauseSound}></Button>
                <Button
                    className='recordButton-style'
                    onClick={startRecord}
                    color='red'
                    content='Record'
                    icon='record'
                    label={{ basic: true, color: 'red', pointing: 'left', content: TimePipe(RecordLength) }}
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
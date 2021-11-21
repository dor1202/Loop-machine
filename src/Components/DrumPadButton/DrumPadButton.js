import DrumPadLight from "Components/DrumPadLight/DrumPadLight";
import React, { useEffect, useState } from "react";
import './DrumPadButton.css';

const DrumPadButton = ({ buttonId = 0, icon = '', onPress = undefined, flag = false }) => {
    // States
    const [IsSelected, setIsSelected] = useState(false);

    useEffect(() => {
        console.log(flag);
        if(flag !== false)
            setIsSelected(true);
    }, [flag])

    // Functions
    const clickButton = (e) => {
        setIsSelected(!IsSelected);
        onPress(buttonId);
    };

    return (
        <>
            <button onClick={clickButton}  className="pushable">
            <span className="edgeGrey"></span>
            <span className="frontGrey">
                <img className='imageLogo-style' alt='err' src={icon} />
                <DrumPadLight isOn={IsSelected}/>
            </span>
            </button>
        </>
    );
};

export default DrumPadButton;
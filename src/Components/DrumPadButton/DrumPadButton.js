import DrumPadLight from "Components/DrumPadLight/DrumPadLight";
import React, { useState } from "react";
import './DrumPadButton.css';

const DrumPadButton = ({ buttonId = 0, icon = '', onPress = undefined }) => {
    const [IsSelected, setIsSelected] = useState(false);

    const clickButton = (e) => {
        setIsSelected(!IsSelected);
        onPress(buttonId);
    };

    return (
        <>
            <button onClick={clickButton}  className="pushable space">
            <span className="edgeOrange"></span>
            <span className="frontOrange">
                <img className='imageLogo-style' alt='err' src={icon} />
                <DrumPadLight isOn={IsSelected}/>
            </span>
            </button>
        </>
    );
};

export default DrumPadButton;
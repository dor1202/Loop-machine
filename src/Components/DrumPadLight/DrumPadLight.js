import './DrumPadLight.css';
import React from "react";

const DrumPadLight = ({isOn = false}) => {
    return(
        <div className={isOn? 'activeDot' : 'inActiveDot'}></div>
    );
};

export default DrumPadLight;
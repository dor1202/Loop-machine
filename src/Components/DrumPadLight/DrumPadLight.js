import React from "react";
import './DrumPadLight.css';

const DrumPadLight = ({isOn = false}) => {
    return(
        <div className={isOn? 'activeDot' : 'inActiveDot'}></div>
    );
};

export default DrumPadLight;
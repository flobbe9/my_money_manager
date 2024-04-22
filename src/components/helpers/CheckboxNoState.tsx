import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import { log } from "../../utils/basicUtils";


interface Props extends DefaultProps {
    onValueChange?: () => void,
    defaultValue?: boolean
}


export default function CheckboxNoState({onValueChange, defaultValue, ...otherProps}: Props) {

    const { style } = getCleanDefaultProps(otherProps);
    
    const [isChecked, setIsChecked] = useState(defaultValue);


    function handleValueChange(event): void {

        // state
        setIsChecked(!isChecked);

        // custom callback
        if (onValueChange)
            onValueChange();
    }


    return (
        <Checkbox 
            style={{...style}}
            value={isChecked} 
            onValueChange={handleValueChange} 
            />
    );
}
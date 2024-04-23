import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, StyleProp, Text } from "react-native";
import { genericStyles } from "../../assets/styles/genericsStyles";
import { log } from "../../utils/basicUtils";


interface Props extends DefaultProps {
    initialValue: boolean,
    handleValueChange: (isChecked: boolean) => void,
    icon?: JSX.Element,
    _inner?: StyleProp<any>,
    _checked?: StyleProp<any>,
    _unchecked?: StyleProp<any>,
}


/**
 * @since 0.0.1
 */
export default function Checkbox({
    initialValue,
    handleValueChange,
    icon,
    _inner,
    _checked,
    _unchecked,
    ...otherProps}: Props) {

    const { id, style, children } = getCleanDefaultProps(otherProps, "Checkbox");

    const [isChecked, setIsChecked] = useState(initialValue);

    const [innerStyleState, setInnerStyleState] = useState<StyleProp<any>>({...styles.unchecked, ..._unchecked});


    function updateStyle(isChecked: boolean): void {

        setInnerStyleState(
            isChecked ? {...styles.checked, ..._checked} : {...styles.unchecked, ..._unchecked}
        );
    }


    function handleTouch(event): void {

        setIsChecked(!isChecked);
        handleValueChange(!isChecked);

        updateStyle(!isChecked);
    }


    return (
        // Outer
        <View 
            id={id} 
            style={{
                ...styles.outer, 
                ...style, 
            }}
            onTouchStart={handleTouch}
            >
            {/* Inner */}
            <View 
                style={{
                    ...styles.inner,
                    ...innerStyleState,
                    ..._inner,
                }}>

                {/* Icon */}
                <Text style={isChecked ? {} : {...genericStyles.hidden}}>
                    {icon}
                </Text>
                
                {children}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    outer: {
        ...genericStyles.blackSolidBorder,
        borderWidth: 3,
        borderRadius: 3,
        height: 30,
        width: 30
    },
    
    inner: {
        ...genericStyles.backgroundColorTab,
        height: 24, // = outer.height - 2x outer.borderWidth
        width: 24, // = outer.width - 2x outer.borderWidth
    },

    checked: {
        backgroundColor: "green",
    },

    unchecked: {
        ...genericStyles.backgroundColorTab,
    }
});
import { DimensionValue, FlexStyle, StyleProp, ViewStyle } from "react-native";


/**
 * List of Styleprops an Icon from react-native-vector-icons can have.
 * 
 * @since 0.0.1
 */
export interface IconStyleProps {
    
    backgroundColor: string,
    borderWidth: number,
    borderColor: string,
    borderRadius: number,
    padding: DimensionValue,
    margin: DimensionValue,
    color: string,
    fontSize: number
}
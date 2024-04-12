import { StyleProp, StyleSheet } from "react-native";


export const genericStyles: StyleSheet.NamedStyles<any> = {

    mt1: {
        marginTop: 10
    },
    mt2: {
        marginTop: 20
    },
    mt3: {
        marginTop: 30
    },
    mt4: {
        marginTop: 40
    },

    textCenter: {
        textAlign: "center"
    },
    textLeft: {
        textAlign: "left"
    },
    textRight: {
        textAlign: "right"
    },

    flexCenter: {
        display: "flex",
        justifyContent: "center"
    },
    flexLeft: {
        display: "flex",
        justifyContent: "flex-start"
    },
    flexRight: {
        display: "flex",
        justifyContent: "flex-end"
    },
}
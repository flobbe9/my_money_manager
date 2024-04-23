import { StyleProp, StyleSheet } from "react-native";


export const genericStyles: StyleSheet.NamedStyles<any> = {

    hidden: {
        display: "none"
    },

    // Border
    blackSolidBorder: {
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1
    },

    borderNone: {
        borderWidth: 0
    },

    backgroundColorTab: {
        backgroundColor: "rgb(242, 242, 242)"
    },

    // Dont rename these!!!
    textCenter: {
        textAlign: "center"
    },
    textLeft: {
        textAlign: "left"
    },
    textRight: {
        textAlign: "right"
    },

    // Dont rename these!!!
    flexCenter: {
        flexDirection: "row",
        justifyContent: "center"
    },
    flexLeft: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    flexRight: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    flexOne: {
        flex: 1
    },
    flexTwo: {
        flex: 2
    },

    // MarginTop
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
    mt5: {
        marginTop: 50
    },

    // MarginBottom
    mb1: {
        marginBottom: 10
    },
    mb2: {
        marginBottom: 20
    },
    mb3: {
        marginBottom: 30
    },
    mb4: {
        marginBottom: 40
    },
    mb5: {
        marginBottom: 50
    },

    // MarginRight
    me1: {
        marginRight: 10
    },
    me2: {
        marginRight: 20
    },
    me3: {
        marginRight: 30
    },
    me4: {
        marginRight: 40
    },
    me5: {
        marginRight: 50
    },

    // MarginLeft
    ms1: {
        marginLeft: 10
    },
    ms2: {
        marginLeft: 20
    },
    ms3: {
        marginLeft: 30
    },
    ms4: {
        marginLeft: 40
    },
    ms5: {
        marginLeft: 50
    },

    // PaddingTop
    pt1: {
        paddingTop: 10
    },
    pt2: {
        paddingTop: 20
    },
    pt3: {
        paddingTop: 30
    },
    pt4: {
        paddingTop: 40
    },
    pt5: {
        paddingTop: 50
    },

    // PaddingBottom
    pb1: {
        paddingBottom: 10
    },
    pb2: {
        paddingBottom: 20
    },
    pb3: {
        paddingBottom: 30
    },
    pb4: {
        paddingBottom: 40
    },
    pb5: {
        paddingBottom: 50
    },

    // PaddingRight
    pe1: {
        paddingRight: 10
    },
    pe2: {
        paddingRight: 20
    },
    pe3: {
        paddingRight: 30
    },
    pe4: {
        paddingRight: 40
    },
    pe5: {
        paddingRight: 50
    },
    
    // PaddingLeft
    ps1: {
        paddingLeft: 10
    },
    ps2: {
        paddingLeft: 20
    },
    ps3: {
        paddingLeft: 30
    },
    ps4: {
        paddingLeft: 40
    },
    ps5: {
        paddingLeft: 50
    },
}
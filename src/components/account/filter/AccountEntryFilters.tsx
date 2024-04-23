import React, { ReactNode } from "react";
import DefaultProps, { getCleanDefaultProps } from "../../../abstract/DefaultProps";
import { Text, View } from "react-native";
import BlackText from "../../helpers/BlackText";
import { genericStyles } from "../../../assets/styles/genericsStyles";
import AccountEntryCategoryFilter from "./AccountEntryCategoryFilter";
import E_AccountEntryCategory from "../../../entities/account/E_AccountEntryCategory";
import AccountEntryFilter from "../../../abstract/AccountEntryFilter";
import { useRealm } from "@realm/react";
import Dao from "../../../repositories/Dao";


interface Props extends DefaultProps {
}


/**
 * @since 0.0.1
 */
export default function AccountEntryFilters({...otherProps}: Props) {

    const { style, children } = getCleanDefaultProps(otherProps, "AccountEntryFilter");
    

    return (
        <View style={{...style}}>
            {/* Categories */}
            <AccountEntryCategoryFilter />

            {children}
        </View>
    )
}
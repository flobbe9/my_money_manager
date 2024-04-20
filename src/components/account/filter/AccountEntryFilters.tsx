import React, { ReactNode } from "react";
import DefaultProps, { getCleanDefaultProps } from "../../../abstract/DefaultProps";
import { Text, View } from "react-native";
import AccountEntryFilterWrapper from "../../../abstract/account/AccountEntryFilterWrapper";
import BlackText from "../../helpers/BlackText";
import { genericStyles } from "../../../assets/styles/genericsStyles";
import AccountEntryCategoryFilter from "./AccountEntryCategoryFilter";
import AccountEntryCategoryWrapper from "../../../abstract/account/AccountEntryCategoryWrapper";


// TODO: replace with  real data
const allCagetories: AccountEntryCategoryWrapper[] = [
    {
        name: "Monthly"
    },
    {
        name: "shopping"
    },
]


interface Props extends DefaultProps {
    filters: AccountEntryFilterWrapper,
    setFilters: (accountEntryFilterWrapper: AccountEntryFilterWrapper) => void
}


/**
 * @since 0.0.1
 */
export default function AccountEntryFilters({filters, setFilters, ...otherProps}: Props) {

    const { style, children } = getCleanDefaultProps(otherProps, "AccountEntryFilter");
    

    return (
        <View style={{...style}}>
            {/* Categories */}
            <AccountEntryCategoryFilter filters={filters} setFilters={setFilters} allCategories={allCagetories} />

            {children}
        </View>
    )
}
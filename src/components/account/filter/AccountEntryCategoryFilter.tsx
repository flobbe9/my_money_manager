import React, { ReactNode, useEffect, useState } from "react";
import DefaultProps, { getCleanDefaultProps } from "../../../abstract/DefaultProps";
import { Text, View } from "react-native";
import AccountEntryFilterWrapper from "../../../abstract/account/AccountEntryFilterWrapper";
import BlackText from "../../helpers/BlackText";
import { genericStyles } from "../../../assets/styles/genericsStyles";
import AccountEntryCategoryWrapper from "../../../abstract/account/AccountEntryCategoryWrapper";
import { getRandomString, log } from "../../../utils/basicUtils";
import Flex from "../../helpers/Flex";
import Checkbox from "../../helpers/CheckboxNoState";


interface Props extends DefaultProps {
    allCategories: AccountEntryCategoryWrapper[],
    filters: AccountEntryFilterWrapper,
    setFilters: (accountEntryFilterWrapper: AccountEntryFilterWrapper) => void
}


/**
 * @since 0.0.1
 */
// TODO: make value listener faster
export default function AccountEntryCategoryFilter({allCategories, filters, setFilters, ...otherProps}: Props) {

    const { style, children } = getCleanDefaultProps(otherProps, "AccountEntryCategoryFilter");


    /**
     * Updates the ```filters``` state.
     * 
     * @param filters to set the state to. Default is ```props.filters```
     */
    function updateFilters(newFilters = filters): void {

        setFilters({...newFilters});
    }


    /**
     * Add or remove ```category``` to/from ```filters``` and update state.
     * 
     * @param category to add or remove
     */
    function handleValueChange(category: AccountEntryCategoryWrapper): void {

        if (AccountEntryCategoryWrapper.includes(filters.categories, category))
            AccountEntryCategoryWrapper.remove(filters.categories, category);

        else 
            AccountEntryCategoryWrapper.pushAvoidDuplicate(filters.categories, category);

        updateFilters();
    }


    function mapCheckboxes(): JSX.Element[] {

        return allCategories.map(category =>
            <Flex flex="left" key={getRandomString()}>
                {/* Label */}
                <BlackText>{category.name}</BlackText>

                {/* Checkbox */}
                <Checkbox 
                    style={{height: 30, width: 30}}
                    onValueChange={() => handleValueChange(category)}
                    defaultValue={AccountEntryCategoryWrapper.includes(filters.categories, category)}
                    />
            </Flex>
        )
    }
    

    return (
        <View style={{...style, ...genericStyles.flexLeft}}>
            {mapCheckboxes()}

            {children}
        </View>
    )
}
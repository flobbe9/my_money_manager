import React, { ReactNode, useEffect, useState } from "react";
import DefaultProps, { getCleanDefaultProps } from "../../../abstract/DefaultProps";
import { Text, View } from "react-native";
import BlackText from "../../helpers/BlackText";
import { genericStyles } from "../../../assets/styles/genericsStyles";
import E_AccountEntryCategory from "../../../entities/account/E_AccountEntryCategory";
import { getRandomString, log } from "../../../utils/basicUtils";
import Flex from "../../helpers/Flex";
import Checkbox from "../../helpers/CheckboxNoState";
import AccountEntryFilter from "../../../abstract/AccountEntryFilter";
import { useRealm } from "@realm/react";
import Dao from "../../../repositories/Dao";


interface Props extends DefaultProps {
    filters: AccountEntryFilter,
    setFilters: (accountEntryFilters: AccountEntryFilter) => void
}


/**
 * @since 0.0.1
 */
// TODO: make value listener faster
export default function AccountEntryCategoryFilter({filters, setFilters, ...otherProps}: Props) {

    const { style, children } = getCleanDefaultProps(otherProps, "AccountEntryCategoryFilter");

    const dao = new Dao(useRealm());


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
    function handleValueChange(category: E_AccountEntryCategory): void {

        if (E_AccountEntryCategory.includes(filters.categories, category))
            E_AccountEntryCategory.remove(filters.categories, category);

        else 
            E_AccountEntryCategory.pushAvoidDuplicate(filters.categories, category);

        updateFilters();
    }


    function mapCheckboxes(): JSX.Element[] {

        const allCategories = dao.findAll(E_AccountEntryCategory);

        return allCategories.map(category =>
            <Flex flex="left" key={getRandomString()}>
                {/* Label */}
                <BlackText>{category.name}</BlackText>

                {/* Checkbox */}
                <Checkbox 
                    style={{height: 30, width: 30}}
                    onValueChange={() => handleValueChange(category)}
                    defaultValue={E_AccountEntryCategory.includes(filters.categories, category)}
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
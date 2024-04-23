import React, { ReactNode, useContext, useEffect, useState } from "react";
import DefaultProps, { getCleanDefaultProps } from "../../../abstract/DefaultProps";
import { Text, View,StyleSheet } from "react-native";
import BlackText from "../../helpers/BlackText";
import { genericStyles } from "../../../assets/styles/genericsStyles";
import E_AccountEntryCategory from "../../../entities/account/E_AccountEntryCategory";
import { getRandomString, log } from "../../../utils/basicUtils";
import Flex from "../../helpers/Flex";
import AccountEntryFilter from "../../../abstract/AccountEntryFilter";
import { useRealm } from "@realm/react";
import Dao from "../../../repositories/Dao";
import { AccountContext } from "../Account";
import Checkbox from "../../helpers/Checkbox";
// import Icon from "../../helpers/Icon";
import Icon from "react-native-vector-icons";


interface Props extends DefaultProps {
}


/**
 * @since 0.0.1
 */
export default function AccountEntryCategoryFilter({...otherProps}: Props) {

    const { style, children } = getCleanDefaultProps(otherProps, "AccountEntryCategoryFilter");

    const [checkBoxes, setCheckboxes] = useState<JSX.Element[]>([]);

    const { filters, setFilters } = useContext(AccountContext);

    const dao = new Dao(useRealm());
    // TODO: cache this somehow
    const allCategories = dao.findAll(E_AccountEntryCategory);////


    useEffect(() => {
        setCheckboxes(mapCheckboxes());

    }, [])


    /**
     * Updates the ```filters``` state with current ```filters``` object.
     */
    function updateFilters(): void {

        setFilters(AccountEntryFilter.getCopy(filters));
    }


    /**
     * Add or remove ```category``` to/from ```filters``` and update state.
     * 
     * @param category to add or remove
     */
    function handleValueChange(category: E_AccountEntryCategory): void {

        if (category.isIncluded(filters.categories))
            filters.removeCategory(category);

        else 
            filters.addCategory(category);

        updateFilters();
    }


    function mapCheckboxes(): JSX.Element[] {

        return allCategories.map(category => {
            const isChecked = category.isIncluded(filters.categories);

            return <Flex flex="left" key={getRandomString()}>
                {/* Label */}
                <BlackText>{category.name}</BlackText>
                
                {/* Checkbox */}
                <Checkbox
                    initialValue={isChecked} 
                    handleValueChange={(isChecked) => handleValueChange(category)}
                    style={{...styles.checkboxStyle}}
                    icon={<Icon name="check" size={24} color="black" />}
                    _inner={{...styles.checkbox_inner}}
                    _checked={{...styles.checkbox_checked}}
                    />
            </Flex>
        })
    }
    

    return (
        <View style={{...style, ...genericStyles.flexLeft}}>
            {checkBoxes}

            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    checkboxStyle: {
        borderWidth: 3,
        height: 30,
        width: 30,
    },

    checkbox_inner: {
        height: 24,
        width: 24,
    }, 

    checkbox_checked: {
        backgroundColor: "bisque"
    }
})
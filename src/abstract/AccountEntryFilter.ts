import { datePlusYears, isBlank, log } from "../utils/basicUtils";
import E_AccountEntryCategory from "../entities/account/E_AccountEntryCategory";
import E_AccountEntry from "../entities/account/E_AccountEntry";
import { ObjectSchema } from "realm";
import AbstractEntity from "./AbstractEntity";


/**
 * All min and max values are inclusive.
 * 
 * @since 0.0.1
 */
export default class AccountEntryFilter {
    
    minAmount?: number;
    maxAmount?: number;

    categories?: E_AccountEntryCategory[];
    
    minDate?: Date; 
    maxDate?: Date; 

    note?: string;


    /**
     * Filter given entries by ```category```.
     * 
     * @param entries to filter
     * @param filters with list of categories to filter by
     * @returns array of entries with a category included in ```filters.categories```. Return unfiltered ```entries``` if there are
     * no ```filters.categories``` at all.
     */
    static filterByCategory(entries: JSX.Element[], filters: AccountEntryFilter): JSX.Element[] {

        // case: no categories
        if (!filters || !filters.categories || !filters.categories.length)
            return entries;
    
        // filter
        return entries.filter(entryComponent => 
            E_AccountEntryCategory.includes(filters.categories, entryComponent.props.entry.category))
    }


    /**
     * Filter given entries by ```note```.
     * 
     * @param entries to filter
     * @param filters with list of categories to filter by
     * @returns array of entries with a note included in ```filters.note```. Return unfiltered ```entries``` if there's no note in ```filters```.
     */
    static filterByNote(entries: E_AccountEntry[], filters: AccountEntryFilter): E_AccountEntry[] {
    
        // case: no notes
        if (!filters || isBlank(filters.note))
            return entries;
    
        // filter
        // TODO
        // return entries.filter(entry => 
        //     filters.note === entry.note)
    }


    /**
     * @returns instance with values that should act like no filters are applied at all. Does not include ```undefined``` or ```null```
     */
    static getDefaultInstance(): AccountEntryFilter {

        return {
            categories: [],
            minAmount: Number.MIN_VALUE,
            maxAmount: Number.MAX_VALUE,
            minDate: new Date(0),
            maxDate: datePlusYears(100),
            note: ""
        }
    }
}
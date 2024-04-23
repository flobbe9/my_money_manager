import { datePlusYears, isBlank, log } from "../utils/basicUtils";
import E_AccountEntryCategory from "../entities/account/E_AccountEntryCategory";
import E_AccountEntry from "../entities/account/E_AccountEntry";
import AccountEntryContainer from './../components/account/AccountEntryContainer';


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


    constructor(
        minAmount?: number,
        maxAmount?: number,
        categories?: E_AccountEntryCategory[],
        minDate?: Date, 
        maxDate?: Date, 
        note?: string
    ) {

        this.minAmount = minAmount,
        this.maxAmount = maxAmount,
        this.categories = categories,
        this.minDate = minDate, 
        this.maxDate = maxDate, 
        this.note = note
    }
    

    addCategory(category: E_AccountEntryCategory): void {

        if (category.isIncluded(this.categories))
            return;

        this.categories.push(category);
    }
    

    /**
     * Remove ```category``` if present in ```categories```. Alters ```categories```.
     * 
     * @param categories to remove ```category``` from
     * @param category to remove from ```categories```
     */
    removeCategory(category: E_AccountEntryCategory): void {

        const categoryIndex = this.categories.indexOf(category);

        // case: category not present in list
        if (categoryIndex === -1)
            return;

        this.categories.splice(categoryIndex, 1);
    }


    /**
     * Filter given entries by ```category```.
     * 
     * @param entries list of {@link AccountEntryContainer}s components to filter
     * @returns array of entries with a category included in ```filters.categories```. Return unfiltered ```entries``` if there are
     * no ```filters.categories``` at all.
     */
    filterByCategory(entries: JSX.Element[]): JSX.Element[] {

        // case: no categories
        if (!this.categories || !this.categories.length)
            return entries;
    
        // filter
        return entries.filter(entryComponent => 
            (entryComponent.props.entry.category as E_AccountEntryCategory).isIncluded(this.categories))
    }


    /**
     * Filter given entries by ```note```.
     * 
     * @param entries to filter
     * @param filters with list of categories to filter by
     * @returns array of entries with a note included in ```filters.note```. Return unfiltered ```entries``` if there's no note in ```filters```.
     */
    filterByNote(entries: E_AccountEntry[]): E_AccountEntry[] {
    
        // case: no notes
        if (!this || isBlank(this.note))
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

        return new AccountEntryFilter(
            Number.MIN_VALUE,
            Number.MAX_VALUE,
            [],
            new Date(0),
            datePlusYears(100),
            ""
        )
    }


    static getCopy(filters: AccountEntryFilter) {

        return new AccountEntryFilter(
            filters.minAmount,
            filters.maxAmount,
            filters.categories,
            filters.minDate, 
            filters.maxDate, 
            filters.note            
        )
    }
}
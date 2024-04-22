import { ObjectSchema, Results } from "realm";
import E_AccountEntry from "./E_AccountEntry";
import AbstractEntity from "../../abstract/AbstractEntity";
import { SortOrder } from "../../abstract/SortOrder";
import { dateEquals } from "../../utils/basicUtils";
import { EntityCollection } from "../../abstract/EntityCollection";


// TODO: validation methods for all interfaces
// TODO: parsing methods
/**
 * @since 0.0.1
 */
export default class E_Account extends AbstractEntity<E_Account> {
    
    static schema: ObjectSchema = {
        name: "E_Account",
        properties: {
            ...AbstractEntity.DEFAULT_SCHEMA_PROPS,

            name: "string",

            total: "int",

            accountEntries: "E_AccountEntry[]"
        },
        primaryKey: "id"
    };

    name!: string;

    total!: number;

    accountEntries: Results<E_AccountEntry>;


    /**
     * @param entries to sort
     * @param sortOrder @see SortOrder, default is ```ASC```
     * @returns altered entries array sorted by date
     */
    sortEntriesByDateOfExpense(sortOrder = SortOrder.ASC): Results<E_AccountEntry> {
    
        return this.accountEntries.sorted("dateOfExpense", sortOrder !== SortOrder.ASC);
    }
    
    
    /**
     * @param sortOrder @see SortOrder, default is ```ASC```
     * @returns altered entries array sorted by created field
     */
    static sortEntriesByCreated(accountEntries: Results<E_AccountEntry>, sortOrder = SortOrder.ASC): Results<E_AccountEntry> {
    
        return accountEntries.sorted("created", sortOrder !== SortOrder.ASC);
    }


    /**
     * @param accountEntries to sort
     * @param sortOrder @see SortOrder, default is ```ASC```
     * @returns altered entries array sorted by created field
     */
    static sortEntriesByCreatedReturnArray(accountEntries: E_AccountEntry[], sortOrder = SortOrder.ASC): E_AccountEntry[] {
        
        return accountEntries.sort((e1, e2) => {
            const date1 = e1.created;
            const date2 = e2.created;
    
            if (date1 === date2)
                return 0;
    
            if (date1 < date2) {
                if (sortOrder === SortOrder.ASC)
                    return -1;
    
                return 1;                
            }
    
            if (sortOrder === SortOrder.ASC)
                return 1;
    
            return -1;
        });
    }
    
    
    splitEntriesByDate(sorted = false): E_AccountEntry[][] {
    
        // case: no entries
        if (!this.accountEntries.length)
            return [];
    
        const entryGroups: E_AccountEntry[][] = [];
    
        // case: not sorted by date yet
        if (!sorted)
            this.sortEntriesByDateOfExpense();
    
        let prevEntry: E_AccountEntry = this.accountEntries[0];
        let currentEntryGroup: E_AccountEntry[] = [];
    
        this.accountEntries.forEach(entry => {
            // case: new date
            if (!dateEquals(prevEntry.dateOfExpense, entry.dateOfExpense)) {
                entryGroups.push(currentEntryGroup);
                currentEntryGroup = [];
            }
            
            currentEntryGroup.push(entry);
            prevEntry = entry;
        });
    
        // push last group
        entryGroups.push(currentEntryGroup);
    
        return entryGroups;
    }
}
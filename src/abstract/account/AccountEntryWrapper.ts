import { clearTimeFromDate, dateEquals, log } from "../../utils/basicUtils";
import AccountEntryCategoryWrapper from "./AccountEntryCategoryWrapper";
import { SortOrder } from "../SortOrder";


/**
 * @since 0.0.1
 */
export default class AccountEntryWrapper {
    amount: number;
    category: AccountEntryCategoryWrapper;
    date: Date;
    created: Date;
    note?: string;
    
    
    /**
     * @param entries to sort
     * @param sortOrder @see SortOrder, default is ```ASC```
     * @returns altered entries array sorted by date
     */
    static sortEntriesByDate(entries: AccountEntryWrapper[], sortOrder = SortOrder.ASC): AccountEntryWrapper[] {
    
        return entries.sort((e1, e2) => {
            const date1 = e1.date;
            const date2 = e2.date;
    
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
    
    
    /**
     * @param entries to sort
     * @param sortOrder @see SortOrder, default is ```ASC```
     * @returns altered entries array sorted by created field
     */
    static sortEntriesByCreated(entries: AccountEntryWrapper[], sortOrder = SortOrder.ASC): AccountEntryWrapper[] {
    
        return entries.sort((e1, e2) => {
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
    
    
    static splitEntriesByDate(entries: AccountEntryWrapper[], sorted = false): AccountEntryWrapper[][] {
    
        // case: no entries
        if (!entries.length)
            return [];
    
        const entryGroups: AccountEntryWrapper[][] = [];
    
        // case: not sorted by date yet
        if (!sorted)
            this.sortEntriesByDate(entries);
    
        let prevEntry: AccountEntryWrapper = entries[0];
        let currentEntryGroup: AccountEntryWrapper[] = [];
    
        entries.forEach(entry => {
            // case: new date
            if (!dateEquals(prevEntry.date, entry.date)) {
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
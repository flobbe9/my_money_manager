import { clearTimeFromDate, dateEquals, log } from "../utils/basicUtils";
import AccountCategory from "./AccountCategory";
import { SortOrder } from "./SortOrder";


/**
 * @since 0.0.1
 */
export default interface AccountEntry {
    amount: number,
    category: AccountCategory,
    date: Date,
    created: Date,
    note?: string,
}


/**
 * @param entries to sort
 * @param sortOrder @see SortOrder, default is ```ASC```
 * @returns altered entries array sorted by date
 */
export function sortEntriesByDate(entries: AccountEntry[], sortOrder = SortOrder.ASC): AccountEntry[] {

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
export function sortEntriesByCreated(entries: AccountEntry[], sortOrder = SortOrder.ASC): AccountEntry[] {

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


export function splitEntriesByDate(entries: AccountEntry[], sorted = false): AccountEntry[][] {

    // case: no entries
    if (!entries.length)
        return [];

    const entryGroups: AccountEntry[][] = [];

    // case: not sorted by date yet
    if (!sorted)
        sortEntriesByDate(entries);

    let prevEntry: AccountEntry = entries[0];
    let currentEntryGroup: AccountEntry[] = [];

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

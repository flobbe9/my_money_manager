import { log } from "../../utils/basicUtils";

export default class AccountEntryCategoryWrapper {
    name: string;
    
    
    /**
     * Normal ```includes``` method but using {@link equals()} method from this class.
     * 
     * The "Haystack" is beeing refered to as the collection of objects to search the "needle" in. The "needle" is the 
     * AccountEntryCategoryWrapper to search.
     * 
     * @param hayStack to search needle in
     * @param needle to look for
     * @returns true if needle is present at least once in hayStack
     */
    static includes(hayStack: Iterable<AccountEntryCategoryWrapper>, needle: AccountEntryCategoryWrapper): boolean {

        for (const category of hayStack) {
            if (this.equals(needle, category)) 
                return true;
        }
        
        return false;
    }


    /**
     * @param c1 
     * @param c2 
     * @returns compare by ```name``` only
     */
    static equals(c1: AccountEntryCategoryWrapper, c2: AccountEntryCategoryWrapper): boolean {

        return c1.name === c2.name;
    }


    /**
     * Only pushes ```category``` if not present in ```categories``` already. Alters ```categories```.
     * 
     * @param categories to push ```category``` into
     * @param category to push into ```categories```
     */
    static pushAvoidDuplicate(categories: AccountEntryCategoryWrapper[], category: AccountEntryCategoryWrapper): void {

        if (this.includes(categories, category))
            return;

        categories.push(category);
    }


    /**
     * Remove ```category``` if present in ```categories```. Alters ```categories```.
     * 
     * @param categories to remove ```category``` from
     * @param category to remove from ```categories```
     */
    static remove(categories: AccountEntryCategoryWrapper[], category: AccountEntryCategoryWrapper): void {

        const categoryIndex = categories.indexOf(category);

        // case: category not present in list
        if (categoryIndex === -1)
            return;

        categories.splice(categoryIndex, 1);
    }
}
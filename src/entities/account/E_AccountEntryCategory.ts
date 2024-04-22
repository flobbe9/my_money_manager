import { ObjectSchema } from "realm";
import AbstractEntity from "../../abstract/AbstractEntity";
import { log } from "../../utils/basicUtils";
import { Realm } from "realm";


/**
 * @since 0.0.1
 */
export default class E_AccountEntryCategory extends AbstractEntity<E_AccountEntryCategory> {
    
    static schema: ObjectSchema = {
        name: "E_AccountEntryCategory",
        properties: {
            ...AbstractEntity.DEFAULT_SCHEMA_PROPS,

            name: "string"
        },
        primaryKey: "id"
    };

    name!: string;

    // TODO: backreference to entry


    /**
     * Normal ```includes``` method but using {@link equals()} method from this class.
     * 
     * The "Haystack" is beeing refered to as the collection of objects to search the "needle" in. The "needle" is the 
     * E_AccountEntryCategory to search.
     * 
     * @param hayStack to search needle in
     * @param needle to look for
     * @returns true if needle is present at least once in hayStack
     */
    static includes(hayStack: Iterable<E_AccountEntryCategory>, needle: E_AccountEntryCategory): boolean {

        for (const category of hayStack) 
            if (this.equals(needle, category)) 
                return true;
        
        return false;
    }
    
    
    /**
     * @param c1 
     * @param c2 
     * @returns compare by ```name``` only
     */
    static equals(c1: E_AccountEntryCategory, c2: E_AccountEntryCategory): boolean {

        return c1.name === c2.name;
    }


    /**
     * Only pushes ```category``` if not present in ```categories``` already. Alters ```categories```.
     * 
     * @param categories to push ```category``` into
     * @param category to push into ```categories```
     */
    static pushAvoidDuplicate(categories: E_AccountEntryCategory[], category: E_AccountEntryCategory): void {

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
    static remove(categories: E_AccountEntryCategory[], category: E_AccountEntryCategory): void {

        const categoryIndex = categories.indexOf(category);

        // case: category not present in list
        if (categoryIndex === -1)
            return;

        categories.splice(categoryIndex, 1);
    }
}
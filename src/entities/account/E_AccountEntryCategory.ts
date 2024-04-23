import { ObjectSchema } from "realm";
import AbstractEntity from "../../abstract/AbstractEntity";
import { log } from "../../utils/basicUtils";
import { Realm } from "realm";
import { useRealm } from "@realm/react";


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


    constructor(realm: Realm, name: string) {

        super(realm, {
            name: name
        })
        this.name = name;
    }

    // TODO: backreference to entry

    /**
     * Normal ```includes``` method but using {@link equals()} method from this {@link E_AccountEntryCategory}.
     * 
     * The "Haystack" is beeing refered to as the collection of objects to search the ```this``` in. 
     * 
     * @param hayStack to search ```this``` in
     * @returns true if ```this``` is present at least once in hayStack
     */
    isIncluded(hayStack: Iterable<E_AccountEntryCategory>): boolean {

        for (const category of hayStack) 
            if (this.equals(category)) 
                return true;
        
        return false;
    }
    
    
    /**
     * @param c1 
     * @param c2 
     * @returns compare by ```name``` only
     */
    equals(c2: E_AccountEntryCategory): boolean {

        return this.name === c2.name;
    }
}
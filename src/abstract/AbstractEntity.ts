import { ObjectSchema, Realm } from "realm";


/**
 * Abstract superclass for any realm schema class.
 * 
 * @since 0.0.1
 */
export default abstract class AbstractEntity<T extends AbstractEntity<T>> extends Realm.Object<T> {

    id!: number;

    created: Date;

    updated: Date;


    static DEFAULT_SCHEMA_PROPS = {

        id: "int",

        created: "date?",

        updated: "date?"
    }
}
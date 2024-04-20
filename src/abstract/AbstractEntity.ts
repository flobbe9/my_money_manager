import { BSON, ObjectSchema, Realm } from "realm";


export default abstract class AbstractEntity extends Realm.Object<AbstractEntity> {

    id: number;

    created: Date;

    updated: Date;
    
    static schema: ObjectSchema = {
        name: "AbstractEntity",
        properties: {
            id: "number",

            created: "Date",
        
            updated: "Date"
        },
        primaryKey: "id"
    }
}
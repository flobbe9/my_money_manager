import { ObjectSchema, Realm } from "realm";
import AccountCategory from "../abstract/AccountCategory";
import AbstractEntity from "../abstract/AbstractEntity";


export default class TestObject extends AbstractEntity {

    amount: number;

    category: AccountCategory;

    dateOfEntry: Date;

    note?: string;


    static schema: ObjectSchema = {
        name: 'TestObject',
        properties: {
            amount: "number",

            category: "AccountCategory",
        
            dateOfEntry: "Date",
        
            note: "string?"
        },
    };
}
import { ObjectSchema } from "realm";
import { SortOrder } from "../../abstract/SortOrder";
import { clearTimeFromDate, dateEquals, log } from "../../utils/basicUtils";
import E_AccountEntryCategory from "./E_AccountEntryCategory";
import AbstractEntity from "../../abstract/AbstractEntity";
import E_Account from "./E_Account";
import { EntityCollection } from "../../abstract/EntityCollection";


/**
 * @since 0.0.1
 */
export default class E_AccountEntry extends AbstractEntity<E_AccountEntry> {

    static schema: ObjectSchema = {
        name: "E_AccountEntry",
        properties: {
            ...AbstractEntity.DEFAULT_SCHEMA_PROPS,

            account: {
                type: "linkingObjects",
                objectType: "E_Account",
                property: "accountEntries"
            },

            amount: "int",

            category: "E_AccountEntryCategory",

            dateOfExpense: "date",

            note: "string?"
        }
    }

    account: E_Account;

    amount!: number;

    category!: E_AccountEntryCategory;

    dateOfExpense!: Date;

    note?: string;
}
import { useRealm } from "@realm/react";
import E_Account from "../entities/account/E_Account";
import E_AccountEntry from "../entities/account/E_AccountEntry";
import E_AccountEntryCategory from "../entities/account/E_AccountEntryCategory";
import { log } from "../utils/basicUtils";
import { useEffect, useState } from "react";
import Dao from "../repositories/Dao";
import { Realm } from 'realm';


export function useMockData(realm: Realm): E_Account[] {

    const dao = new Dao(realm);


    function generateMockAccounts(): E_Account[] {

        // category
        let shoppingCategory = dao.findById<E_AccountEntryCategory>(E_AccountEntryCategory, 1);
        if (!shoppingCategory)
            shoppingCategory = dao.create<E_AccountEntryCategory>(E_AccountEntryCategory, {
                id: 1,
                name: "shopping"
            })

        let monthlyCategory = dao.findById<E_AccountEntryCategory>(E_AccountEntryCategory, 2);
        if (!monthlyCategory)
            monthlyCategory = dao.create<E_AccountEntryCategory>(E_AccountEntryCategory, {
                id: 2,
                name: "monthly"
            })

        // entry
        let account1Entry1 = dao.findById(E_AccountEntry, 1);
        if (!account1Entry1)
            account1Entry1 = dao.create<E_AccountEntry>(E_AccountEntry, {
                id: 1,
                amount: 1,
                category: monthlyCategory,
                dateOfExpense: new Date("2024-04-14"),
                created: new Date("2024-04-13T15:40:45.498Z"),
                note: "account1 entry1"
            })

        let account1Entry2 = dao.findById<E_AccountEntry>(E_AccountEntry, 2);
        if (!account1Entry2)
            account1Entry2 = dao.create<E_AccountEntry>(E_AccountEntry, {
                id: 2,
                amount: 2,
                category: shoppingCategory,
                dateOfExpense: new Date("2024-04-14"),
                created: new Date("2024-04-13T15:40:45.498Z"),
                note: "account1 entry2"
            })

        // account
        let account1 = dao.findById<E_Account>(E_Account, 1);
        if (!account1)
            account1 = dao.create<E_Account>(E_Account, {
                id: 1,
                name: "Account1",
                total: 3000,
                accountEntries: dao.findAll<E_AccountEntry>(E_AccountEntry)
            })

        return [account1];
    }


    return generateMockAccounts();
}


// const testWrappers: E_Account[] = [
//     {
//         name: "Account1",
//         total: 3000,
//         accountEntries: [
//             {
//                 amount: 2,
//                 category: {
//                     name: "shopping",
//                 },
//                 date: new Date("2024-04-14"),
//                 created: new Date("2024-04-13T15:40:45.498Z")
//             },
//             {
//                 amount: 1,
//                 category: {
//                     name: "Monthly"
//                 },
//                 date: new Date("2024-04-14"),
//                 created: new Date("2024-04-10T15:40:45.498Z")
//             },
//             {
//                 amount: 3,
//                 category: {
//                     name: "Monthly"
//                 },
//                 date: new Date("2024-04-14"),
//                 created: new Date("2024-04-16T15:40:45.498Z")
//             }
//         ]
//     },
//     {
//         name: "Account2",
//         total: 3000,
//         accountEntries: [
//             {
//                 amount: 3.57,
//                 category: {
//                     name: "Monthly"
//                 },
//                 date: new Date("12-31-2000"),
//                 created: new Date("2023-04-14T15:40:45.498Z")
//             }
//         ]
//     }
// ]
import { Collection, Realm } from 'realm';
import AbstractEntity from '../abstract/AbstractEntity';
import { useObject, useQuery } from '@realm/react';
import E_Account from '../entities/account/E_Account';
import { Class } from '../abstract/Class';
import { log } from '../utils/basicUtils';


/**
 * Class defining generic database query methods that can be used for any entity. Needs a realm instance.
 * 
 * @since 0.0.1
 */
export default class Dao {

    realm: Realm;

    constructor(realm: Realm) {

        this.realm = realm;
    }


    // TODO: set the id
    create<T extends AbstractEntity<T>>(clazz: Class<T>, values: Partial<T> | Partial<Realm.Unmanaged<T>>): Realm.Object<T> & T {

        let entity: Realm.Object<T, never> & T;
        
        this.realm.write(() => {
            entity = this.realm.create(clazz, values);
            entity.created = new Date();
            entity.updated = new Date();
        })

        return entity;
    }


    findById<T extends AbstractEntity<T>>(clazz: Class<T>, id: number): Realm.Object<T> & T {

        const results = useQuery<T>(clazz, (entity) => 
            entity.filtered("id == " + id));

        return results.length ? results[0] : undefined;
    }


    findByQuery<T extends AbstractEntity<T>>(clazz: Class<T>, query: string): Realm.Object<T> & T {

        const results = useQuery<T>(clazz, (entity) => 
            entity.filtered(query));

        return results.length ? results[0] : undefined;
    }

    
    findAllByQuery<T extends AbstractEntity<T>>(clazz: Class<T>, query: string): Realm.Results<Realm.Object<T> & T> {

        return useQuery<T>(clazz, (entity) => 
            entity.filtered(query));
    }


    findAll<T extends AbstractEntity<T>>(clazz: Class<T>): Realm.Results<Realm.Object<T> & T> {

        return useQuery(clazz);
    }


    deleteByQuery<T extends AbstractEntity<T>>(clazz: Class<T>, query: string): void {

        this.realm.write(() => {
            this.realm.delete(this.findByQuery(clazz, query));
        })
    }


    deleteAll<T extends AbstractEntity<T>>(clazz: Class<T>): void {

        this.realm.write(() => {
            this.realm.delete(useQuery<T>(clazz));
        })
    }
}
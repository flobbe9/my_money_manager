import { Realm } from 'realm';
import AbstractEntity from './AbstractEntity';


export type EntityCollection<T extends AbstractEntity<T>> = Realm.Results<T> | T[];
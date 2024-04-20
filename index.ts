import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { createRealmContext } from '@realm/react';
import TestObject from './src/entities/TestObject';


// Init MongoDB
export const DBContext = createRealmContext({
    
    schema: [TestObject],
});


// Start App
AppRegistry.registerComponent(appName, () => App);
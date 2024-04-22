
import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { createRealmContext, RealmProvider } from '@realm/react';
import E_Account from './src/entities/account/E_Account';
import E_AccountEntry from './src/entities/account/E_AccountEntry';
import E_AccountEntryCategory from './src/entities/account/E_AccountEntryCategory';


const schema = [
    E_Account,
    E_AccountEntry,
    E_AccountEntryCategory
];

// put App inside realm context, define schemas
function RealmContext() {

    return (
        <RealmProvider schema={schema}>
            <App />
        </RealmProvider>
    )
}

AppRegistry.registerComponent(appName, () => RealmContext);
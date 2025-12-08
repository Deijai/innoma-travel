// config/firebase.ts
// 🔧 Ajuste o caminho deste arquivo conforme a estrutura do seu projeto.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';

import {
    // @ts-ignore
    getReactNativePersistence, initializeAuth
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB2MRpooFYkMUiZdP9oNQstI1cSPosk8uM",
    authDomain: "innoma-travel.firebaseapp.com",
    projectId: "innoma-travel",
    storageBucket: "innoma-travel.firebasestorage.app",
    messagingSenderId: "145940859228",
    appId: "1:145940859228:web:9cb564ffa7b18d8ce39999",
    measurementId: "G-FGJNRZ395P"
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

// Auth com persistência em AsyncStorage (React Native)
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };


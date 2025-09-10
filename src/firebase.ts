import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDn3OfLMU-ZDHDP1c8Z3KCOblbC7I6QEWQ',
  authDomain: 'rest-client-app-acfcf.firebaseapp.com',
  projectId: 'rest-client-app-acfcf',
  storageBucket: 'rest-client-app-acfcf.firebasestorage.app',
  messagingSenderId: '750790602672',
  appId: '1:750790602672:web:9f0fd6c4bf8a1624a3f075',
  measurementId: 'G-ZKEHT9M2SK',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function logInWithEmailAndPassword(email: string, password: string) {
  const response = await signInWithEmailAndPassword(auth, email, password);

  return response;
}

async function registerWithEmailAndPassword(
  name: string,
  email: string,
  password: string,
) {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  const user = response.user;

  await updateProfile(user, { displayName: name });

  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    name,
    authProvider: 'local',
    email,
  });

  return user;
}

async function logout() {
  const response = await signOut(auth);
  return response;
}

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  signOut,
};

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

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log(
      '%c you are logged in via email',
      'color: green; font-weight: bold; font-size: 20px',
    );
  } catch (err) {
    console.error(err);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await updateProfile(user, { displayName: name });
    await user.reload();

    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });

    return auth.currentUser;
  } catch (err) {
    console.error(err);
  }
};

const logout = async () => {
  await signOut(auth);
  console.log(
    '%c you are logged out',
    'color: green; font-weight: bold; font-size: 20px',
  );
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  signOut,
};

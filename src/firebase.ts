import { initializeApp } from 'firebase/app';

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

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

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log(auth);
    const user = res.user;

    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }

    console.log('you are logged in via google');
  } catch (err) {
    console.error(err);
  }
};

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

    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
  console.log(
    '%c you are logged out',
    'color: green; font-weight: bold; font-size: 20px',
  );
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  signOut,
};

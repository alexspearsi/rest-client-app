import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { ResponseStoreType } from './stores/response-store';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
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

async function saveUserRequest(userId: string, request: ResponseStoreType) {
  const db = getFirestore();

  try {
    const requestCollectionFromDB = collection(db, `users/${userId}/requests`);
    await addDoc(requestCollectionFromDB, request);
    console.log('Request is saved succesfully');
  } catch (e) {
    console.error("There's an error with saving the request", e);
  }
}

async function getUserRequests(userId: string): Promise<ResponseStoreType[]> {
  const db = getFirestore();
  const requestsCollectionRef = collection(db, `users/${userId}/requests`);
  const q = query(requestsCollectionRef, orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as unknown as ResponseStoreType,
  );
}

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  signOut,
  saveUserRequest,
  getUserRequests,
};

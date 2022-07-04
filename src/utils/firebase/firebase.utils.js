import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import{
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD9-oPiEDZz_8AOaDfbskAREjnY5tBR1C4",
  authDomain: "crwn-clothing-db-54c9e.firebaseapp.com",
  projectId: "crwn-clothing-db-54c9e",
  storageBucket: "crwn-clothing-db-54c9e.appspot.com",
  messagingSenderId: "403113825132",
  appId: "1:403113825132:web:82fff2aa3ed07e8eb11949"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

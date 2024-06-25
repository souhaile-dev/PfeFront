// FirebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBj23daPCPxN1JXvnFO_MndBhb7jMYtO9k",
  authDomain: "pfeproject-f8da6.firebaseapp.com",
  projectId: "pfeproject-f8da6",
  storageBucket: "pfeproject-f8da6.appspot.com",
  messagingSenderId: "532665741676",
  appId: "1:532665741676:web:a6799dd4c8125608340349",
  measurementId: "G-BX3XJ9EKHJ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword };

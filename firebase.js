import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDKAsNQzWv5FqwxyUsmueZqwOtnRxAYaAM",
  authDomain: "spotpark-a6e26.firebaseapp.com",
  databaseURL: "https://spotpark-a6e26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "spotpark-a6e26",
  storageBucket: "spotpark-a6e26.appspot.com",
  messagingSenderId: "323985564631",
  appId: "1:323985564631:web:5cebadb3702313c83c2192"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
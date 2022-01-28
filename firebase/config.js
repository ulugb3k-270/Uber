import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth,  GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBNw0VD6G0h_iSw_tDlqEFT8YB_ZuMgyPg",
  authDomain: "cineflex-6d3ba.firebaseapp.com",
  projectId: "cineflex-6d3ba",
  storageBucket: "cineflex-6d3ba.appspot.com",
  messagingSenderId: "100958161073",
  appId: "1:100958161073:web:45b14bfbe2279b15b37a90",
  measurementId: "G-1E432Y2HM6",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage()

export { storage };

export default db;

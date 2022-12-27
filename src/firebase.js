
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCgDsVvjL--cFshwpDfsobmAvRmfxwHSg8",
  authDomain: "tableside-816d1.firebaseapp.com",
  projectId: "tableside-816d1",
  storageBucket: "tableside-816d1.appspot.com",
  messagingSenderId: "664187913758",
  appId: "1:664187913758:web:584d2e3aa636da3f25500f",
  measurementId: "G-ZS4QMP9JJ5"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbJbRxHW1LzSvbxq9R6TeK8uZr90Sw5x8",
  authDomain: "genieapp-db.firebaseapp.com",
  projectId: "genieapp-db",
  storageBucket: "genieapp-db.appspot.com",
  messagingSenderId: "262466999036",
  appId: "1:262466999036:web:a80c033635a52d1ae53d79",
  measurementId: "G-4VMRZ415K6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

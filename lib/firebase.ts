import { initializeApp, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  DocumentData,
  limit,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyClVbwharTVL0frDbfZI22ZgFPMhhxP-B0",
    authDomain: "capsule-corps-assessment.firebaseapp.com",
    projectId: "capsule-corps-assessment",
    storageBucket: "capsule-corps-assessment.appspot.com",
    messagingSenderId: "700032666120",
    appId: "1:700032666120:web:d60dca7f3d56c956a9dfbd"
};

function createFirebaseApp(config: any) {
    try {
      return getApp();
    } catch {
      return initializeApp(config);
    }
  }
  
// Create App
const firebaseApp = createFirebaseApp(firebaseConfig);

// Firestore exports
export const firestore = getFirestore(firebaseApp);

// Helper functions

// function fillDatabase() {
//     const 
// }

/**`
 * Converts a firestore document to JSON
 * @param  {QueryDocumentSnapshot<DocumentData>} doc
 */
export function postToJSON(doc: DocumentData) {
    const docData = doc.data();
    return {
      ...docData,
      createdAt: docData.createdAt.toMillis(),
      updatedAt: docData.updatedAt.toMillis(),
    };
  }
  

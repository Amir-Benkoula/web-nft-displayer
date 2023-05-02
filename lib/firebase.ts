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
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
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

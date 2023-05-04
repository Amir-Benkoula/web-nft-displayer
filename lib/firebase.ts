import { initializeApp, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  DocumentData,
  limit,
  setDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClVbwharTVL0frDbfZI22ZgFPMhhxP-B0",
  authDomain: "capsule-corps-assessment.firebaseapp.com",
  projectId: "capsule-corps-assessment",
  storageBucket: "capsule-corps-assessment.appspot.com",
  messagingSenderId: "700032666120",
  appId: "1:700032666120:web:d60dca7f3d56c956a9dfbd",
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

export async function getNftById(nftId: string) {
  const nftRefQuery = query(
    collection(firestore, "nfts"),
    where("id", "==", nftId),
    limit(1)
  );

  const nftDoc = (await getDocs(nftRefQuery)).docs[0];

  return nftDoc;
}

export async function addNftToDb(nftId: string, docId: string, userId: string) {
  const nftDocRef = doc(firestore, "nfts", docId);
  await setDoc(nftDocRef, { id: nftId, likes: [{ userId: userId }] })
    .then(() => console.log("Successfully added nft to firestore"))
    .catch((err) => console.error(err));
}
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

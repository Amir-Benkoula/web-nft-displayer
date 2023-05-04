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

export async function getNftById(nftId: string) {
  const nftRefQuery = query(
    collection(firestore, "nfts"),
    where("id", "==", nftId),
    limit(1)
  );

  const nftDoc = (await getDocs(nftRefQuery)).docs[0];

  return nftDoc;
}

// Since the db is not filled, this function adds an nft to the db if it is not yet
export async function addNftToDb(nftId: string, docId: string, userId: string) {
  const nftDocRef = doc(firestore, "nfts", docId);
  await setDoc(nftDocRef, { id: nftId, likes: [{ userId: userId }] })
    .catch((err) => console.error(err));
}

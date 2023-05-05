import { initializeApp, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit,
  setDoc,
  doc,
  orderBy,
} from "firebase/firestore";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
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

export async function getTopNfts() {
  const topNftsQuery = query(
    collection(firestore, "nfts"),
    orderBy("likes", "desc"),
    limit(20)
  );

  const topNftsSnapshot = await getDocs(topNftsQuery);
  const topNfts: any = [];
  topNftsSnapshot.forEach((doc) => {
    topNfts.push(doc.data().id);
  });

  return topNfts;
}

// Since the db is not filled, this function adds an nft to the db if it is not yet
export async function addNftToDb(nftId: string, docId: string, userId: string) {
  const nftDocRef = doc(firestore, "nfts", docId);
  await setDoc(nftDocRef, { id: nftId, likes: [{ userId: userId }] }).catch(
    (err) => console.error(err)
  );
}

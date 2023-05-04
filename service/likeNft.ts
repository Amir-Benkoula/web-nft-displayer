import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { addNftToDb, firestore } from "../lib/firebase";

export async function likeNft(nftId: string, userId: string) {
  // Retrieve nft document
  const docId = `typewriter-${nftId}`;
  const nftRef = doc(collection(firestore, "nfts"), docId);
  const nftDoc = await getDoc(nftRef);

  // If the nft is in database
  if (nftDoc.exists()) {
    const nftData = nftDoc.data();
    // Retrieve likes array of the nft
    const likes = nftData.likes || [];

    console.log("nft exists");
    // If nft is not liked by the current user, like it
    if (!likes.some((like: any) => like.userId === userId)) {
      likes.push({ userId: userId });
      await updateDoc(nftRef, { likes });
      console.log("nft liked");
      return true;
    } else {
      // If nft is liked by the current user, unlike it
      const index = likes.indexOf(userId);
      likes.splice(index, 1);
      await updateDoc(nftRef, { likes });
      console.log("nft unliked");
      return false;
    }
  } else {
    // If nft is not in database, adds it and liked it
    console.log("nft didn't exist, added to firestore");
    await addNftToDb(nftId, docId, userId);
    return true;
  }
}

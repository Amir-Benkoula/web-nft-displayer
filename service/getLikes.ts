import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";

// Get likers array of an item
export async function getLikes(nftId: string) {
    const docId = `typewriter-${nftId}`
    const nftRef = doc(collection(firestore, 'nfts'), docId);
    const nftDoc = await getDoc(nftRef); 

    if (nftDoc.exists()) {
        const nftData: any = nftDoc.data();
        return nftData.likes || [];
    } else {
        return [];
    }
}

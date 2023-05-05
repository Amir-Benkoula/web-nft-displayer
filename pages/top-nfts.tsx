import Navbar from "../components/Navbar";
import NftFeed from "../components/NftFeed";
import { getTopNfts } from "../lib/firebase";
import getNftMedatata from "../service/getNftMetadata";
import styles from "../styles/Home.module.css";

// Incremental Static Regeneration so data does not get stale
export async function getStaticProps() {
  const topNftIds = await getTopNfts();

  const topNfts: any = [];

  const nfts: any = [];

  for (let i in topNftIds) {
    const response = await getNftMedatata(topNftIds[i]);
    topNfts.push(response);
  }

  topNfts.forEach((nft: any) => {
    // Returning spamInfo, metadataError and contract in props causes error
    const { spamInfo, metadataError, contract, ...rest } = nft;
    nfts.push(rest);
  });

  return {
    props: { nfts },
    revalidate: 100,
  };
}
export default function TopLikedNfts(props: any) {
  return (
    <div>
      <main className={styles.main}>
        <NftFeed nfts={props.nfts} onlyFeed={true} />
      </main>
    </div>
  );
}

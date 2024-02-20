import React, { useContext } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import NftFeed from "../../components/NftFeed";
import getNfts from "../../service/getNfts";
import getContractMetadata from "../../service/getContractMetadata";

export async function getServerSideProps({ params }: any) {
  const { contractAddress } = params;

  const contract = await getContractMetadata(contractAddress);
  
  const name = contract.name;

  const nfts = await getNfts(contractAddress);
  console.log('get nfts server side', nfts);
  return {
    props: { nfts, name, contractAddress },
  };
}

export default function Contract(props: any) {
  return (
    <div>
      <Head>
        <title>Nft Displayer</title>
        <meta name="description" content="Created by Amir Benkoula" />
      </Head>
      <main className={styles.main}>
        <NftFeed nfts={props.nfts} collectionName={props.name} contractAddress={props.contractAddress} onlyFeed={false} />
      </main>
    </div>
  );
}

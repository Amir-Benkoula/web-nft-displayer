import React, { useContext } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import NftFeed from "../components/NftFeed";
import getNfts from "../service/getNfts";
import { ContractContext } from "../lib/context";

// export async function getStaticProps() {
//   const nfts = await getNfts();

//   return {
//     props: { nfts },
//   };
// }

export default function Home(props: any) {
  return (
    <div>
      <h1>Prout</h1>
    </div>
  );
}

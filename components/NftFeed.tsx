import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function NftFeed({ nfts }: any) {
  const [pageNumber, setPageNumber] = useState(0);
  const nftsPerPage = 20;
  const pagesVisited = pageNumber * nftsPerPage;

  const displayNfts = nfts
    ? nfts
        .slice(pagesVisited, pagesVisited + nftsPerPage)
        .map((nft: any) => <NftItem nft={nft} key={nft.id} />)
    : null;

  const pageCount = Math.ceil(nfts.length / nftsPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.feed}>{displayNfts}</div>
      <ReactPaginate
        nextLabel="next >"
        pageCount={pageCount}
        onPageChange={changePage}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center mt-4"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

function NftItem({ nft }: any) {
  return (
    <div className={styles.card}>
      <Link href={`/item/${nft.tokenId}`}>
        <Image
          className={styles.image}
          src={nft.media[0].gateway}
          alt="Picture of the 20Mint NFT"
          width={300}
          height={300}
        />
        <p>{nft.rawMetadata.name}</p>
      </Link>
      <ul className={styles.attributes}>
        {nft.rawMetadata.attributes.map((attribute: any, i: number) => {
          return attribute.value !== "None" ? (
            <li key={i}>
              {attribute.trait_type} : {attribute.value}
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
}

// type NftType = {
//     rawMetadata: {
//         [key: string]: any,
//     },
//     media: {
//         gateway: string
//     }[]
// }

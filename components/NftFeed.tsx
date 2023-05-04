import React, { useContext, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { UserContext } from "../lib/context";
import { Pagination } from "antd";
import { filterNfts } from "../service/filterNfts";
import { SearchOutlined } from "@ant-design/icons";

export default function NftFeed({ nfts }: any) {
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState("");
  const nftsPerPage = 20;
  const pagesVisited = (pageNumber - 1) * nftsPerPage;

  const filteredNfts = filterNfts(filter, nfts);

  const displayNfts = filteredNfts
    ? filteredNfts
        .slice(pagesVisited, pagesVisited + nftsPerPage)
        .map((nft: any) => (
          <NftItem nft={nft} pageNumber={pageNumber} filter={filter.length} key={nft.id} />
        ))
    : null;

  const changePage = (page: number) => {
    setPageNumber(page);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPageNumber(1); // reset page number when changing filter
  };

  return (
    <div>
      <div className={styles.filter}>
        <label htmlFor="filter"><SearchOutlined /></label>
        <input
          id="filter"
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search by attribute or item number"
        />
      </div>
      <div className={styles.feed}>{displayNfts}</div>
      <div className={styles.paginationContainer}>
        <Pagination
          current={pageNumber}
          total={filteredNfts.length}
          pageSize={nftsPerPage}
          onChange={changePage}
          showSizeChanger={false}
          showQuickJumper={false}
        />
      </div>
    </div>
  );
}

function NftItem({ nft, pageNumber, filter }: any) {
  const { userId } = useContext(UserContext);

  return (
    <div className={styles.card}>
      <Link href={`/item/${nft.tokenId}`}>
        <Image
          className={styles.image}
          src={nft.media[0].gateway}
          alt={`Typewriter #${nft.tokenId}`}
          width={300}
          height={300}
        />
        <p>{nft.rawMetadata.name}</p>
      </Link>
      <ul className={styles.attributes}>
        {/* Mapping attributes to a list */}
        {nft.rawMetadata.attributes.map((attribute: any, i: number) => {
          return attribute.value !== "None" ? (
            <li key={i}>
              {attribute.trait_type} : {attribute.value}
            </li>
          ) : null;
        })}
      </ul>
      {/* The key prop is used here to reload the button at each page change */}
      {userId === "" ? null : (
        <LikeButton nftId={nft.tokenId} key={pageNumber + "_" + filter} />
      )}
    </div>
  );
}

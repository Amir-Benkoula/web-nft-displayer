import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../styles/Home.module.css'

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
  };

  return (
    <div className={styles.container}>
      <ReactPaginate
        nextLabel="next >"
        pageCount={pageCount}
        onPageChange={changePage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <div className={styles.feed}>{displayNfts}</div>
    </div>
  );
}

function NftItem({ nft }: any) {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={nft.media[0].gateway}
        alt="Picture of the 20Mint NFT"
      />
      <p>{nft.rawMetadata.name}</p>
      <ul className={styles.attributes}>
        {nft.rawMetadata.attributes.map((attribute: any, i: number) => {
          return attribute.value !== 'None' ? (
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

// export default function NftFeed({ nfts }: any) {
//     return nfts
//       ? 
//       <div className={styles.feed}>
//         {nfts.map((nft: any) => (
//         <NftItem nft={nft} key={nft.id}/>
//         ))}
//       </div>
//       : null;
//   }
  

// function NftItem({nft}: any) {
//     return (
//         <div className={styles.card}>
//             <img className={styles.image} src={nft.media[0].gateway} alt="Picture of the 20Mint NFT"/>
//             <p>{nft.rawMetadata.name}</p>
//             <ul className={styles.attributes}>    
//                 {nft.rawMetadata.attributes.map((attribute: any, i: number) => {
//                     return attribute.value != 'None' ? <li key={i}>{attribute.trait_type} : {attribute.value}</li> : null;
//                 })}
//             </ul>
//         </div>
//     )
// }

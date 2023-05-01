import Image from "next/image"
import { stringify } from "querystring";

// type NftType = {
//     rawMetadata: {
//         [key: string]: any,
//     },
//     media: {
//         gateway: string
//     }[]
// }

export default function NftFeed({ nfts }: any) {
    return nfts
      ? nfts.map((nft: any) => (
          <NftItem nft={nft} key={nft.id}/>
        ))
      : null;
  }
  

function NftItem({nft}: any) {
    return (
        <div className="card">
            <p>{nft.rawMetadata.name}</p>
            <img src={nft.media[0].gateway} alt="Picture of the 20Mint NFT" width={200} height={200}/>
            <ul>    
                {nft.rawMetadata.attributes.map((attribute: any, i: number) => {
                    return attribute.value != 'None' ? <li key={i}>{attribute.trait_type} : {attribute.value}</li> : null;
                })}
            </ul>
        </div>
    )
}

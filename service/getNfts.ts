import { alchemy } from "../lib/alchemy";
import getContractMetadata from "./getContractMetadata";

export default async function getNfts(contractAddress: string) {
  
  // const totalSupply = (await getContractMetadata(contractAddress)).totalSupply;

  // console.log(Number(totalSupply));

  // Get all the NFTs owned by an address
  let nfts: any = [];
  for (let key = 0; key <= 100; key += 100) {
    (
      await alchemy.nft.getNftsForContract(
        contractAddress,
        { pageSize: 100, pageKey: `${key}` }
      )
    ).nfts.forEach((nft) => {
      // Returning spamInfo, metadataError and contract in props causes error
      const { spamInfo, metadataError, contract, ...rest } = nft;
      
      nfts.push(rest);
    });
  }

  return nfts;
}

import { alchemy } from "../lib/alchemy";

export default async function getNfts(contractAddress: string) {
  
  // Get all the NFTs owned by an address
  let nfts: any = [];
  for (let key = 0; key <= 900; key += 100) {
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

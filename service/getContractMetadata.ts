import { alchemy } from "../lib/alchemy";

export default async function getContractMetadata(id: string) {
    const response = await alchemy.nft.getContractMetadata(id);
    
  return response;
}

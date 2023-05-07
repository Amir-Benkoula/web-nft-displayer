import { alchemy } from "../lib/alchemy";

export default async function getNftMedatata(id: number, contractId: string) {
  const response = await alchemy.nft.getNftMetadata(
    contractId,
    id,
    {}
  );
  return response;
}

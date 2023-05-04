import { alchemy } from "../lib/alchemy";

export default async function getNftMedatata(id: number) {
  const response = await alchemy.nft.getNftMetadata(
    "0xB003ce92F3b2A8F3dd99207C351eAf05BC605262",
    id,
    {}
  );
  return response;
}

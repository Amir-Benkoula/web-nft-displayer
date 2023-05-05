export function filterNfts(filter: string, nfts: any) {
  let filteredNfts: any[] = [];

  nfts.forEach((nft: any) => {
    const attributes = nft.rawMetadata.attributes;
    attributes.forEach((attribute: any) => {
      if (
        attribute.value.toLowerCase() === filter.toLowerCase() ||
        nft.tokenId === filter
      ) {
        filteredNfts.push(nft);
      }
    });
  });

  // Removing duplications
  const uniqueNfts = filteredNfts.filter((nft, index) => {
    return (
      index ===
      filteredNfts.findIndex((n) => {
        return n.tokenId === nft.tokenId;
      })
    );
  });

  if (uniqueNfts.length == 0) {
    return nfts;
  }

  return uniqueNfts;
}

import { useContext } from "react";
import { alchemy } from "../../lib/alchemy";
import Image from "next/image";
import { UserContext } from "../../lib/context";

export async function getServerSideProps({ params }: any) {
  const { id } = params;
  const response = await alchemy.nft.getNftMetadata(
    "0xB003ce92F3b2A8F3dd99207C351eAf05BC605262",
    id,
    {}
  );
  const imageUrl = response.media[0].gateway;

  return {
    props: { id, imageUrl },
  };
}

export default function Item(props: any) {
  const {userId} = useContext(UserContext);

  return (
    <div>
      <p>Item Id: {props.id}</p>
      <p>User Id: {userId}</p>
      <Image src={props.imageUrl} alt="" width={500} height={500} />
    </div>
  );
}

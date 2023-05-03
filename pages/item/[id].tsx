import { useContext, useEffect, useState } from "react";
import { alchemy } from "../../lib/alchemy";
import Image from "next/image";
import { UserContext } from "../../lib/context";
import { getLikes } from "../../service/getLikes";

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
  const [likers, setLikers] = useState([]);

  useEffect(() => {
        async function fetchLikes() {
            const likes = await getLikes(props.id);
            
            setLikers(likes);
        }

        fetchLikes();
  }, [props.id]);

  return (
    <div>
      <p>Item Id: {props.id}</p>
      <p>User Id: {userId}</p>
      <Image src={props.imageUrl} alt="" width={500} height={500} />
      <p>Number of likes {likers.length}</p>
      <ul>
        {likers.map((liker: any, i: number) => {
          return liker.userId !== "" ? (
            <li key={i}>
              {liker.userId}
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
}

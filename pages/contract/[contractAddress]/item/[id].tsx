import { useEffect, useState } from "react";
import { getLikes } from "../../../../service/getLikes";
import styles from "../../../../styles/Item.module.css";
import { Card } from "antd";
import getNftMedatata from "../../../../service/getNftMetadata";
import Image from "next/image";

export async function getServerSideProps({ params }: any) {
  const { id, contractAddress } = params;
  
  const response = await getNftMedatata(id, contractAddress);

  const imageUrl = response.media[0].gateway;

  return {
    props: { id, contractAddress, imageUrl },
  };
}

export default function Item(props: any) {
  const [likers, setLikers] = useState([]);
  
  useEffect(() => {
    async function fetchLikes() {
      const likes = await getLikes(props.id, props.contractAddress);
      
      setLikers(likes);
    }

    fetchLikes();
  }, [likers, props.id]);

  return (
    <main className={styles.main}>
      <div className={styles.itemContainer}>
        <img
          className={styles.image}
          src={props.imageUrl}
          alt={`item #${props.id} image`}
        />
        <div className={styles.nftInfo}>
          <h1>#{props.id}</h1>
          <Card
            title="Likes"
            extra={likers.length}
            style={{ textAlign: "left" }}
          >
            <ul>
              {likers
                // .filter((liker: any) => liker.userId !== "")
                .map((liker: any, i: number) => (
                  <li key={i}>{liker.userId}</li>
                ))}
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}

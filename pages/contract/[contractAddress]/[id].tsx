import { useEffect, useState } from "react";
import { getLikes } from "../../../service/getLikes";
import styles from "../../../styles/Item.module.css";
import { Card } from "antd";
import getNftMedatata from "../../../service/getNftMetadata";
import Image from "next/image";

export async function getServerSideProps({ params }: any) {
  const { id, contractAddress } = params;
  
  const response = await getNftMedatata(id, contractAddress);

  console.log('oe',response);

  const imageUrl = response.media[0].gateway;

  return {
    props: { id, imageUrl },
  };
}

export default function Item(props: any) {
  const [likers, setLikers] = useState([]);

  useEffect(() => {
    async function fetchLikes() {
      const likes = await getLikes(props.id);

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
          alt={`Typewriter #${props.id} image`}
        />
        <div className={styles.nftInfo}>
          <h1>20 Mint Typewriter #{props.id}</h1>
          <Card
            title="Likes"
            extra={<div>{likers.length}</div>}
            style={{ textAlign: "left" }}
          >
            <ul>
              {likers
                .filter((liker: any) => liker.userId !== "")
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

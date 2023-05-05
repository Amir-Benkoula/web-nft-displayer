import { useContext, useEffect, useState } from "react";
import { alchemy } from "../../lib/alchemy";
import { UserContext } from "../../lib/context";
import { getLikes } from "../../service/getLikes";
import styles from "../../styles/Home.module.css";
import { Card, Space } from "antd";
import getNftMedatata from "../../service/getNftMetadata";
import Image from "next/image";

export async function getServerSideProps({ params }: any) {
  const { id } = params;

  const response = await getNftMedatata(id);

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
      <div className={styles.nftContainer}>
        <div className={styles.card}>
          <Image
            className={styles.nftImage}
            src={props.imageUrl}
            alt={`Typewriter #${props.id} image`}
            width={500}
            height={500}
          />
        </div>
        <div className={styles.nftInfo}>
          <h1>20 Mint Typewriter #{props.id}</h1>

          <Space direction="vertical">
            <Card
              title="Likes"
              extra={<div className={styles.likeCount}>{likers.length}</div>}
              style={{ width: 500, textAlign: "left" }}
            >
              <ul>
                {likers
                  .filter((liker: any) => liker.userId !== "")
                  .map((liker: any, i: number) => (
                    <li key={i}>{liker.userId}</li>
                  ))}
              </ul>
            </Card>
          </Space>
        </div>
      </div>
    </main>
  );
}

import { useContext, useEffect, useState } from "react";
import { alchemy } from "../../lib/alchemy";
import Image from "next/image";
import { UserContext } from "../../lib/context";
import { getLikes } from "../../service/getLikes";
import styles from "../../styles/Home.module.css";
import LikeButton from "../../components/LikeButton";
import { Card, Space } from "antd";

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
  const [likers, setLikers] = useState([]);
  const { userId } = useContext(UserContext);

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
          {/* <Image className={styles.image} src={props.imageUrl} alt="" 
                    width={500}
                    height={500}
                /> */}
          <img
            className={styles.nftImage}
            src={props.imageUrl}
            alt={`Typewriter #${props.id} image`}
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

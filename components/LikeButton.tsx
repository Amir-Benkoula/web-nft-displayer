import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import { likeNft } from "../service/likeNft";
import { getLikes } from "../service/getLikes";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import styles from "../styles/components/LikeButton.module.css";

export default function LikeButton(props: any) {
  const { userId } = useContext(UserContext);
  // State of the like button, "Like" by default
  const [isLiked, setIsLiked] = useState(false);
  const [likeNumber, setLikeNumber] = useState();

  useEffect(() => {
    // Retrieve like status of an item to show the correct button
    async function fetchLikeStatus() {
      const likes = await getLikes(props.nftId, props.contractAddress);
      setLikeNumber(likes.length);
      if (likes.some((like: any) => like.userId === userId)) {
        setIsLiked(true);
      }
    }

    fetchLikeStatus();
  });

  async function likeButtonHandler() {
    const response = await likeNft(props.nftId, userId, props.contractAddress);

    setIsLiked(response);
  }

  // if itemId is in array of likes show "liked" button else show "like" button
  return isLiked ? (
    <div className={styles.likeButton}>
      <HeartTwoTone
        style={{ fontSize: "1.5em" }}
        twoToneColor="#5DADE2"
        onClick={likeButtonHandler}
      />
      <p style={{ color: "#5DADE2" }}>{likeNumber}</p>
    </div>
  ) : (
    <div className={styles.likeButton}>
      <HeartOutlined
        style={{ fontSize: "1.5em", color: "gray" }}
        onClick={likeButtonHandler}
      />
      <p>{likeNumber}</p>
    </div>
  );
}

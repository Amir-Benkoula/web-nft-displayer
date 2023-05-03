import { useContext, useEffect, useState } from "react"
import { UserContext } from "../lib/context"
import { likeNft } from "../service/likeNft";
import { getLikes } from "../service/getLikes";

export default function LikeButton({ nftId }: any) {
    const { userId } = useContext(UserContext);
    // State of the like button, "Like" by default
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // Retrieve like status of an item to show the correct button
        async function fetchLikeStatus() {
            const likes = await getLikes(nftId);

            
            if(likes.some((like: any) => like.userId === userId)){
                setIsLiked(true);
            };
        }

        fetchLikeStatus();
    });

   
    async function likeButtonHandler() {
        const response = await likeNft(nftId, userId);

        setIsLiked(response);
    }

    // if itemId is in array of likes show "liked" button else show "like" button
    return (
        <>
            <button onClick={likeButtonHandler}>
                {isLiked ? "Unlike" : "Like"}
            </button>
        </>
    )
}

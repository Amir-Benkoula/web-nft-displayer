import { Network, Alchemy } from 'alchemy-sdk'
import Image from 'next/image';

const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function getServerSideProps({ params }: any) {
    const {id} = params;
    const response = await alchemy.nft.getNftMetadata('0xB003ce92F3b2A8F3dd99207C351eAf05BC605262', id, {});
    const imageUrl = response.media[0].gateway;
    return {
        props: {id, imageUrl}
    }
}

export default function Item(props: any) {
    return (
        <div>
            <p>Item Id: {props.id}</p>
            <Image src={props.imageUrl} alt="" width={500} height={500}  />
        </div>
    )
}

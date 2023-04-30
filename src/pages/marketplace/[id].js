import BaseLayout from "@/components/layouts/BaseLayout";
import axios from "axios";
import Image from "next/image";

const NFTDetail = ({ nftDetails }) => {
  console.log(nftDetails);
  let title = nftDetails.title.slice(0, 10);
  let description = nftDetails.title;
  return (
    <BaseLayout>
      <h1>Details about this NFT:</h1>
      <h2>{title}</h2>
      <Image 
        src={nftDetails.thumbnailUrl}
        alt="Picture of the NFT"
        width={200}
        height={200}
      />
      <p>{description}</p>
    </BaseLayout>
  );
}

NFTDetail.getInitialProps = async ({ query }) => {
  let nftDetails = {};

  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/photos/${query.id}`)
    const { id, title, thumbnailUrl } = res.data;
    nftDetails = { id, title, thumbnailUrl }
  } catch (error) {
    console.error(error)
  }
  
  return { nftDetails };
}

export default NFTDetail;
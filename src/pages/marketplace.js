//This page does NOT have Automatic Static Optimization, since it has getInitialProps present (https://nextjs.org/docs/advanced-features/automatic-static-optimization)
import axios from "axios";
import BaseLayout from "@/components/layouts/BaseLayout";

const Marketplace = ({ availableNFTs }) => {


  const renderNFTs = () => {
    return availableNFTs.map(({id, title, url, thumbnailUrl}) => <li key={id}>{title + url}</li>) 
  }

  return (
    <BaseLayout>
      <h1>AthletiFi Marketplace Page!</h1>
      <ul>
        {renderNFTs()}
      </ul>
    </BaseLayout>
  )
}

Marketplace.getInitialProps = async () => {
  let availableNFTs = [];
  
  for (let id = 1; id < 10; id++) {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
      availableNFTs.push(res.data)
    } catch (e) {
      console.error(`some shit got fucked up: `, e)
    } finally {
      if (id === 9) console.log(`Last try...catch in Marketplace.getInitialProps has completed. Was it successful? Who knows! this message will print either way.`);
    }

  }

  return { availableNFTs };

}
  
export default Marketplace;
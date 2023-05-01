//This page does NOT have Automatic Static Optimization, since it has getInitialProps present (https://nextjs.org/docs/advanced-features/automatic-static-optimization)
import axios from "axios";
import BaseLayout from "@/components/layouts/BaseLayout";
import Link from "next/link";
import React from 'react';
import { Container, Row, Col, CardGroup, Card, CardImg, CardBody, CardSubtitle, CardText, CardTitle, Button } from 'reactstrap';
import Image from 'next/image';

const Marketplace = ({ availableNFTs }) => {
  const Square = (imageUrl = "", placeholderText = "") => (
    <div
      style={{
        height: '150px',
        width: '150px',
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
      }}
    >
      <Image src="https://via.placeholder.com/100" alt="placeholder" width={100} height={100} />
      <p>Placeholder text</p>
    </div>
  );
  
  const GridPlaceholder = () => (
    <Container>
      <Row>
        <Col><Square /></Col>
        <Col><Square /></Col>
        <Col><Square /></Col>
      </Row>
      <Row>
        <Col><Square /></Col>
        <Col><Square /></Col>
        <Col><Square /></Col>
      </Row>
      <Row>
        <Col><Square /></Col>
        <Col><Square /></Col>
        <Col><Square /></Col>
      </Row>
    </Container>
  );

  const renderNFTs = () => {
    const cardifiedNFTs = availableNFTs.map(({id, title, url, thumbnailUrl}) => 
      <Col key={id} xs={12} md={4} lg={3}>
        <Card>
          <CardImg 
            alt="placeholder NFT image" 
            src={thumbnailUrl}
            top
            width="80%"
            style={{ padding: '1rem' }}
          />
          <CardBody>
            <CardTitle tag="h5">{`Player Name: ${title.slice(0,8)}`}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">{`NFT #${id}`}</CardSubtitle>
            <CardText>{`${title}`}</CardText>
            <Button>
              <Link href={`/marketplace/${id}`}>View Details</Link>
            </Button>
          </CardBody>
        </Card>
      </Col>
    )
    
    return cardifiedNFTs;
  }

  return (
    <BaseLayout>
      <h1>AthletiFi Marketplace Page!</h1>
      <Container>
        <Row>
          {renderNFTs()}
        </Row>
      </Container>
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


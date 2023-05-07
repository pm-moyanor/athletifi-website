import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import { Container, Row, Col } from 'reactstrap';

class Index extends React.Component {
  render() {
    return (
      <BaseLayout className="cover">
        <div className="main-section">
          <div className="background-image">
            <img src="/images/background-index.png" />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper`}>
                    <div className="back">
                      {/* <div className="hero-section-content">
                        <h2> Title text </h2>
                        <div className="hero-section-content-intro">Description</div>
                      </div> */}
                      <img className="image" src="/images/space-blank-home.png"/>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-tagline">
                  <h1>A web3 ecosystem for soccer players, clubs, and fans</h1>
                </div>
                <div className="hero-welcome-text">
                  <h1>
                  AthletiFi provides fans with an easy, streamlined, and fun way to discover, follow, and invest in young soccer players.
                  </h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    )
  }
}

export default Index;
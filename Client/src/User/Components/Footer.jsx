import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <div>
      <footer className="bg-dark text-light">
        <Container>
          <Row>
            <Col md={6}>
              <h5>About Us</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Col>
            <Col md={6}>
              <h5>Contact</h5>
              <ul className="list-unstyled">
                <li>Address: Gulistan e Johar Karachi</li>
                <li>Email: s.maqsood44@gmai.com</li>
                 <li>Phone: +92 304 9750385</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="text-center">
                &copy; {new Date().getFullYear()} Mqsood Ahmad. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Footer

  
import React, { Component } from 'react'
import {Container, Row, Col, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import logo from '../../logo.svg'

class InvalidURL extends Component {
  render() {

    return (
      <Container>
        <Row>
          <Col md={{ span: 6,offset:3}} className="justify-content-md-center">
            <Form className='md-12'>
              <Form.Group as={Row} className="justify-content-md-center">
                <img src={logo} className="App-logo" alt="logo" />
              </Form.Group>
              <Form.Group as={Row} className="justify-content-md-center">
                <Col sm={12}>
                  <span className="InvalidURL">Opps!!!! 404 Invalid URL</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="justify-content-md-center">
                <Col sm={12}>
                  <Link to="/login" className="btn btn-primary">Please Login First</Link>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default InvalidURL
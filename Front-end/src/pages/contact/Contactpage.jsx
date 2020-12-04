import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Header from '../../components/Header/Header.component'

const Contactpage = () => {
    const [name,setName] = useState('')
    const [subject,setSubject] = useState('')
    const [description,setDescription]=useState('')

    const submitHandler=()=>{
        console.log(name,subject,description)
    }
    return (
        <>
            <Header />
            <Container fliud='lg'>
                <Form onSubmit={submitHandler}>
                    <Row >
                        <Col  sm={12} lg={6} xl={6} md={6}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholer='Your Name'
                                    value={name}
                                    required
                                    onChange={event => setName(event.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='subject'>
                                <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholer='Subject'
                                    value={subject}
                                    required
                                    onChange={event => setSubject(event.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    type='text'
                                    placeholer='Description'
                                    value={description}
                                    required
                                    onChange={event => setDescription(event.target.value)}
                                ></Form.Control>
                            </Form.Group>
                                <Button type='submit' variant='primary'>
                                    Submit
                                </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )
}

export default Contactpage

'use client';

import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretRight} from '@fortawesome/free-solid-svg-icons';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';

export default function LeftSection() {
    return (
        <Col className="left-section">
            <Badge bg="dark" className={'badge-container d-flex'}>
                <Badge bg="primary" className={'text-capitalize'}>WE’RE HIRING</Badge>
                <Badge bg="success">Visit our careers page <FontAwesomeIcon
                    icon={faCaretRight}/></Badge>
            </Badge>
            <h1 className={'heading'}>A better way to<br/>
                <span className={'text-primary'}>ship web apps</span></h1>
            <p className={'description'}>Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                qui Lorem cupidatat
                commodo. Elit sunt amet fugiat veniam occaecat fugiat.</p>
            <Form>
                <Row>
                    <Col lg={8} xs="auto">
                        <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                            Enter your email
                        </Form.Label>
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="Enter your email"
                            style={{backgroundColor: 'white', color: 'inherit'}}
                        />
                    </Col>
                    <Col lg={4} xs="auto">
                        <Button type="submit" className="mb-2" variant="primary">
                            Start free trial
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="fw-normal">Start your free 14-day trial, no credit card
                            necessary.
                            By providing your email, you agree to our <span className="fw-bolder">terms of
                                                service.</span>
                        </p>
                    </Col>
                </Row>
            </Form>
        </Col>
    )
}

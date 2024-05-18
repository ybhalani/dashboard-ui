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
            <Badge bg="dark" className={'badge-container d-flex'} aria-label="Badge container">
                <Badge bg="primary" className={'text-capitalize'} aria-label="We're hiring badge">WE’RE HIRING</Badge>
                <Badge bg="success" aria-label="Visit our careers page badge">
                    Visit our careers page
                    <FontAwesomeIcon icon={faCaretRight} aria-hidden="true" />
                </Badge>
            </Badge>
            <h1 className={'heading'} aria-label="Main heading: A better way to ship web apps">A better way to<br />
                <span className={'text-primary'}>ship web apps</span>
            </h1>
            <p className={'description'} aria-label="Description: Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                qui Lorem cupidatat
                commodo. Elit sunt amet fugiat veniam occaecat fugiat.
            </p>
            <Form>
                <Row>
                    <Col lg={8} xs={12}>
                        <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                            Enter your email
                        </Form.Label>
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="Enter your email"
                            style={{backgroundColor: 'white', color: 'inherit'}}
                            aria-label="Enter your email"
                        />
                    </Col>
                    <Col lg={4} xs={12}>
                        <div className="d-grid">
                        <Button type="submit" className="mb-2" variant="primary" aria-label="Start free trial">
                            Start free trial
                        </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="fw-normal">
                            Start your free 14-day trial, no credit card necessary. By providing your email, you agree to our <span className="fw-bolder" aria-label=" Redirect to terms of service">terms of  service.</span>
                        </p>
                    </Col>
                </Row>
            </Form>
        </Col>
    )
}

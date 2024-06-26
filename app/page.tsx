'use client';

import React from "react";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import NavBar from "./components/nav/navbar";
import RightSection from "./components/right-section/right-section";
import LeftSection from "./components/left-section/left-section";
import Illustration from '../public/illustration.svg';

export default function Page() {
    return (
        <>
            <NavBar></NavBar>
            <Container className="page-container">
                <Row className="align-items-center page-row">
                    <LeftSection/>
                    <RightSection
                        illustrationSrc={Illustration}
                        altText="A beautiful illustration for the dashboard"
                        ariaLabel="Dashboard illustration"
                    />
                </Row>
            </Container>
        </>
    )
}

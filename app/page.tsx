'use client';

import React from "react";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import NavBar from "./components/nav/navbar";
import RightSection from "./components/right-section/right-section";
import LeftSection from "./components/left-section/lest-seection";

export default function Page() {
    return (
        <>
            <NavBar></NavBar>
            <Container>
                <Row className="align-items-center">
                    {/**/}
                    <LeftSection/>
                    {/**/}
                    <RightSection/>

                </Row>
            </Container>
        </>
    )
}

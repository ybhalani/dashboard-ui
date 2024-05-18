'use client';

import React from "react";
import Logo from '../../../public/logo.svg';
import Image from "next/image";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";

export default function NavBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <Image
                    src={Logo}
                    alt="App Logo"
                    width={43.75}
                    height={40}
                    priority
                />
                <Navbar.Brand href="#home">
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#product">Product</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#marketplace">Marketplace</Nav.Link>
                        <Nav.Link href="#company">Company</Nav.Link>
                    </Nav>
                    <Nav className="">
                        <Nav.Link href="#log-in">Log in</Nav.Link>
                        <Button variant="secondary">Start free trial</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

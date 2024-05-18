'use client';

import React from "react";
import Logo from '../../../public/logo.svg';
import Image from "next/image";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavBar() {
    const expand = 'xs'
    return (
        <Navbar expand="lg" className="bg-body-tertiary" fixed={'top'} data-bs-theme="dark">
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
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Collapse className={'d-none d-sm-none d-md-none d-lg-block'} id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link aria-labelledby={`Product menu item`} href="#product">Product</Nav.Link>
                        <Nav.Link aria-labelledby={`Features menu item`} href="#features">Features</Nav.Link>
                        <Nav.Link aria-labelledby={`Marketplace menu item`} href="#marketplace">Marketplace</Nav.Link>
                        <Nav.Link aria-labelledby={`Company menu item`} href="#company">Company</Nav.Link>
                    </Nav>
                    <Nav className="">
                        <Nav.Link href="#log-in" aria-labelledby={`Please Login`}>Log in</Nav.Link>
                        <Button variant="secondary" aria-labelledby={`Start free trial`}>Start free trial</Button>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Offcanvas className={'d-sm-block d-md-block d-lg-none'}
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="top"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            <Image
                                src={Logo}
                                alt="App Logo"
                                width={43.75}
                                height={40}
                                priority
                            />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav className="me-auto">
                                <Nav.Link aria-labelledby={`Product menu item`} href="#product">Product</Nav.Link>
                                <Nav.Link aria-labelledby={`Features menu item`} href="#features">Features</Nav.Link>
                                <Nav.Link aria-labelledby={`Marketplace menu item`} href="#marketplace">Marketplace</Nav.Link>
                                <Nav.Link aria-labelledby={`Company menu item`} href="#company">Company</Nav.Link>
                            </Nav>
                            <Nav className="align-items-center d-grid">
                                <Button variant="primary">Start free trial</Button>
                                <Nav.Link
                                    className="text-center"
                                    href="#log-in"
                                    aria-labelledby={`Existing customer? Please Login`}>
                                    Existing customer? <b>Login</b>
                                </Nav.Link>
                            </Nav>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

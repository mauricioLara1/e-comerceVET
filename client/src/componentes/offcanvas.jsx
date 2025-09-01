import React, { useState } from 'react';
import { Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';

export default function Porfavor() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleOffcanvasToggle = () => setShowOffcanvas(!showOffcanvas);
    const handleOffcanvasClose = () => setShowOffcanvas(false);
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar Offcanvas</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Button variant="outline-light" onClick={handleOffcanvasToggle}>
                    Menu
                </Button>
            </Navbar>

            <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose} responsive='lg'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link href="#home" onClick={handleOffcanvasClose}>Home</Nav.Link>
                        <Nav.Link href="#features" onClick={handleOffcanvasClose}>Features</Nav.Link>
                        <Nav.Link href="#pricing" onClick={handleOffcanvasClose}>Pricing</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

        </>

    );
}





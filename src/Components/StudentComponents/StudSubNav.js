import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';


function StudSubNav() {
    const name = localStorage.getItem("name");
    const navigate= useNavigate();
    // const handleLogout = async() => {
    //   await localStorage.clear()
    //   navigate("/");
    // }
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand}  style={{borderBottom:"1px solid #c7c8c9"}}>
          <Container fluid>
            <Navbar.Brand href="#">Welcome, {name}</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <span onClick={() => navigate(`/Quiz-Main/student/${localStorage.getItem("id")}`)} style={{cursor:"pointer",marginBottom:"1rem"}}>Home</span>
                  
                  
                </Nav>
                
              </Offcanvas.Body>
            
            </Navbar.Offcanvas>
            
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default StudSubNav;
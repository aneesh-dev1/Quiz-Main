import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';





const Navigation = () => {
  
  return (
    <div>
        <Navbar bg="dark" variant="dark" >
        <Container >
          <Navbar.Brand href="#home" >
            Quizo
          </Navbar.Brand>
          
          
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation

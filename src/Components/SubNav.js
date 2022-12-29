
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';


function SubNav() {
    const name = localStorage.getItem("name");
    const navigate= useNavigate();
    const handleLogout = async() => {
      await localStorage.clear()
      navigate("/");
    }
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} style={{borderBottom:"1px solid #c7c8c9"}}>
          <Container fluid style={{marginBottom:"0"}}>
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
                  <span onClick={() => navigate("/admin/dashboard")} style={{cursor:"pointer",marginBottom:"1rem"}}>Home</span>
                  <span onClick={() => navigate("/admin/seeAllStudents")} style={{cursor:"pointer",marginBottom:"1rem"}}>See All Students</span>
                  <span onClick={() => navigate("/admin/blockStudent")} style={{cursor:"pointer",marginBottom:"1rem"}}>Block a Student</span>
                  <span onClick={() => navigate("/admin/unblockStudent")} style={{cursor:"pointer",marginBottom:"1rem"}}>Unblock a Student</span>
                  <span onClick={() => navigate("/admin/seeAllQuizes")} style={{cursor:"pointer",marginBottom:"1rem"}}>See all Quizes</span>
                  <span onClick={handleLogout} style={{cursor:"pointer",marginBottom:"1rem"}}>Logout</span>
                  
                </Nav>
                
              </Offcanvas.Body>
            
            </Navbar.Offcanvas>
            
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default SubNav;
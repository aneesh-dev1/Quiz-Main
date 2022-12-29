import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { useNavigate } from 'react-router-dom'
import SubNav from './SubNav'
const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <><SubNav />
    <div style={{width:"98.5vw",height:"80vh"}}>
        
        <div className="adminContainer" style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-between"}}>
          <div className="leftContainer" style={{width:"60%",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <img src="https://i.pinimg.com/originals/b9/e4/96/b9e4960c1476c78043d499d975f86cdb.gif" alt="pro" style={{width:"30rem",borderRadius:"4rem"}} />          </div>
          <div className="rightContainer" style={{width:"40%",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <ListGroup>
            
      <ListGroup.Item action variant="light" style={{marginBottom:"1rem"}} onClick={() => navigate("/Quiz-Main/admin/seeAllStudents")}>
        See All Students
      </ListGroup.Item>
      <ListGroup.Item action variant="light" style={{marginBottom:"1rem"}} onClick={() => navigate("/Quiz-Main/admin/seeAllTeachers")}>
        See All Teachers
      </ListGroup.Item>
      <ListGroup.Item action variant="light" style={{marginBottom:"1rem"}} onClick={() => navigate("/Quiz-Main/admin/blockStudent")}>
        Block Student 
      </ListGroup.Item>
      <ListGroup.Item action variant="light" style={{marginBottom:"1rem"}} onClick={() => navigate("/Quiz-Main/admin/unblockStudent")}>
        Unblock Student
      </ListGroup.Item>
      
      
      <ListGroup.Item action variant="light" style={{marginBottom:"1rem"}} onClick={() => navigate("/Quiz-Main/admin/blockTeacher")}>
        Block Teacher 
      </ListGroup.Item>
      <ListGroup.Item action variant="light" style={{marginBottom:"1rem"}} onClick={() => navigate("/Quiz-Main/admin/unblockTeacher")}>
        Unblock Teacher
      </ListGroup.Item>
      <ListGroup.Item action variant="light" style={{marginBottom:"1rem"}} onClick={() => navigate("/Quiz-Main/admin/seeAllQuizes")}>
        All Quizes
      </ListGroup.Item>
     
      
    </ListGroup>
          </div>
        </div>
    </div>
    </>
  )
}

export default AdminDashboard
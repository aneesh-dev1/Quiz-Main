import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import SubNav from "../SubNav";

const SeeTeachers = () => {
  const [show, setShow] = useState(true);
  const [data,setData] = useState([])
  const [showNext, setShowNext] = useState(false)
  const navigate = useNavigate();

  const seeStudents = async (e) => {
    api
      .get("/admin/teachers/list", {})
      .then((res) => {
        
        console.log(res.data);
        setShow(false)
        setShowNext(true)
        setData(res.data.user)
      })
      .catch((err) => console.log(err));
      
  };

  return (
    <>
    <SubNav />
    <div
      style={{
        width: "98vw",
        height: "80vh",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        
      {show && (
        <Button variant="secondary" onClick={seeStudents}>
          See All Teachers
        </Button>
      )}

      {showNext && <><Table striped bordered hover style={{width:"80vw"}}>
        <thead>
          <tr>
            
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Blocked</th>
          </tr>
        </thead>
        <tbody>
        {
            data.map((item,index)=>{
                return(
                  <tr key={index}>
                        
                        <td>{item._id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{String(item.blocked)}</td>
                        
                    </tr>
                )
            })
        }
        </tbody>
      </Table>
      <div  style={{width:"80vw",display:"flex",justifyContent:"space-evenly"}}>
        <Button variant="secondary" onClick={() => navigate("/admin/blockTeacher")} >
          Block Teacher
        </Button>
        <Button variant="secondary" onClick={() => window.location.reload()} >
          Go Back
        </Button>
        <Button variant="secondary" onClick={() => navigate("/admin/unblockTeacher")} >
          Unblock Teacher
        </Button>
        </div>
      </>}
      
    </div></>
  );
};

export default SeeTeachers;
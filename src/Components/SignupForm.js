import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "../api/axios"
import Loading from './Loading'

const Signup = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [setRole, setSetRole] = useState(true);
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const handleClose = () => setShow(false);


  const handleSignIn = async(e) => {
    e.preventDefault();
    if(setRole){
      setTimeout(() => {
    api
      .post("/user/student/register",{
        email,
        firstName,
        lastName,
        password,
      })
      .then((res) => {
        const userId = res.data._id || false;
        setLoading(false);
        if (userId) {
          localStorage.setItem("user", userId);
          alert('Successfully Login')
          
        } else {
          const { message } = res.data;
          setStatus(message)
        }
      })},5000)
      setLoading(true)
    }
    else if(!setRole){
      setTimeout(() => {
      api
        .post("/user/teacher/register", {
          email,
          firstName,
          lastName,
          password,
        })
        .then((res) => {
          
          setLoading(false);
          const userId = res.data._id || false;
          if (userId) {
            localStorage.setItem("user", userId);
            alert('Successfully Login')
            
          } else {
            const { message } = res.data;
            setStatus(message)
            
          }
        })},5000);
        setLoading(true);
    }
    if(!email||!password||!firstName||!lastName){
      setStatus("Please fill all the details..")
      setLoading(false);
    }
    
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <span
          style={{ fontWeight: "500", fontSize: "1.6rem", color: "#000000" }}
        >
          Welcome to Quizo
        </span>
      </Modal.Header>
      <Modal.Body
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="https://www.successsensation.com/wp-content/uploads/2021/02/b1.3.gif"
          alt="signup"
          style={{
            width: "13rem",
            borderRadius: "2.5rem",
            marginBottom: "2rem",
          }}
        />
        <Form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Form.Group className="mb-3" >
              {/* <Form.Label>Firstname</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Firstname"
                style={{
                  border: "none",
                  boxShadow: "0px 3px 10px 1px #ededed",
                  borderRadius: "1.2rem",
                  marginBottom: "0.5rem",
                  padding: "0.8rem",
                }}
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              {/* <Form.Label>Lastname</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Lastname"
                style={{
                  border: "none",
                  boxShadow: "0px 3px 10px 1px #ededed",
                  borderRadius: "1.2rem",
                  marginBottom: "0.5rem",
                  padding: "0.8rem",
                }}
                value={lastName} onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </div>
          <Form.Group
            className="mb-3"
            style={{ margin: "0 1rem" }}
            
          >
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              style={{
                border: "none",
                boxShadow: "0px 4px 10px 1px #ededed",
                borderRadius: "1.2rem",
                marginBottom: "0.5rem",
                padding: "0.8rem",
              }}
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            
          </Form.Group>
          <Form.Group style={{ display: "flex", justifyContent: "space-around" ,marginBottom:"1rem"}}>
            <Form.Check inline label="Student" name="role" type="radio" value={setRole}   onClick={()=>setSetRole(true)} />
            <Form.Check inline label="Faculty" name="role" type="radio" value={setRole} onClick={()=>setSetRole(false)}/>
          </Form.Group>
          <Form.Group className="mb-3" style={{ margin: "0 1rem" }}>
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Enter your password"
              style={{
                border: "none",
                boxShadow: "0px 4px 10px 1px #ededed",
                borderRadius: "1.2rem",
                marginBottom: "0.5rem",
                padding: "0.8rem",
              }}
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div
        style={{
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          alignItems:"center",
          marginBottom: "1rem",
        }}
      >
        <Button
          style={{
            
            backgroundColor: "#8692a6",
            borderRadius: "15px",
            padding: "0.5rem 1.5rem",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}
          onClick={handleSignIn}
        >
          {loading && <Loading />}
          {loading && `Please Wait`}
          {!loading&& `Sign Up` }
        </Button>
        <div style={{color:"red"}}>{status}</div>
      </div>
        </Form>
      </Modal.Body>
      
    </Modal>
  );
};

export default Signup;

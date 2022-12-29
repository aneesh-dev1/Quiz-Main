import React,{useState} from 'react'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import './styles/changePassword.css'
import api from "../api/axios"
import {useNavigate} from "react-router-dom"
import Loading from './Loading'


const ChangePassword = () => {
  const [show, setShow] = useState(true)
  const [showNext, setShowNext] = useState(false)
  const [showEmail, setshowEmail] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const handleChange = async(e) => {
    
    if(!email){
      setshowEmail("Please Enter Your Email Address")
    }
    else{
      e.preventDefault();
      

      setTimeout(() => {

    api.post("/user/emailSend",{
      email
    }).then((res) => {
      console.log(res)
      const id = res.data._id;
      if(id){
      setShow(false)
      setShowNext(true)
      }
      else{
        setshowEmail(res.data.msg)
        setLoading(false)
      }
    }).catch((err) => {
      console.log(err);
    })},3000);
    setLoading(true);
    }
  }
  return (
    <div className='change-password'>
       <Card style={{ width: '25rem'}}>
      {show && <Card.Body>
        <Card.Title style={{marginBottom:"3rem",overflowY:"hidden"}}>Forgot Password?</Card.Title>
        <Card.Subtitle className=" text-muted" style={{marginBottom:"1rem",overflowY:"hidden"}}>Please enter your registered your email address</Card.Subtitle>
          <Form.Control
            type="text"
            placeholder="Email Address"
            style={{marginBottom:"0.5rem",boxShadow:"0px 15px 40px 5px #ededed",borderRadius:"2rem"}}
            value={email} onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="status" style={{width:"100%",display:"flex",justifyContent:"center",color:"red",marginBottom:"0.5rem"}}>{showEmail}</div>
        <div className="button" style={{width:"100%",display:"flex",justifyContent:"center"}}><Button  variant="secondary" onClick={handleChange} disabled={loading} style={{display:"flex",
            justifyContent:"center",
            alignItems:"center"}}>{loading && <Loading/>}{loading && `Please Wait`}{!loading&& `Submit`}</Button></div>
        
      </Card.Body>}
      {
        showNext && <Card.Body>
        <Card.Title style={{marginBottom:"3rem",overflowY:"hidden"}}>Forgot Password?</Card.Title>
        <Card.Subtitle className=" text-muted" style={{marginBottom:"1rem",width:"100%",display:"flex",justifyContent:"center",overflowY:"hidden"}}>Password sent successfully...</Card.Subtitle>
          
        <div className="button" style={{width:"100%",display:"flex",justifyContent:"center"}}><Button variant="secondary" onClick={() => navigate("/Quiz-Main/otp")}>Enter otp</Button></div>
      </Card.Body>
      }

    </Card>

    </div>
  )
}

export default ChangePassword
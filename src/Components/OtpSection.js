import React,{useState} from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './styles/otp.css'
import api from '../api/axios'
import Loading from './Loading'

const OtpSection = () => {
    
    const [result, setResult] = useState('')
    const [showNext,setShowNext] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [cnfPassword, setCnfPassword] = useState('')
    const [state, setState] = useState('')
    const [loading, setLoading] = useState(false)
    const handlePassChange = async(e) => {
        if(password===cnfPassword){
          
          setTimeout(() => {
          api.post("/user/changePassword",{
            email,
            otpCode:otp,
            password
          }).then((res) => {
            setLoading(false);
            setShowNext(true);
            setResult(res.data.msg);
          }).catch((err) => {
            console.log(err);
          })},5000)
          setLoading(true);
        }
        else{
          setState('Password dont match..Please Check Again')
        }
    }
  return (
    <div className='otp'>
        <Card style={{ width: '25rem'}}>
      <Card.Body>
        <Card.Title style={{marginBottom:"3rem",overflowY:"hidden"}}>Forgot Password?</Card.Title>
        <Card.Subtitle className=" text-muted" style={{marginBottom:"1rem",overflowY:"hidden"}}>Please enter your registered your email address</Card.Subtitle>
          <Form.Control
            type="text"
            placeholder="Email Address"
            style={{marginBottom:"1rem",boxShadow:"0px 15px 40px 5px #ededed",borderRadius:"2rem"}}
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="One Time Password"
            style={{marginBottom:"1rem",boxShadow:"0px 15px 40px 5px #ededed",borderRadius:"2rem"}}
            value={otp} onChange={(e) => setOtp(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="Password"
            style={{marginBottom:"1rem",boxShadow:"0px 15px 40px 5px #ededed",borderRadius:"2rem"}}
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Confirm Password"
            style={{marginBottom:"0.5rem",boxShadow:"0px 15px 40px 5px #ededed",borderRadius:"2rem"}}
            value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)}
          />
          <div style={{color:"red",width:"100%",display:"flex",justifyContent:"center"}}>{state}</div>
        <div className="button" style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"0.5rem"}}><Button variant="secondary" onClick={handlePassChange} style={{display:"flex",
            justifyContent:"center",
            alignItems:"center"}}>{loading && <Loading/>}{` `}{loading && `Please Wait`}{!loading&& `Submit`}</Button></div>
      </Card.Body>
      {showNext && <Card.Body>
        <div className="res"style={{width:"100%",display:"flex",justifyContent:"center"}}>{result}</div>
      </Card.Body>}
    </Card>
    </div>
  )
}

export default OtpSection
import React ,{useState} from 'react'
import SignupForm from './SignupForm'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [showSignUp, setShowSignUp] = useState(false)
  const [status, setStatus] = useState('')
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    

    
    setTimeout(() => {
    api
      .post("/user/login", {
        email,
        password,
      })
      .then(async(res) => {
       
        
        const userId = await res.data._id || false;
        
        if (userId) {
          const role = res.data.role;
          const name = res.data.firstName;
           localStorage.setItem("name",name)
          await localStorage.setItem("id",userId)
          
          localStorage.setItem("role",role);
          setTimeout(() => {
            if(role === "admin"){
              navigate("/Quiz-Main/admin/dashboard");
            }
            else if(role === "student"){
              if(res.data.blocked){
                alert("You are Blocked.Please Contact Admin");
                setLoading(false)
              }
              else{
                navigate(`/Quiz-Main/student/${userId}`)
              }
            }
          },2000)
       
        } else {
          setStatus(res.data.msg)
          setLoading(false)
        }
      })},5000);
      setLoading(true)
      
      
  };
  return (
    <div><div className="loginHeading">Login to your Account</div>
    <div className="loginSubHeading">
      with your registered Email Address
    </div>
    <hr></hr>
    <div className="emailHeading">Email Address*</div>
    <div className="emailInput">
      <input type="text" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)}  />
    </div>
    <div className="emailHeading">Password*</div>
    <div className="emailInput">
      <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <span className="forgot" onClick={() => navigate("/Quiz-Main/change-password")}>Forgot Password? </span>
    <div className="status">{status}</div>
    
    
    
    <div className="submitButton">
      <button  className="submit" onClick={handleSubmit}  style={{display:"flex",justifyContent:"center",alignItems:"center"}} disabled={loading}>{loading && <Loading color={"#000000"}/>}{` `} {loading && `Please Wait`}{!loading && `Submit`}</button>
      <span className="signUp" onClick={() => setShowSignUp(true)}>Not a User? Sign Up </span>
    </div>
    {showSignUp && <SignupForm show={showSignUp} setShow={setShowSignUp}/>}
    </div>
  )
}

export default LoginForm
//https://www.successsensation.com/wp-content/uploads/2021/02/b1.3.gif
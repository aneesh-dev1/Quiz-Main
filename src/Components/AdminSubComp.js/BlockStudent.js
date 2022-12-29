import React,{useState} from "react";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import api from "../../api/axios";
import SubNav from "../SubNav";

const BlockStudent = () => {
    const [status, setStatus] = useState('');
    const [noid, setNoid] = useState('')
    const [id, setId] = useState('')
    const handleBlock = async(e) => {
      e.preventDefault();
      if(!id){
        setNoid("Please Enter A Correct Id..")
      }
      api.delete(`/admin/user/block/${id}`,{params:{
        id
      }}).then((res) => {
        console.log(res);
        setStatus(res.data.message)
      }).catch((err) => console.log(err));
    }
  return (
    <>
    <SubNav/>
    <div
      style={{
        width: "98vw",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

     <Card style={{ width: '25rem'}}>
      
       <Card.Body>
        <Card.Title style={{marginBottom:"3rem",display:"flex",justifyContent:"center",overflowY:"hidden"}}>Block User</Card.Title>
        <Card.Subtitle className=" text-muted" style={{marginBottom:"1rem",width:"100%",display:"flex",justifyContent:"left",marginLeft:"1rem",overflowY:"hidden"}}>Please enter id </Card.Subtitle>
        <Form.Control
            type="text"
            placeholder="Enter Id"
            style={{marginBottom:"1rem",boxShadow:"0px 15px 40px 5px #ededed",borderRadius:"2rem"}}
            value={id} onChange={(e) => setId(e.target.value)}
          />
          
        <div className="button" style={{width:"100%",display:"flex",justifyContent:"center"}}><Button variant="secondary" onClick={handleBlock}>Block</Button></div>
        <div className="status" style={{width:"100%",display:"flex",justifyContent:"center",color:"red",marginTop:"1rem"}}>{status}</div>
        <div className="status" style={{width:"100%",display:"flex",justifyContent:"center",color:"red",marginTop:"1rem"}}>{noid}</div>
      </Card.Body>
      

    </Card>
    </div>
    </>
  );
};

export default BlockStudent;

import React,{useState} from 'react'
import SubNav from '../SubNav'
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import api from '../../api/axios';

const QuizList = () => {
    const [show, setShow] = useState(true);
  const [data,setData] = useState([])
  const [showNext, setShowNext] = useState(false)
  const seeQuiz = async(e) => {
    setShow(false)
    api.get("/getallquiz",{}).then((res) => {
        console.log(res);
        setData(res.data.quiz)

    })
    setShowNext(true)
  }
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
        <Button variant="secondary" onClick={seeQuiz}>
          See All Quizes
        </Button>
      )}

      {showNext && <><Table striped bordered hover style={{width:"80vw"}}>
        <thead>
          <tr>
            
            <th>Quiz Id</th>
            <th>Quiz Name</th>
            <th>Quiz Description</th>
            <th>Creator Name</th>
            <th>Creator Email</th>
            <th>Uploaded</th>

          </tr>
        </thead>
        <tbody>
        {
            data.map((item,index)=>{
                return(
                  <tr key={index}>
                        
                        <td>{item._id}</td>
                        <td>{item.quizName}</td>
                        <td>{item.quizDescription}</td>
                        <td>{item.teacherName}</td>
                        <td>{item.teacherEmail}</td>
                        <td>{String(item.upload)}</td>
                        
                    </tr>
                )
            })
        }
        </tbody>
      </Table>
      <div  style={{width:"80vw",display:"flex",justifyContent:"space-evenly"}}>
      <Button variant="secondary" onClick={() => window.location.reload()} >
          Go Back
        </Button>
        </div>
      </>}
      
    </div></>
  )
}

export default QuizList
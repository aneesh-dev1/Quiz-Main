import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import WarnModal from "./WarnModal";
import screenfull from "screenfull";
import { Button } from "react-bootstrap";
import api from "../../api/axios";

const QuizScreen = () => {
  const location = useLocation();
  const [show, setShow] = useState(true)
  const [submit, setSubmit] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [currindex, setCurrindex] = useState(0);
  let [selectedOption, setSelectedOption] = useState("");
  const [responses, setResponses] = useState([]);
  const lastIndex = currindex + 1 === location.state.question.data.length;
  const navigate = useNavigate();

  const exitHandler = () => {
    if (
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setModalShow(true);
    }
  };
  if (document.addEventListener) {
    document.addEventListener("webkitfullscreenchange", exitHandler, false);
    document.addEventListener("mozfullscreenchange", exitHandler, false);
    document.addEventListener("fullscreenchange", exitHandler, false);
    document.addEventListener("MSFullscreenChange", exitHandler, false);
  }
  const handleSubmit = () => {
    const answer = responses;
    setShow(false)
      api
        .post("/student/sendAnswer", {
          id: localStorage.getItem("id"),
          quizId: location.state.quiz.id,
          quizName: location.state.quiz.quizname,
          answer: answer,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    setSubmit(true)
    setTimeout(() => {
      screenfull.exit()
      navigate(`/Quiz-Main/student/${localStorage.getItem("id")}`)
    },3000)
  
  };
  return (
    <div
      className="outerContainer"
      style={{
        padding: "1rem",
        width: "98.5vw",
        height: "95vh",
        backgroundColor: "#ededed",
      }}
    >
      <div
        className="innerConatiner"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "2rem",
          boxShadow: "20px 10px 10px 10px #ededed",
          backgroundColor: "white",
          padding: "1rem",
          paddingLeft: "1.5rem",
        }}
      >
        {modalShow && (
          <WarnModal
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              if (screenfull.isEnabled) {
                screenfull.request();
              }
            }}
          />
        )}
       {show && <> <div
          className="heading"
          style={{
            fontFamily: "Poppins",
            fontWeight: "700",
            fontSize: "2rem",
            color: "#696F79",
          }}
        >
          {location.state.quiz.quizname}
        </div>
        <div
          className="subheading"
          style={{
            fontFamily: "Poppins",
            fontWeight: "100",
            fontSize: "0.8rem",
            color: "#696F79",
            marginBottom: "1rem",
          }}
        >
          Answer the question below
        </div>
        <div
          className="question"
          style={{
            fontFamily: "Poppins",
            fontWeight: "100",
            fontSize: "1.6rem",
            color: "#696F79",
            marginBottom: "2rem",
          }}
        >
          Question {currindex + 1}/{location.state.question.data.length}
        </div>
        <div
          className="currQuestion"
          style={{
            fontFamily: "Poppins",
            fontWeight: "100",
            fontSize: "1rem",
            color: "#696F79",
          }}
        >
          {location.state.question.data[currindex].questionText}
        </div>
        <div className="options" style={{ marginTop: "2rem" }}>
          {location.state.question.data[currindex].options.map((option, i) => {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name="question"
                  value={option}
                  id={location.state.question.data._id}
                  className="option"
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                />
                <label
                  htmlFor={location.state.question.data._id}
                  id={location.state.question.data._id}
                  style={{
                    padding: "0.8rem",
                    fontFamily: "Poppins",
                    fontWeight: "100",
                    fontSize: "1rem",
                    color: "#696F79",
                  }}
                >
                  {option}
                </label>
              </div>
            );
          })}
        </div>
        <div
          className="btu"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3rem",
          }}
        >
          <div className="rightbtn">
            <Button
              variant="secondary"
              onClick={() => {

                  setCurrindex(currindex - 1);
                  
                
              }}
              disabled={currindex===0}
              style={{ marginRight: "1rem" }}
            >
              Prev
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                if (currindex < location.state.question.data.length) {
                  setCurrindex(currindex + 1);
                }
                
                  var radio = document.querySelector("input[type=radio]:checked");
                  radio.checked = false;
                
              }}
              disabled={lastIndex}
              style={{ marginRight: "1rem" }}
            >
              Next
            </Button>
            <Button
              variant="secondary"
              style={{ marginRight: "1rem" }}
              onClick={() => {
                setResponses((responses) => [...responses, selectedOption]);
              }}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={handleSubmit}
              disabled={!lastIndex}
            >
              Submit
            </Button>
          </div>
        </div>
        </>
        }
        {submit&&
          <div
          className="heading"
          style={{
            fontFamily: "Poppins",
            fontWeight: "500",
            fontSize: "1.5rem",
            color: "#696F79",
            width:"100%",
            height:"100%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column"
            
          }}
        >
          Thank You For Your Attempt. <div>Your Result will be available within 48 hours at your registered email id...</div>
        </div>
        }
      </div>
    </div>
  );
};

export default QuizScreen;

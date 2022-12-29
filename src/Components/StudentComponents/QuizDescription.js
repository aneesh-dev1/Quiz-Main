import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../styles/quizdesc.css";
import WarnModal from "./WarnModal";
import screenfull from "screenfull";
import api from "../../api/axios";
import SaveModal from "./SaveModal";

const QuizDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [modalScreenShow, setModalScreenShow] = useState(false)

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
  const handleQuizStart = () => {
    setModalScreenShow(true);
    setTimeout(() => {
     
    },5000)
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
        {modalScreenShow && (
          <SaveModal
            show={modalScreenShow}
            onHide={() => {
              setModalScreenShow(false);
              if (screenfull.isEnabled) {
                screenfull.request();
              }
              const id = location.state.id;
              api
                .get(`/student/getAllQuestion/${id}`, {})
                .then((res) => {
                  navigate(`/quiz/${location.state.quizname}/${location.state.id}`,{
                    state:{
                      quiz:{
                        id: location.state.id,
                        quizname:location.state.quizname,
                      },
                      user:{
                        id:localStorage.getItem("id"),
                        username:localStorage.getItem("name")
                      },
                      question:{
                        data:res.data.msg
                      }
                    }
                  })
                })
                .catch((err) => console.log(err));
            }}
          />
        )}
        <div
          className="head"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5rem",
          }}
        >
          <div
            className="heading"
            style={{
              fontFamily: "Poppins",
              fontWeight: "700",
              fontSize: "2rem",
              color: "#696F79",
            }}
          >
            {location.state.quizname}
          </div>
          <div className="start">
            <Button
              variant="secondary"
              style={{ width: "8rem" }}
              onClick={handleQuizStart}
            >
              {" "}
              Start
            </Button>
          </div>
        </div>
        <div
          className="subheading"
          style={{
            fontFamily: "Poppins",
            fontWeight: "100",
            fontSize: "0.8rem",
            color: "#696F79",
          }}
        >
          Read the following intructions carefully
        </div>
        <div
          className="intro"
          style={{
            width: "100%",
            height: "50%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="introleft"
            style={{
              overflowY: "hidden",
              borderRadius: "3rem",
              paddingLeft: "3rem",
            }}
          >
            <img
              src={location.state.imageUrl}
              alt="quizlogo"
              style={{
                borderRadius: "3rem",
                width: "25rem",
                boxShadow: "0 10px 10px 12px #ededed",
              }}
              className="zoom"
            />
          </div>
          <div className="introRight">
            <ul>
              <li>
                Date :{" "}
                <em>
                  {new Date().toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </em>
              </li>
              <li>
                Faculty : <em>{location.state.creator}</em>
              </li>
              <li>
                Faculty Mail :<em> {location.state.mail}</em>
              </li>
              <li>
                Total Points : <em>100</em>
              </li>
            </ul>
          </div>
        </div>
        <div className="intruction">
          <div
            className="heading"
            style={{
              fontFamily: "Poppins",
              fontWeight: "100",
              fontSize: "1.1rem",
              color: "#696F79",
            }}
          >
            Instruction
          </div>
          <div className="instructionBody">
            <ol>
              <em>
                <li className="item">
                  This quiz consists of multiple-choice questions. To be
                  successful with the quizzes, it's important to conversant with
                  the topics. Keep the following in mind:
                </li>

                <li className="item">
                  Timing - You need to complete each of your attempts in one
                  sitting, as you are allotted 30 minutes to each attempt.
                  Answers - You may review your answer-choices and compare them
                  to the correct answers after your final attempt.
                </li>
                <li className="item">
                  {" "}
                  To start, click the "Start" button. When finished, click the
                  "Submit " button.
                </li>
              </em>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDescription;

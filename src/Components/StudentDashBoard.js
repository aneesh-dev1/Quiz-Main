import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import screenfull from "screenfull";
import api from "../api/axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import StudSubNav from "./StudentComponents/StudSubNav";
import { MdDashboard, MdOutlineQuestionAnswer } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";

const StudentDashBoard = () => {
  const [show, setShow] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleDashboard = () => {
    if (!show) {
      setShowNext(false);
      setTimeout(() => {
        setShow(true);
        setLoading(false);
      }, 5000);
      setLoading(true);
    }
  };

  // const handleBlockMe = () => {
  //   const id = localStorage.getItem("id");
  //   if (id) {
  //     api
  //       .post(`/teacher/blockStudent/${id}`, {
  //         id,
  //       })
  //       .then((res) => {
  //         localStorage.clear();
  //         navigate("/");
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     alert("Please relogin");
  //   }
  // };
  const handleQuiz = async () => {
    if (!showNext) {
      setShow(false);

      setTimeout(() => {
        setLoading(false);
        api
          .get("/getAllQuiz", {})
          .then((res) => {
            setShowNext(true);
            setData(res.data.quiz);
          })
          .catch((err) => console.log(err));
      }, 5000);
      setLoading(true);
    }
  };
  const handleattempt = (id) => {
    setShowNext(false);
    setLoading(true);
    setTimeout(() => {
      if (screenfull.isEnabled) {
        screenfull.request();
      }
      api.post("/student/validQuiz", { id }).then((res) => {
        navigate(
          `/Quiz-Main/quiz/quizdescription/${res.data.msg._id}/${res.data.msg.quizName}`,
          {
            state: {
              id: res.data.msg._id,
              quizname: res.data.msg.quizName,
              quizdesc: res.data.msg.quizDescription,
              creator: res.data.msg.teacherName,
              mail: res.data.msg.teacherEmail,
              imageUrl: res.data.msg.imageUrl,
            },
          }
        );
      });
    }, 2000);
  };
  return (
    <>
      <StudSubNav />
      <div style={{ width: "98.5vw", height: "80vh" }}>
        <div
          className="studentContainer"
          style={{
            width: "98.5vw",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="leftContainer"
            style={{
              width: "15%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ListGroup
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginTop: "4rem",
              }}
            >
              <ListGroup.Item
                action
                variant="light"
                style={{
                  border: "none",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
                onClick={handleDashboard}
              >
                <MdDashboard size={25} style={{ marginRight: "0.5rem" }} />
                {` `} Dashboard
              </ListGroup.Item>
              <ListGroup.Item
                action
                variant="light"
                style={{
                  border: "none",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleQuiz}
              >
                <MdOutlineQuestionAnswer
                  size={25}
                  style={{ marginRight: "0.5rem" }}
                />{" "}
                Available Quizes
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div
            className="rightContainer"
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {show && (
              <img
                src="https://quantumhunts.com/user/assets/images/hero/hiring-manager-quantumhunts.gif"
                alt="pro"
                style={{ width: "30rem", borderRadius: "4rem" }}
              />
            )}
            {loading && (
              <div
                className="centerLoader"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "8rem",
                  marginRight: "4rem",
                }}
              >
                {" "}
                <HashLoader color={"#b3b3b3"} size={90} />{" "}
              </div>
            )}

            {showNext && (
              <>
                <div
                  className="head"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fonstSize: "3rem",
                    color: "#000000",
                    marginBottom: "1rem",
                  }}
                >
                  Quizes
                </div>
                <Table striped bordered hover style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Quiz Id</th>
                      <th>Quiz Name</th>
                      <th>Creator</th>
                      <th>Creator Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, i) => {
                      if (item.upload === true) {
                        return (
                          <tr key={i}>
                            <td>{item._id}</td>
                            <td>{item.quizName}</td>
                            <td>{item.teacherName}</td>
                            <td>
                              <em>{item.teacherEmail}</em>
                            </td>
                            <td>
                              <Button onClick={() => handleattempt(item._id)}>
                                {" "}
                                <AiOutlineRight />
                              </Button>
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </Table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashBoard;

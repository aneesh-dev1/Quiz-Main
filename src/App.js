import React from "react";
import Login from "./Components/Login";
import Navigation from "./Components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Footer from "./Components/Footer";
import ChangePassword from "./Components/ChangePassword";
import OtpSection from "./Components/OtpSection";
import AdminDashboard from "./Components/AdminDashboard";
import SeeStudents from "./Components/AdminSubComp.js/SeeStudents";
import BlockStudent from "./Components/AdminSubComp.js/BlockStudent";
import SeeTeachers from "./Components/AdminSubComp.js/SeeTeachers";
import UnblockStudent from "./Components/AdminSubComp.js/UnblockStudent";
import QuizList from "./Components/AdminSubComp.js/QuizList";
import StudentDashBoard from "./Components/StudentDashBoard";
import QuizScreen from "./Components/StudentComponents/QuizScreen";
import QuizDescription from "./Components/StudentComponents/QuizDescription";

const App = () => {
  return (
    <div>
      <Navigation />

      <Router>
        <Routes>
          {/* <Route index element={<Login />} /> */}
          <Route path="/Quiz-Main" element={<Login />} />
          <Route path="/Quiz-Main/change-password" element={<ChangePassword />} />
          <Route path="/Quiz-Main/otp" element={<OtpSection />} />

          <Route path="/Quiz-Main/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/Quiz-Main/admin/seeAllStudents" element={<SeeStudents />} />
          <Route path="/Quiz-Main/admin/seeAllTeachers" element={<SeeTeachers />} />
          <Route path="/Quiz-Main/admin/blockStudent" element={<BlockStudent />} />
          <Route path="/Quiz-Main/admin/blockTeacher" element={<BlockStudent />} />
          <Route path="/Quiz-Main/admin/unblockStudent" element={<UnblockStudent />} />
          <Route path="/Quiz-Main/admin/unblockTeacher" element={<UnblockStudent />} />
          <Route path="/Quiz-Main/admin/seeAllQuizes" element={<QuizList />} />
          <Route path={`/Quiz-Main/student/:id`} element={<StudentDashBoard />} />
          <Route
            path={`/Quiz-Main/quiz/quizdescription/:quizid/:quizname`}
            element={<QuizDescription />}
          />
          <Route path={`/Quiz-Main/quiz/:name/:id`} element={<QuizScreen />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;

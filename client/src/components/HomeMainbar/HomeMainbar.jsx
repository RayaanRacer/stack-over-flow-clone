import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";

import "./HomeMainbar.css";
import { useSelector } from "react-redux";



function HomeMainbar() {


  const questionList = useSelector(state=> state.questionReducer )
  const location = useLocation();
  const navigate = useNavigate();
  const user =  useSelector((state) => state.currentUserReducer);;
  const authCheck = () => {
    if (user === null) {
      alert("please Login or Signup to ask a Question!");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };


  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={authCheck} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionList === null ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <p>{questionList?.data.length} questions</p>
            <QuestionList questionList={questionList} />
          </>
        )}
      </div>
    </div>
  );
}

export default HomeMainbar;

import React, { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import upVotes from "../../assets/sort-up.svg";
import downVotes from "../../assets/sort-down.svg";
import Avatar from "../../components/avatar/Avatar";
import "./Questions.css";
import DisplayAnswer from "./DisplayAnswer";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, postAnswer, voteQuestion } from "../../actions/question";
import copy from "copy-to-clipboard";
function QuestionDetails() {
  const { id } = useParams();
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer);
  const questionList = useSelector((state) => state.questionReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const url = `http://localhost:3000${location.pathname}`;

  const handlePostAns = (e, answerLeangth) => {
    e.preventDefault();
    if (user === null) {
      alert("Please Login or Signup to answer a Question!");
      navigate("/Auth");
    } else {
      if (answer === "") {
        alert("Enter an answer before press the submit button");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLeangth + 1,
            answerBody: answer,
            userAnswered: user.result.name,
            userId: user?.result?._id,
          })
        );
        setAnswer("")
      }
    }
  };

  const handleShare = () => {
    copy(url);
    alert("Copied Url :  " + url);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () =>{
    dispatch(voteQuestion(id,'upVote', user.result._id))
  }

  const handleDownVote = () =>{
    dispatch(voteQuestion(id,'downVote', user.result._id))
  }
  return (
    <div className="question-details-page">
      {questionList === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionList?.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <FontAwesomeIcon icon={faSortUp} className="votes-icon" 
                      onClick={handleUpVote}/>
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <FontAwesomeIcon icon={faSortDown} className="votes-icon"
                      onClick={handleDownVote}/>
                    </div>

                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tag">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-action-user">
                        <div>
                          <button onClick={handleShare}>share</button>
                          {user?.result?._id === question?.userId && (
                            <button onClick={handleDelete}>Delete</button>
                          )}
                        </div>

                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px={`8px`}
                              py={`5px`}
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {question.noOfAnswer !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}

                <section className="post-ans-container">
                  <h3>Your answers</h3>
                  <form
                    onSubmit={(e) => handlePostAns(e, question.answer.length)}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={answer}
                      onChange={(e) => {
                        setAnswer(e.target.value);
                      }}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      value="Post your answer"
                      className="post-ans-btn"
                    />
                  </form>

                  <p>
                    Browse other other question tagged
                    {question.questionTags.map((tag) => (
                      <Link to={`/Tags`} key={tag} className="ans-tag">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}
                    or
                    <Link
                      to={"/AskQuestion"}
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      Ask your Question
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default QuestionDetails;

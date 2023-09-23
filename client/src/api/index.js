import axios from "axios";

const API = axios.create({ baseURL: "https://weary-yak-cummerbund.cyclic.app/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/Login", authData);
export const signUp = (authData) => API.post("/user/Signup", authData);

export const postQuestion = (questionData) =>
  API.post("question/Ask", questionData);
export const getQuestion = () => API.get("question/Get");
export const deleteQuestion = (id) => API.delete(`question/Delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`question/Vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { noOfAnswers, answerId });

export const getAllUsers = () => API.get("user/GetAllUsers");
export const updateUser = (id, updateData) =>
  API.patch(`user/UpdateUser/${id}`, updateData);

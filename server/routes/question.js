import express from "express";
import {
  askQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
} from "../controllers/question.js";
import auth from "../middleWare/auth.js";

const router = express.Router();

router.post("/Ask", askQuestion);
router.get("/Get", getAllQuestions);
router.delete("/Delete/:id", deleteQuestion);
router.patch("/Vote/:id", voteQuestion);

export default router;

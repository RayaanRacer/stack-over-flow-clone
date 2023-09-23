import Question from "../models/questions.js";

import mongoose from 'mongoose'

export const askQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const postQuestion = new Question(postQuestionData);

  try {
    await postQuestion.save();
    res.status(200).json("Posted Question successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Coldn't post a new question");
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questionList = await Question.find();
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const deleteQuestion = async(req,res)=> {
  const {id:_id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)){
    res.status(404).send("Question is not Valid")
}
try {
  await Question.findByIdAndDelete(_id)
  res.status(200).json({message: "deleted successfully"})
} catch (error) {
  res.status(400).json({message:error.message})
}
}

export const voteQuestion = async(req,res) => {
  const {id : _id} = req.params;
  const{value, userId} = req.body;
  

  if(!mongoose.Types.ObjectId.isValid(_id)){
    res.status(404).send("Question is not Valid")
}

try {
  const question = await Question.findById(_id);
  const upIndex = await question.upVote.findIndex((id)=> id === String(userId))
  const downIndex = await question.downVote.findIndex((id)=> id === String(userId))

  if(value === "upVote"){
    if(downIndex !== -1){
      question.downVote = question.downVote.filter((id)=> id !== String(userId))
    }
    if(upIndex === -1){
      question.upVote.push(userId)
    }else{
      question.upVote = question.upVote.filter((id)=> id !==String(userId))
    }
  }
  else if(value === "downVote"){
    if(upIndex !== -1){
      question.upVote = question.upVote.filter((id)=> id !== String(userId))
    }
    if(downIndex === -1){
      question.downVote.push(userId)
    }else{
      question.downVote = question.downVote.filter((id)=> id !==String(userId))
    }
  }
  await Question.findByIdAndUpdate(_id,question)
  res.status(200).json({message: "Voted Successfully..."})

} catch (error) {
  res.status(404).json({message: error.message})
  
}
}
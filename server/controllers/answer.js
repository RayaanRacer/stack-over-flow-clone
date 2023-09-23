import mongoose from 'mongoose'
import Question from "../models/questions.js";

export const postAnswer = async (req,res) => {
    const {id: _id} = req.params;
    const {noOfAnswers, answerBody, userAnswered, userId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).send("Question is not Valid")
    }
    updatedNoOfAnswers(_id, noOfAnswers)
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(_id,{$addToSet: {"answer":[{answerBody, userAnswered,userId}]}})
        res.status(200).json(updatedQuestion)
        
    } catch (error) { 
        res.status(400).json(error)
        
    }
}

const updatedNoOfAnswers = async (_id, noOfAnswers) => {
    try {
        await Question.findByIdAndUpdate(_id,{$set:{"noOfAnswers": noOfAnswers}})

        
    } catch (error) {
        console.log(error)
        
    }
}

export const deleteAnswer = async(req,res)=>{
    const {id: _id} = req.params;
    const {noOfAnswers, answerId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).send("Question is not Valid")
    }
console.log(answerId)
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        res.status(404).send("Answer is not Valid")
    }
    updatedNoOfAnswers(_id, noOfAnswers)

    try {
        await Question.updateOne(
            { _id },
            {$pull: {"answer": {_id : answerId}}}
        )

        res.status(200).json({message:"Successfully Deleted..."})
    } catch (error) {
        res.status(405).json(error)
        
    }

}
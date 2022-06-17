import { AnswerI } from "./answer-i";

export interface QuestionI {
   id:string;
    userId:string;
    question:string;
    type:string;
    category:string;
    answers:[AnswerI];
    start:string;
}

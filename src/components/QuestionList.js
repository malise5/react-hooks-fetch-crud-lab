import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteItem, onAnswerUpdate }) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => {
        return (
          <QuestionItem key={question.id} id={question.id} question={question} onDeleteItem={onDeleteItem} onAnswerUpdate={onAnswerUpdate}  />
        )
        })
        }
      </ul>
    </section>
  );
}

export default QuestionList;

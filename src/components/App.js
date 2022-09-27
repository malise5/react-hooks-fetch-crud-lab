import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const[questions, setQuestions] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then((res)=>res.json())
    .then((data)=>{setQuestions([...data]);})
    
  }, []);

  function onQuestionFormSubmit(formData) {
    
    fetch("http://localhost:4000/questions",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        "prompt": formData.prompt,
        "answers":[formData.answer1, formData.answer2, formData.answer3, formData.answer4],
        "correctIndex":formData.correctIndex
      })
    })
    .then((res)=>res.json())
    .then((data)=>setQuestions([...questions, data]))
  };

  function handleDeleteItem(deletedQuestion){
    const updatedQuestions = questions.filter((question)=> question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions);
  }
  
  function handleAnswerUpdate(newQuestion){
    let updatedQuestion = {...newQuestion, ["correctIndex"]:parseInt(newQuestion.correctIndex)};
    setQuestions(questions.map((question)=>{if(question.id===newQuestion.id){return updatedQuestion}else{return question}}));
  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onQuestionFormSubmit={onQuestionFormSubmit} /> : <QuestionList questions={questions} onDeleteItem={handleDeleteItem} onAnswerUpdate={handleAnswerUpdate} />}
    </main>
  );
}

export default App
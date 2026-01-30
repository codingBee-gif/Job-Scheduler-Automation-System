import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCards";

const questions = [
  { question: "What is React?", answer: "A JavaScript library for building UI" },
  { question: "What is JWT?", answer: "Token-based authentication system" },
  { question: "What is REST API?", answer: "Architecture style for APIs" },
  { question: "What is Node.js?", answer: "JavaScript runtime environment" },
  { question: "What is Express?", answer: "Backend framework for Node.js" },
  { question: "What is MongoDB?", answer: "NoSQL document database" },
  { question: "What is useState?", answer: "React hook for state" },
  { question: "What is useEffect?", answer: "React hook for side effects" },
  { question: "What is Axios?", answer: "HTTP client for APIs" },
  { question: "What is Tailwind?", answer: "Utility-first CSS framework" }
];

function QuestionBoard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const shuffle = () => {
      setCards(
        [...questions].sort(() => Math.random() - 0.5).slice(0, 3)
      );
    };

    shuffle();
    const interval = setInterval(shuffle, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {cards.map((q, i) => (
        <QuestionCard key={i} data={q} />
      ))}
    </div>
  );
}

export default QuestionBoard;

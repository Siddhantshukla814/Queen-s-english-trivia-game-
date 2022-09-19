import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Message from "./components/Message";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");
  const [message, setMessage] = useState(false);
  const [isCorrent, setIsCorrect] = useState(false);
  const [next, setNext] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await axios.get("https://jservice.io/api/random");

      setMessage(false);
      setAnswer(data[0].answer);
      setQuestion(data[0].question);
    };

    fetchQuestion();
  }, [next]);

  const submithandler = (e: any) => {
    e.preventDefault();
    if (answer.toLowerCase() === typedAnswer.toLowerCase()) {
      setIsCorrect(true);
      setMessage(true);
    } else {
      setIsCorrect(false);
      setMessage(true);
    }
  };

  return (
    <>
      <div className="parent">
        <div className="game">
          <div className="main-title-div">
            <h1 className="main-title glow">Trivia Gamee</h1>
          </div>
          <div className="heading-div">
            <h2 className="title">Question</h2>
          </div>
          <div className="question-div">
            <h4 className="question">{question}</h4>
          </div>
          <div className="answer-div">
            <h5 className="headings-color">Your Answer</h5>
            <Form onSubmit={(e) => submithandler(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  autoComplete="new"
                  className="answer"
                  type="text"
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                />
              </Form.Group>
              {message ? (
                <Button
                  variant="success"
                  type="button"
                  onClick={() => {
                    setNext((prev) => !prev);
                    setTypedAnswer("");
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button variant="warning" type="submit">
                  Submit
                </Button>
              )}
            </Form>
          </div>
          {message && (
            <div className="alert-div">
              <Message varient={isCorrent ? "success" : "danger"}>
                {isCorrent
                  ? "Correct 🎉"
                  : `Wrong ❌, Correct Answer Is:- ${answer}`}
              </Message>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

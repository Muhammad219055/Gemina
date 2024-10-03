import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import InputField from "./components/InputField";
import ResponseScree from "./components/ResponseScree";

function App() {
  const [response, setResponse] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [emptySubmission, setEmptySubmission] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);
    setResponse('')
    if (prompt === "") {
      setEmptySubmission(true);
      setTimeout(() => {
        setClicked(false);
        setEmptySubmission(false); // Reset empty submission flag
      }, 3000);
    } else {
      try {
        // Show loader for 3 seconds
        setTimeout(async () => {
          const res = await axios.post("http://localhost:4000/", { prompt });
          setResponse(res.data); // Assuming response structure
          setClicked(false);
          setPrompt("");
        }, 3000);
      } catch (error) {
        console.error("Error:", error);
        setClicked(false);
      }
    }
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <div>
      <ResponseScree
        res={response}
        clicked={clicked}
        emptySubmission={emptySubmission}
      />
      <InputField
        handlePromptSubmit={handlePromptSubmit}
        setPrompt={setPrompt}
        prompt={prompt}
      />
    </div>
  );
}

export default App;

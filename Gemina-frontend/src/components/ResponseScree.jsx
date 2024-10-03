import React from "react";
import Loader from "./Loader";
import marked from "marked";

const ResponseScree = ({ res, clicked, emptySubmission }) => {
  return (
    <div className="response-screen">
      {!clicked && !res && (
        <div>
          <h2>Hi!👋</h2>
          <h4>I'm Gemina, your own story teller.</h4>
          <h6>
            Enter a prompt below to get a story in the blink of an eye! :)
          </h6>
        </div>
      )}

      {clicked && emptySubmission && (
        <div>
          <h1>
            Please write something in the prompt box below before submitting.
          </h1>
          <h6>I can't generate an empty story :(</h6>
        </div>
      )}

      {clicked && !emptySubmission && <Loader />}

      {res && (
        <div
          className="response-text"
          dangerouslySetInnerHTML={{ __html: marked(res) }} // Convert Markdown to HTML
        />
      )}
    </div>
  );
};

export default ResponseScree;

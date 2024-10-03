import React, { useState } from "react";

const InputField = ({ handlePromptSubmit, prompt, setPrompt }) => {
  return (
    <div className="prompt-space">
      <input
        type="text"
        placeholder=""
        value={prompt}
        onChange={(e) => {
          const val = e.target.value;
          setPrompt(val);
        }}
      />
      <button type="submit" onClick={handlePromptSubmit}>
        Generate
      </button>
    </div>
  );
};

export default InputField;

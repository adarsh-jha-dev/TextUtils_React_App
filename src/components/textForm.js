import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [extractedEmails, setExtractedEmails] = useState([]);
  const handleUpClick = (event) => {
    if(!text)
    {
      props.sendAlert("No text", "danger");
    }else{
      console.log("The button is clicked");
      setText(text.toUpperCase());
      props.sendAlert("Converted to UpperCase", "success");
    }
  };
  const handleDownClick = () => {
    // console.log("The button is clicked")
    // setText("You have requested to convert the text to uppercase");
    if(!text)
    {
      props.sendAlert("No text", "danger");
    }else{
      setText(text.toLowerCase());
      props.sendAlert("Converted to LowerCase", "success");
    }
  };
  const handleOnChange = (event) => {
    console.log("On Change");
    setText(event.target.value);
  };

  const handleBold = () => {
    if(!text)
    {
      props.sendAlert("No text", "danger");
    }else{
      document.getElementById("mybox").classList.toggle("bolder");
    props.sendAlert("Bold fonts toggled", "success");
    }
  };

  const handleEmail = () => {
    if (!text) {
      props.sendAlert("No Text", "danger");
    } else {
      const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const emails = text.match(regex) || [];
      setExtractedEmails(emails);
      if (emails.length > 0) {
        navigator.clipboard
          .writeText(emails[0])
          .then(() => {
            props.sendAlert(
              `Email ${emails[0]} copied to clipboard`,
              "success"
            );
          })
          .catch((danger) => {
            props.sendAlert("Failed to copy email to clipboard", "danger");
          });
      } else {
        props.sendAlert("No Emails to copy", "warning");
      }
    }
  };

  const handleCapitalize = () => {
    if(!text)
    {
      props.sendAlert("No Text", "danger");
    }else{
      const words = text.split(" ");
      const capital = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
  
      setText(capital.join(" "));
      props.sendAlert("Capitalized the text", "success");
    }
  };

  const handleItalic = () => {
    if(!text)
    {
      props.sendAlert("No text", "danger");
    }else{
      document.getElementById("mybox").classList.toggle("italic");
      props.sendAlert("Italic font toggled", "success");
    }
  };

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      props.sendAlert("Text Copied to clipboard", "success");
    } else {
      props.sendAlert("No Text to copy", "danger");
    }
  };

  const handleSpaces = () => {
    if (!text) {
      props.sendAlert("No Text", "danger");
    } else {
      const newText = text.split(/[' ']+/);
      setText(newText.join(" "));
      props.sendAlert("Removed the extra spaces", "success");
    }
  };

  const handleClear = () => {
    if(!text)
    {
      props.sendAlert("No text", "danger");
    }else{
      setText("");
      props.sendAlert("Text Cleared", "success");
    }
  };

  return (
    <>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            id="mybox"
            value={text}
            placeholder="Enter text here"
            onChange={handleOnChange}
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2 my-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={handleDownClick}>
          Convert to Lowercase
        </button>
        <button
          className="btn btn-primary mx-2 my-1"
          onClick={handleCapitalize}
        >
          Capitalize
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={handleBold}>
          Make Bold
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={handleItalic}>
          Make Italic
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={handleEmail}>
          Extract Email
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={handleCopy}>
          Copy Text
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={handleSpaces}>
          Remove Extra Spaces
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={handleClear}>
          Clear Text
        </button>
      </div>
      <div
        className="container my-2"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>Your Text Summary</h1>
        <p>
          Number of Words: {text ? text.split(/\s+/).filter((word) => word.trim() !== "").length : 0} Number of
          Characters: {text.length}
        </p>
        <p>
          Time to read : {text ? 0.008 *text.split(/\s+/).filter((word) => word.trim() !== "").length : 0} Minutes
        </p>
        <h1>Preview</h1>
        <p id="preview">
          {text.length === 0
            ? "Enter something in the textbox to preview it here"
            : text}
        </p>
      </div>
    </>
  );
}

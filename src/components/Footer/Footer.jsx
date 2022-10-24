import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

const Footer = ({message, setMessage, sendMessage }) => {
  return (
    <>
      <TextField
        className="inputMessage"
        size="small"
        id="outlined-basic"
        label="Type something here:"
        variant="outlined"
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <Button
        className="sendButton"
        size="small"
        variant="outlined"
        onClick={sendMessage}
      >
        Send
      </Button>
    </>
  );
};

export default Footer;

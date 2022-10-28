import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

const Footer = ({ message, setMessage, sendMessage }) => {
  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };
  return (
    <>
      <TextField
        className="inputMessage"
        size="small"
        id="outlined-basic"
        label="Type something here:"
        variant="outlined"
        value={message}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            console.log(e.keyCode);
            sendMessage(e);
          }
        }}
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

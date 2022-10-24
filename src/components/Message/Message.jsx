import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Moment from "react-moment";

const Message = ({ currentUser, messages }) => {
  if (messages) {
    return (
      <>
        {messages.map((item, index) => {
          if (item.createdAt) {
            let dateFromServer = item.createdAt.toDate();
            let messageClass;
            if (item.userId === currentUser.uid) {
              messageClass = "myMessage";
            } else messageClass = "otherMessage";
            let avatar;
            if (item.avatarURL) {
              avatar = <Avatar alt="Remy Sharp" src={item.avatarURL} />;
            } else {
              avatar = <Avatar />;
            }

            return (
              <div className={messageClass} key={index}>
                <div className="message">
                  <div className="messageHeader">
                    {avatar}
                    <div className="messageHeaderData">
                      <div className="messageUserName">{item.userName} </div>
                      <div className="messageTimeStamp">
                        {" "}
                        <Moment format="[at] HH:mm:ss">{dateFromServer}</Moment>
                      </div>{" "}
                    </div>
                  </div>

                  <div className="messageText">{item.text}</div>
                </div>
              </div>
            );
          }
        })}
      </>
    );
  }
};

export default Message;

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { goToLogout } from "../../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { Loading } from "../../components/Loading/Loading";
import Message from "../../components/Message/Message";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Chat = () => {
  const scroll = useRef();
  //получаем текущего пользователя
  const { currentUser, loading, error } = useContext(AuthContext);

  //запрос в базу на обновление коллекции
  const ref = query(
    collection(db, "messages"),
    orderBy("createdAt", "desc"),
    limit("25")
  );

  const [messages, loadingMessages, errorMessages] = useCollectionData(ref);
  const [sortedMessages, setSortedMessages] = useState([]);

  console.log(messages, loadingMessages);
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    addDoc(collection(db, "messages"), {
      userId: currentUser.uid,
      avatarURL: currentUser.photoURL,
      text: message,
      createdAt: serverTimestamp(),
      userName: currentUser.displayName,
    });
    setMessage("");
    console.log(sortedMessages);
  };

  //сортировка сообщений из коллекции
  useEffect(() => {
    if (messages) {
    }
    let newArr = !!messages ? [...messages] : [];
    console.log("123", sortedMessages);
    newArr.reverse();
    setSortedMessages(newArr);
  }, [messages]);

  //перевод фокуса на последнее сообщение
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [sortedMessages]);

  if (!!currentUser && !!messages)
    return (
      <>
        <div className="bodyWrapper">
          <div className="chatWrapper">
            <div className="header">
              <Header currentUser={currentUser} goToLogout={goToLogout} />
            </div>
            <div className="chatWindow">
              <Message currentUser={currentUser} messages={sortedMessages} />
              <div ref={scroll}></div>
            </div>
            <div className="footer">
              <Footer
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
              />
            </div>
          </div>
        </div>
      </>
    );
  else {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }
};

export default Chat;

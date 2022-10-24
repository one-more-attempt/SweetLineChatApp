import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link as LinkMUI } from "@mui/material";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { auth } from "../../firebase/firebase";
import SignUp from "../sign-up/SignUp";
import { Loading } from "../../components/Loading/Loading";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const goToLogin = () => {
    signInWithEmailAndPassword(email, password);
  };

  if (loading) return <Loading />;
  if (user) return <Navigate to="/chat" />;

  return (
    <>
      <div className="mainSignInWrapper">
        <div className="signInFormWrapper">
          <div className="headerAppName">SweetLine Chat</div>

          <TextField
            className="inputsBlock"
            size="small"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              console.log(event.target.value);
            }}
          />

          <TextField
            className="inputsBlock"
            size="small"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              console.log(event.target.value);
            }}
          />

          <Button
            className="SignInButton"
            variant="outlined"
            onClick={goToLogin}
          >
            Login
          </Button>

          <div className="registerLink">
            {/* <LinkMUI> */}
            <Link to="/register">Sign up if you don't have an account</Link>
            {/* </LinkMUI> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

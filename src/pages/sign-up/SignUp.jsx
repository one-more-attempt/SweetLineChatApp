import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Redirect,
  useNavigate,
  Navigate,
} from "react-router-dom";

// import { Redirect } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  updateCurrentUser,
} from "firebase/auth";

import { auth, db } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
import { AuthContext } from "../../context/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [file, setFile] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [isAllowToRegister, setIsAllowToRegister] = useState(true);
  const navigate = useNavigate();
  const { currentUser, loading, error } = useContext(AuthContext);

  useEffect(() => {
    if (!!email && !!password && !!nickName) {
      setIsAllowToRegister(false);
    } else {
      setIsAllowToRegister(true);
    }
  }, [email, password, nickName]);

  const goToRegistration = async () => {
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    console.log(newUser);

    const downloadProg = new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // finalURL = downloadURL;
            // console.log(finalURL);
            resolve(downloadURL);
          });
        }
      );
    });

    if (!!file) {
      downloadProg.then(async (res) => {
        await updateProfile(newUser.user, {
          displayName: nickName,
          photoURL: res,
        });

        // await addDoc(collection(db, "users"), {
        //   userId: newUser.uid,
        //   userName: currentUser.displayName,
        //   avatarURL: currentUser.photoURL,
        // });

        navigate("/");
      });
    } else {
      await updateProfile(newUser.user, {
        displayName: nickName,
        photoURL: null,
      });

      // await addDoc(collection(db, "users"), {
      //   userId: currentUser.uid,
      //   userName: currentUser.displayName,
      //   avatarURL: null,
      // });

      navigate("/");
    }
  };

  return (
    <>
      <div className=" mainSignUpWrapper">
        <div className="signUpFormWrapper">
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
          />{" "}
          <span>{}</span>
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
          <TextField
            className="inputsBlock"
            size="small"
            id="outlined-basic"
            label="Nickname"
            variant="outlined"
            value={nickName}
            onChange={(event) => {
              setNickName(event.target.value);
              console.log(event.target.value);
            }}
          />
          <Button variant="outlined" component="label">
            <PhotoCamera />
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
            />
          </Button>
          <Button
            className="SignUpButton"
            variant="outlined"
            disabled={isAllowToRegister}
            onClick={goToRegistration}
          >
            Register
          </Button>
          <Link to="/login" className="SignInLink">
            {" "}
            Sign in if you already have an account
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;

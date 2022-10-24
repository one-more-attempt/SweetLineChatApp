

  
      <Router>
      <SignUp />
      {/* //  <SignIn /> */}
   
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>



  // const [user] = useAuthState(auth);
  // console.log(user);
// onAuthStateChanged (auth, (user)=>{
  // console.log(user);
// })
  // signOut(auth)

  // const [user, loading, error] = useAuthState(auth);
  // console.log(user, loading, error);


     {/* <button onClick={()=>signOut(auth)}>logout</button> */}



     const getData = async () => {
      const querySnapshot = await getDocs(
        collection(db, "messages"),
        where("capital", "==", true)
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    };
    getData();
  

      // getDocs(ref, "messages").then((resp) => console.log(resp));
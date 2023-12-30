  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
  import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB0VlnWMJkcEHaM3gpqfhqw-2GbI3BTgHg",
    authDomain: "web-auth-b6801.firebaseapp.com",
    projectId: "web-auth-b6801",
    storageBucket: "web-auth-b6801.appspot.com",
    messagingSenderId: "24475082151",
    appId: "1:24475082151:web:2fa02b8f91a56d86de6a82",
    measurementId: "G-TWSN2HDR5C",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  auth.languageCode = "en";
  const user = auth.currentUser;

  function UpdateUserProfile(user) {
    const username = user.displayName;
    const useremail = user.email;
    const userprofile = user.photoURL;

    document.getElementById("username").textContent = username;
    document.getElementById("useremail").textContent = useremail;
    document.getElementById("userprofile").src = userprofile;
  }
  onAuthStateChanged(auth, (user) => {
    const adminUID = "GD1Npmm0TbZAwj2YcF3gwbQqZIq2";
    const adminUID1 = "aNEncOG2egN8UyvsDMdZ3uLluF52";
    if (user.uid === adminUID || user.uid === adminUID1) {
      UpdateUserProfile(user);
      const uid = user.uid;
      return uid;
    } else {
      // alert("No access to this email");
      // window.location.href = "https://www.youtube.com"; // Redirect to admin page
    }
  });

  //----- New Registration code start
  // document.getElementById("register").addEventListener("click", function () {
  //   var email = document.getElementById("reg_email").value;
  //   var password = document.getElementById("reg_password").value;
  //   //For new registration
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       console.log(user);
  //       alert("Registration successfully!!");
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //       console.log(errorMessage);
  //       alert(error);
  //     });
  // });
  // //----- End

  // //----- Login code start
  document.getElementById("login").addEventListener("click", function () {
    var email = document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        window.location.href="./dash.html";
        alert(user.email + " Login successfully!!!");
        document.getElementById("logout").style.display = "block";
       
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });
  //----- End

  // //----- Logout code start
  // document.getElementById("logout").addEventListener("click", function () {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       console.log("Sign-out successful.");
  //       alert("Sign-out successful.");
  //       document.getElementById("logout").style.display = "none";
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.log("An error happened.");
  //     });
  // });

  const Google = document.getElementById("glogin");
  Google.addEventListener("click", function () {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const adminUID = "GD1Npmm0TbZAwj2YcF3gwbQqZIq2";
        const adminUID1 = "aNEncOG2egN8UyvsDMdZ3uLluF52";
        if (user.uid === adminUID || user.uid === adminUID1) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          alert("Admin logged in:", user);
          window.location.href = "./dash.html"; // Redirect to admin page
        } else {
          window.location.href = "https://www.youtube.com";
          alert("Unauthorized access.");
        }
        // console.log(user);
        // window.location.href = "./logged.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });
  //----- End
// Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Config
const firebaseConfig = {
    apiKey: "AIzaSyAneZO49CtdUKgqoZpkYKdSlNPFE7ziivw",
    authDomain: "cp1-chl.firebaseapp.com",
    projectId: "cp1-chl",
    storageBucket: "cp1-chl.firebasestorage.app",
    messagingSenderId: "159904709373",
    appId: "1:159904709373:web:3f04122d8526a6ddc09c94"
};

// Initialize app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Signup
const signup_btn = document.getElementById('signup-btn');
const google_btn = document.getElementById('google-btn');

signup_btn.addEventListener('click', () => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("Email:", email, "Password:", password);

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        alert("Password too weak");
        return;
    } else {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed up:", user);
            })
            .catch((error) => {
                console.error("Signup error:", error.code, error.message);
            });
        alert("User signed up");
        window.location.href = "./login.html";
    }
});

// Google login
google_btn.addEventListener("click", () => {
    const login_container = document.getElementById('login-container');
    const outer_container = document.getElementById('outer-container');

    signInWithPopup(auth, provider)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Google login success:", user);

            window.location.href = "./index.html"

            alert("User logged in");
        })
        .catch((error) => {
            console.error("Google login error:", error.code, error.message);
            alert("Login error");
        });
});
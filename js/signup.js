
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
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed up:", user);
                alert("User signed up");
                window.location.href = "./login.html";
            })
            .catch((error) => {
                console.error("Signup error:", error.code, error.message);
            });
    }
});

// Google login
google_btn.addEventListener("click", () => {
    auth.signInWithPopup(provider)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Google login success:", user);

            const userSession = {
                user: user
            };

            localStorage.setItem('userSession', JSON.stringify(userSession));

            window.location.href = "./index.html"
            alert("User logged in");
        })
        .catch((error) => {
            console.error("Google login error:", error.code, error.message);
            alert("Login error");
        });
});
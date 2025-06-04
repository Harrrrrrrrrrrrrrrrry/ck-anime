
// Elements
const login_btn = document.getElementById('login-btn');
const google_btn = document.getElementById('google-btn');

// Login
login_btn.addEventListener('click', () => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("Email:", email, "Password:", password);

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user);

            const userSession = {
                user: user
            };

            localStorage.setItem('userSession', JSON.stringify(userSession));
            
            if (user.uid == "vrT85UvJX9OL76Y1tLZmUsJZS1n1") {
                window.location.href = "./admin.html";
            } else {
                window.location.href = "./index.html";
            };

            alert("User logged in");
        })
        .catch((error) => {
            console.error("Login error:", error.code, error.message);
            alert("Login error");
        });
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

            if (user.uid == "vrT85UvJX9OL76Y1tLZmUsJZS1n1") {
                window.location.href = "./admin.html";
            } else {
                window.location.href = "./index.html";
            };

            alert("User logged in");
        })
        .catch((error) => {
            console.error("Google login error:", error.code, error.message);
            alert("Login error");
        });
});
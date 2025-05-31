if (!localStorage.getItem("userSession")) {
    window.location.href = "./login.html";
};

function logout() {
    if (localStorage.getItem("userSession")) {
        auth.signOut().then(() => {
            localStorage.removeItem('userSession');
            window.location.href = "./index.html";
        }).catch((error) => {
            console.log("Logout error:", error);
        });
    };
};
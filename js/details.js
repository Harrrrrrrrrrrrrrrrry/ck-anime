const params = new URLSearchParams(window.location.search);
const animeId = params.get('id');

if (animeId) {
    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("anime-title").textContent = data.data.title;
            document.getElementById("anime-image").src = data.data.images.jpg.image_url;
            document.getElementById("anime-episodes").textContent = data.data.episodes || "Unknown";
            document.getElementById("anime-score").textContent = data.data.score || "N/A";
            document.getElementById("anime-synopsis").textContent = data.data.synopsis || "No synopsis available.";
            let genres = [];
            data.data.genres.forEach(genre => {
                genres.push(genre.name)
            });
            document.getElementById("anime-genres").textContent = genres.join(", ") || "N/A";
            let themes = [];
            data.data.themes.forEach(theme => {
                themes.push(theme.name)
            });
            document.getElementById("anime-themes").textContent = themes.join(", ") || "N/A";
        })
        .catch(error => console.error(error));
} else {
    document.getElementById("anime-title").textContent = "Anime ID not found";
};

function addToWatchList() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("Current User ID:", user.uid);
            const userRef = db.collection("users").doc(user.uid);

            userRef.get()
                .then((userSnapshot) => {
                    if (!userSnapshot.exists) {
                        userRef.set({
                            watchList: [],
                        });
                    };
                    userRef.update({
                        [`watchList.${animeId}`] : document.getElementById("anime-title").textContent
                    });
                })
                .then(() => console.log("user data updated", userRef))
                .catch((error) => console.error("update error:", error))

            // window.location.href = "./plan-to-watch.html";
        } else {
            console.log("No user signed in.");
        };
    });

};
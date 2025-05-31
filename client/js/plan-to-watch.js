const watchListTable = document.getElementById("watch-list-table");

function updateWatchList() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("Current User ID:", user.uid);
            const userRef = db.collection("users").doc(user.uid);

            userRef.get().then((doc) => {
                if (doc.exists) {
                    watchList = doc.data().watchList;
                    console.log("Watch list data:", watchList);

                    Object.entries(watchList).forEach(([id, title]) => {
                        console.log("Anime ID:", id, "Title:", title);
                        const row = document.createElement("div");
                        row.classList.add("row", "my-1");

                        row.innerHTML = `
                            <h5 class="col-md-1 text-white">${id}</h5>
                            <h5 class="col-md-9 text-white">${title}</h5>
                            <h5 class="col-md-2 text-white"><button class="btn btn-danger" onclick="deleteAnime(${id})">Delete</button></h5>
                        `;
                        
                        watchListTable.appendChild(row);
                    });
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } else {
            console.log("No user signed in.");
        };
    });
};

function deleteAnime(id) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("Current User ID:", user.uid);
            const userRef = db.collection("users").doc(user.uid);

            userRef.update({
                [`watchList.${id}`] : firebase.firestore.FieldValue.delete()
            });

            watchListTable.innerHTML = "";
            updateWatchList();
        } else {
            console.log("No user signed in.");
        };
    });
};

updateWatchList();
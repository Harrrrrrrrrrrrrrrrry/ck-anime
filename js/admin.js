const createForm = document.getElementById("createForm");
const productTitle = document.getElementById("productTitle");
const productFile = document.getElementById("productFile");
const productSypnosis = document.getElementById("productSypnosis");
const productEpisodes = document.getElementById("productEpisodes");
const productScore = document.getElementById("productScore");
const productGenres = document.getElementById("productGenres");
const productThemes = document.getElementById("productThemes");

function showCreateForm() {
    createForm.classList.remove("d-none");
};

function closeCreateForm() {
    createForm.classList.add("d-none");
    productTitle.value = "";
    productFile.value = "";
    productSypnosis.value = "";
    productEpisodes.value = "";
    productScore.value = "";
    productGenres.value = "";
    productThemes.value = "";
};

document.getElementById("createBtn").addEventListener("click", function (event) {
    event.preventDefault();
    if (productTitle.value && productFile.value) {
        console.log(productTitle.value, productFile.value);
        db.collection("products")
            .add({
                title: productTitle.value,
                image_url: productFile.value,
                sypnosis: productSypnosis.value,
                episodes: productEpisodes.value,
                score: productScore.value,
                genres: productGenres.value,
                themes: productThemes.value,
            })
            .then(() => {
                console.log("Product added successfully!");
                loadProducts();
                closeCreateForm();
            })
            .catch((error) => {
                console.error("Error adding product: ", error);
            });
    };
});

function loadProducts() {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";
    db.collection("products")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const newRow = document.createElement("div");
                newRow.classList.add("row", "m-3");
                newRow.innerHTML = `
                    <img src="${product.image_url}" class="w-25 h-25 col-sm-1">
                    <div class="p-0 col-sm-8">
                        <h4 class="text-truncate text-white">${product.title}</h4>
                        <h6 class="custom-text-truncate text-white fs-6 fw-normal">Sypnosis: ${product.sypnosis}</h6>
                        <h6 class="text-truncate text-white fs-6 fw-light my-1">Episodes: ${product.episodes}</h6>
                        <h6 class="text-truncate text-white fs-6 fw-light my-1">Score: ${product.score}</h6>
                        <h6 class="text-truncate text-white fs-6 fw-light my-1">Genres: ${product.genres}</h6>
                        <h6 class="text-truncate text-white fs-6 fw-light my-1">Themes: ${product.themes}</h6>
                    </div>
                    <button class="btn btn-danger col-sm-1" id="deleteBtn" data-id="${doc.id}"><i class="fa-solid fa-trash"></i></button>
                `;

                productContainer.appendChild(newRow);
            });
            const btnDeleteProduct = document.querySelectorAll("#deleteBtn");
            btnDeleteProduct.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const productId = btn.getAttribute("data-id");
                    deleteProduct(productId);
                    loadProducts();
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching products: ", error);
        });
};

function deleteProduct(id) {
    db.collection("products")
        .doc(id)
        .delete()
        .then(() => {
            console.log("Product successfully deleted!");
            loadProducts();
        })
        .catch((error) => {
            console.error("Error removing product: ", error);
        });
};

loadProducts();
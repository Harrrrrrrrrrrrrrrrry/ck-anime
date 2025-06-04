// create form
const createForm = document.getElementById("createForm");

const createFormProductTitle = document.getElementById("createFormProductTitle");
const createFormProductFile = document.getElementById("createFormProductFile");
const createFormProductSypnosis = document.getElementById("createFormProductSypnosis");
const createFormProductEpisodes = document.getElementById("createFormProductEpisodes");
const createFormProductScore = document.getElementById("createFormProductScore");
const createFormProductGenres = document.getElementById("createFormProductGenres");
const createFormProductThemes = document.getElementById("createFormProductThemes");

function showCreateForm() {
    createForm.classList.remove("d-none");
};

function closeCreateForm() {
    createForm.classList.add("d-none");
    createFormProductTitle.value = "";
    createFormProductFile.value = "";
    createFormProductSypnosis.value = "";
    createFormProductEpisodes.value = "";
    createFormProductScore.value = "";
    createFormProductGenres.value = "";
    createFormProductThemes.value = "";
};

// edit form
const editForm = document.getElementById("editForm");

const editFormProductTitle = document.getElementById("editFormProductTitle");
const editFormProductFile = document.getElementById("editFormProductFile");
const editFormProductSypnosis = document.getElementById("editFormProductSypnosis");
const editFormProductEpisodes = document.getElementById("editFormProductEpisodes");
const editFormProductScore = document.getElementById("editFormProductScore");
const editFormProductGenres = document.getElementById("editFormProductGenres");
const editFormProductThemes = document.getElementById("editFormProductThemes");

function showEditForm() {
    editForm.classList.remove("d-none");
};

function closeEditForm() {
    editForm.classList.add("d-none");
    editFormProductTitle.value = "";
    editFormProductFile.value = "";
    editFormProductSypnosis.value = "";
    editFormProductEpisodes.value = "";
    editFormProductScore.value = "";
    editFormProductGenres.value = "";
    editFormProductThemes.value = "";
};

// 
document.getElementById("createBtn").addEventListener("click", function (event) {
    event.preventDefault();
    if (createFormProductTitle.value && createFormProductFile.value) {
        console.log(createFormProductTitle.value, createFormProductFile.value);
        db.collection("products")
            .add({
                title: createFormProductTitle.value,
                image_url: createFormProductFile.value,
                sypnosis: createFormProductSypnosis.value,
                episodes: createFormProductEpisodes.value,
                score: createFormProductScore.value,
                genres: createFormProductGenres.value,
                themes: createFormProductThemes.value,
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

function editProduct(id) {
    if (editFormProductTitle.value && editFormProductFile.value) {
        console.log(editFormProductTitle.value, editFormProductFile.value);
        db.collection("products").doc(id)
            .set({
                title: editFormProductTitle.value,
                image_url: editFormProductFile.value,
                sypnosis: editFormProductSypnosis.value,
                episodes: editFormProductEpisodes.value,
                score: editFormProductScore.value,
                genres: editFormProductGenres.value,
                themes: editFormProductThemes.value,
            })
            .then(() => {
                console.log("Product edited successfully!");
                loadProducts();
                closeEditForm();
            })
            .catch((error) => {
                console.error("Error editing product: ", error);
            });
    };
};

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
                    <div class="d-flex flex-column col-sm-1">
                        <button class="btn btn-secondary" id="editBtn" data-id="${doc.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-danger" id="deleteBtn" data-id="${doc.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
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
            const btnEditProduct = document.querySelectorAll("#editBtn");
            btnEditProduct.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const productId = btn.getAttribute("data-id");
                    showEditForm();
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
        })
        .catch((error) => {
            console.error("Error removing product: ", error);
        });
};

loadProducts();
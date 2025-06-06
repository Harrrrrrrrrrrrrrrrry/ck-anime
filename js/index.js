const big_carousel_inner = document.getElementById("big-carousel-inner");
const carousel_1_inner = document.getElementById("carousel-1-inner");
const carousel_2_inner = document.getElementById("carousel-2-inner");
const carousel_3_inner = document.getElementById("carousel-3-inner");

// seasonal animes
fetch(`https://api.jikan.moe/v4/seasons/now`)
    .then((res) => res.json())
    .then((data) => {
        data.data.forEach((anime) => {
            // big carousel
            let big_carousel_item = document.createElement("div");
            big_carousel_item.innerHTML = `
                <img src="${anime.trailer.images.maximum_image_url}" class="d-block w-100" alt="...">
            `;
            big_carousel_item.classList.add("carousel-item")
            big_carousel_inner.appendChild(big_carousel_item);
        });
        const big_carousel_first_item = big_carousel_inner.querySelector(".carousel-item");
        big_carousel_first_item.classList.add("active");

        // carousel 1
        const itemsPerSlide = 6;
        for (let i = 0; i < data.data.length-1; i += itemsPerSlide) {
            const carousel_1_item = document.createElement("div");
            carousel_1_item.classList.add("carousel-item");

            const row = document.createElement("div");
            row.classList.add("row");

            for (let j = i; j < i + itemsPerSlide && j < data.data.length; j++) {
                const anime = data.data[j];
                const col = document.createElement("div");
                col.classList.add("col-md-2");

                col.innerHTML = `
                    <a href="details.html?id=${anime.mal_id}" class="text-decoration-none">
                        <div class="card h-100 bg-dark">
                            <img src="${anime.images.jpg.large_image_url}" class="card-img-top">
                            <div class="card-body p-0">
                                <h5 class="card-title text-truncate text-white">${anime.titles[0]?.title}</h5>
                            </div>
                        </div>
                    </a>
                `;
                row.appendChild(col);
            }

            carousel_1_item.appendChild(row);
            carousel_1_inner.appendChild(carousel_1_item);
        }
        const carousel_1_first_item = carousel_1_inner.querySelector(".carousel-item");
        carousel_1_first_item.classList.add("active");
    })
    .catch((error) => console.error(error))

// top animes
fetch(`https://api.jikan.moe/v4/top/anime`)
    .then((res) => res.json())
    .then((data) => {
        // carousel 2
        const itemsPerSlide = 6;
        for (let i = 0; i < data.data.length-1; i += itemsPerSlide) {
            const carousel_2_item = document.createElement("div");
            carousel_2_item.classList.add("carousel-item");

            const row = document.createElement("div");
            row.classList.add("row");

            for (let j = i; j < i + itemsPerSlide && j < data.data.length; j++) {
                const anime = data.data[j];
                const col = document.createElement("div");
                col.classList.add("col-md-2");

                col.innerHTML = `
                    <a href="details.html?id=${anime.mal_id}" class="text-decoration-none">
                        <div class="card h-100 bg-dark">
                            <img src="${anime.images.jpg.large_image_url}" class="card-img-top">
                            <div class="card-body p-0">
                                <h5 class="card-title text-truncate text-white">${anime.titles[0]?.title}</h5>
                            </div>
                        </div>
                    </a>
                `;
                row.appendChild(col);
            }

            carousel_2_item.appendChild(row);
            carousel_2_inner.appendChild(carousel_2_item);
        }
        const carousel_2_first_item = carousel_2_inner.querySelector(".carousel-item");
        carousel_2_first_item.classList.add("active");
    })
    .catch((error) => console.error(error))

// top mangas
fetch(`https://api.jikan.moe/v4/top/manga`)
    .then((res) => res.json())
    .then((data) => {
        // carousel 3
        const itemsPerSlide = 6;
        for (let i = 0; i < data.data.length-1; i += itemsPerSlide) {
            const carousel_3_item = document.createElement("div");
            carousel_3_item.classList.add("carousel-item");

            const row = document.createElement("div");
            row.classList.add("row");

            for (let j = i; j < i + itemsPerSlide && j < data.data.length; j++) {
                const anime = data.data[j];
                const col = document.createElement("div");
                col.classList.add("col-md-2");

                col.innerHTML = `
                    <a href="details.html?id=${anime.mal_id}" class="text-decoration-none">
                        <div class="card h-100 bg-dark">
                            <img src="${anime.images.jpg.large_image_url}" class="card-img-top">
                            <div class="card-body p-0">
                                <h5 class="card-title text-truncate text-white">${anime.titles[0]?.title}</h5>
                            </div>
                        </div>
                    </a>
                `;
                row.appendChild(col);
            }

            carousel_3_item.appendChild(row);
            carousel_3_inner.appendChild(carousel_3_item);
        }
        const carousel_3_first_item = carousel_3_inner.querySelector(".carousel-item");
        carousel_3_first_item.classList.add("active");
    })
    .catch((error) => console.error(error))
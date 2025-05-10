const main_content = document.getElementById("main-content");

fetch(`https://api.jikan.moe/v4/top/anime`)
    .then(res => res.json())
    .then(data => {
        const itemsPerSlide = 3;
        for (let i = 0; i < data.data.length-1; i += itemsPerSlide) {
            const row = document.createElement("div");
            row.classList.add("row");

            for (let j = i; j < i + itemsPerSlide && j < data.data.length; j++) {
                const anime = data.data[j];
                const col = document.createElement("div");
                col.classList.add("col-md-4");

                col.innerHTML = `
                    <div class="card">
                        <img src="${anime.images.jpg.large_image_url || ''}" class="card-img-top img-fluid" alt="Anime Image">
                        <div class="card-body">
                            <h5 class="card-title text-truncate">${anime.titles[0]?.title || 'Untitled'}</h5>
                        </div>
                    </div>
                `;
                row.appendChild(col);
            }

            main_content.appendChild(row);
        }
    })
    .catch(error => console.error(error))
const apiKeyInput = document.getElementById("api-key");
const movieTitleInput = document.getElementById("movie-title");
const searchButton = document.getElementById("search-button");
const loader = document.querySelector(".loader");
const errorMessage = document.getElementById("error-message");
const resultsContainer = document.getElementById("results-container");

searchButton.addEventListener("click", searchMovies);

async function searchMovies() {
    const apiKey = apiKeyInput.value;
    const movieTitle = movieTitleInput.value;

    if (!apiKey || !movieTitle) {
        errorMessage.textContent = "Both fields are required";
        return;
    }

    errorMessage.textContent = "";
    resultsContainer.innerHTML = "";
    loader.style.display = "block";

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${encodeURIComponent(apiKey)}`);
        const data = await response.json();

        if (data.Error) {
            errorMessage.textContent = data.Error;
        } else {
            const movies = data.Search || [];
            movies.forEach(movie => {
                const movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");
                const poster = movie.Poster !== "N/A" ? movie.Poster : "no-poster.jpg";
                movieCard.innerHTML = `
                    <img src="${poster}" alt="${movie.Title}">
                    <p class="movie-title">${movie.Title} (${movie.Year})</p>
                    <a class="movie-link" href="https://www.imdb.com/titlegit/${movie.imdbID}" target="_blank">More Details</a>
                `;
                resultsContainer.appendChild(movieCard);
            });
        }
    } catch (error) {
        errorMessage.textContent = "An error occurred";
    } finally {
        loader.style.display = "none";
    }
}

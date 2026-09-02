const movieListEl = document.querySelector(".movie-list");

const searchTermEl = document.querySelector(".search__term");

let movies = [];

async function onSearchChange(event) {
  const searchTerm = event.target.value;

  searchTermEl.textContent = searchTerm;

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=4078be71&s=${searchTerm}`
  );

  const moviesData = await response.json();

  movies = moviesData.Search.slice(0, 6);

  renderMovies();
}

function renderMovies() {
  movieListEl.innerHTML = movies
    .map((movie) => movieHTML(movie))
    .join("");
}

function movieHTML(movie) {
  return `
    <div class="movie-card">
      <div class="movie-card__container">

        <img 
          src="${movie.Poster}" 
          alt="${movie.Title} poster" 
          class="movie-card__poster"
        >

        <div class="movie-card__info">
          <i class="fa-solid fa-film movie-card__icon"></i>
          <p class="movie-card__title">${movie.Title}</p>
        </div>

        <div class="movie-card__info">
          <i class="fa-regular fa-calendar movie-card__icon"></i>
          <p class="movie-card__year">${movie.Year}</p>
        </div>

      </div>
    </div>
  `;
}

function filterMovies(event) {
  if (event.target.value === "NEWEST") {
    movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  }

  if (event.target.value === "OLDEST") {
    movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }

  renderMovies();
}
$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get("https://api.themoviedb.org/3/search/movie?api_key=1d32ca02f3859ca30e1d655dad101aa9&query="+searchText)
    .then((response) => {
      let movies = response.data.results;
      console.log(movies);
      let output = '';
      $.each(movies, (id, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${'https://image.tmdb.org/t/p/w600_and_h900_bestv2' +movie.poster_path}">
              <h5>${movie.original_title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });
      $("#movies").html(output);
    })
    .catch((error) => {
      console.log(error);
    });
}
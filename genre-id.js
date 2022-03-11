
const ID_NAME = []
let IDgen = []
function GenreDetil1(){
    const genreID = localStorage.getItem("genreID");
    const genreName = localStorage.getItem("geNname");
    console.log(genreID);
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&with_genres=${genreID}`)
    .then(tv => tv.json())
    .then(tv => {
  let tx = tv.results;
  console.log(tx);
    })
  }
  GenreDetil1()

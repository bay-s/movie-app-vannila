
async function DETAIL(){
    const id = localStorage.getItem("id");

  const DetailRespon = await  fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
      )
const detil = await DetailRespon.json()
  removeLoading()

BANNER_Movie(detil)
const genres = detil.genres
GENRE_Card(genres)
MovieCast()
recomendMovie(id)

}
DETAIL()



function GENRE_Card(genres){
const genre = document.querySelector('.genre')
for (let i = 0; i < genres.length; i++) {
const gen = genres[i].name
const id = genres[i].id
let div = `<a href="#" class="geres" data-id="${id}">${gen}</a>`;
genre.innerHTML += `,${div}`
}
}
// FUNGSI DETIL
function details(cast) {
return `
<div class="box1">
<img src="https://image.tmdb.org/t/p/w185/${cast.profile_path}"  data-myid="${cast.id}" class="thumbz" alt="" >
<div class="info">
<h4 class="name">${cast.name}</h4>
<span class="chara">${cast.character}</span>
</div>
</div>`
  }



async function MovieCast(){
  const id = localStorage.getItem("id");
  const castRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  )
const castJson = await castRes.json()
const cast = castJson.cast
const konten = document.querySelector(".content-right");
for (let i = 0; i < 7; i++) {
  const Cast = cast[i]
  konten.innerHTML += details(Cast) 
}
}

async function recomendMovie(id) {
console.log(id);
  const recomendRes = await   fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
    )
    const recomendJson = await recomendRes.json()
    const result = recomendJson.results
    console.log(result);
        const konten = document.querySelector(".rekomen");
        for (let i = 0; i < 7; i++) {
          const rek = result[i]
          konten.innerHTML += recomendDetails(rek) 
        }
  }






function recomendDetails(rek) {
 return `
  <div class="box1">
  <img src="https://image.tmdb.org/t/p/w185/${rek.poster_path}" alt="" class="thumb" data-myid="${rek.id}" ">
  <div class="info">
  <h4 class="name">${rek.title}</h4>
  <span class="chara">${rek.release_date}</span>
  </div>
  </div>`;
  }

// TV BANNER

  function BANNER_Movie(detil){
    const banner = document.querySelector(".banner");

    banner.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280/${detil.backdrop_path})`;

    let divs = `<div class="banner-inner">
    <img src="https://image.tmdb.org/t/p/w300/${detil.poster_path}"  alt="">
    <div class="banner-inf">
        <h1 class="jdl">${detil.title}</h1>
        <span class="slogan">${detil.tagline}</span>
        <span class="genre">Genres: </span>
        <span class="detil">Runtime: ${detil.runtime}m</span>
        <span class="detil">Status: ${detil.status} </span>
        <span class="detil">Release Date: ${detil.release_date}</span>
        <div class="overview">
        <h3 class="title">Overview</h3>
           <p class="paraf">${detil.overview}</p>
        </div>
        <span class="waktu"></span>
    </div>
</div>`

banner.innerHTML = divs;
  }

// TV REKOMENDASI
async function recomendTV() {
  const id = localStorage.getItem("ids");
  const tvRes = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  )
const tvJson = await tvRes.json()
const result = tvJson.results
recomendDetails(result) 
}

function removeLoading(){
  const loader = document.querySelector('.loader-wrapper');
  loader.classList.remove('loader-wrapper');
  loader.classList.add('hidden')
  loader.style.display = 'none'
}

function cardTV(isi) {
  return `<div class="box">
  <img src="https://image.tmdb.org/t/p/w185/${isi.poster_path}" alt="" class="thumbs" data-myid="${isi.id}">
  <div class="info">
  <h4 class="judul">${isi.original_title}</h4>
  <h4 class="judul">${isi.name}</h4>
  <span class="tanggal">${isi.release_date}</span>
  <span class="tanggal">${isi.first_air_date}</span>
  <span class="review">${isi.overview}</span>
  </div>
  </div>`;
}
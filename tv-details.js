
async function TVs(){
    const IDs = localStorage.getItem("ids");
   const tipiRes = await fetch(
      `https://api.themoviedb.org/3/tv/${IDs}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
    )
    const tipiJson = await tipiRes.json()
    const genre = tipiJson.genres
    removeLoading()
    BannerTV(tipiJson)
    GENRE(genre)
    CAST_TV(IDs)
  };
  
  TVs()

function GENRE(genre){
const genres = document.querySelector('.genre')
for (let i = 0; i < genre.length; i++) {
    const gen = genre[i].name
    const id = genre[i].id
    let div = `<a href="#" class="geres" data-id="${id}">${gen}</a>`;   
     genres.innerHTML += `,${div}`  
}
}


async function CAST_TV(IDs){
  const creditRes = await fetch(
    `https://api.themoviedb.org/3/tv/${IDs}/credits?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  )
  const credits = await creditRes.json()
      for (let i = 0; i < 7; i++) {
        const konten = document.querySelector(".content-right");
        const data = credits.cast[i]
        konten.innerHTML += castProfil(data)
      }
}

function castProfil(data) {
return  `
<div class="box1">
<img src="https://image.tmdb.org/t/p/w185/${data.profile_path}"  data-myid="${data.id}" class="thumbz" alt="" >
<div class="info">
<h4 class="name">${data.name}</h4>
<span class="chara">${data.character}</span>
</div>
</div>`


}
  // TV DETIL
  
  function BannerTV(tipi){
    const banner = document.querySelector(".banner");
  
    banner.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280/${tipi.backdrop_path})`;
  
    let divs = `<div class="banner-inner">
    <img src="https://image.tmdb.org/t/p/w300/${tipi.poster_path}"  alt="">
    <div class="banner-inf">
        <h1 class="jdl">${tipi.name}</h1>
        <span class="slogan">${tipi.tagline}</span>
        <span class="genre">Genres: </span>
        <span class="detil">Runtime: ${tipi.episode_run_time}m</span>
        <span class="detil">Total Episode: ${tipi.number_of_episodes} Episode</span>
        <span class="detil">Status: ${tipi.status} </span>
        <span class="detil">Release Date: ${tipi.first_air_date}</span>
        <div class="overview">
        <p class="detil">Overview</p>
           <span class="sinopsis">${tipi.overview}</span>
        </div>
        <span class="waktu"></span>
    </div>
  </div>`
  
  banner.innerHTML = divs;
  }
  
  
  // FUNGSI DETIL


  // FUNGSI REKOMENDASI TV
  async function recomendTV() {
    const IDs = localStorage.getItem("ids");
    console.log(IDs);
  const TVrespon =  await  fetch(
      `https://api.themoviedb.org/3/tv/${IDs}/recommendations?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
    )
const tvJson = await TVrespon.json()
const tvRes = tvJson.results
displayPage(tvRes) 
  }
  recomendTV()
  

  
function displayPage(tvRes){
  let div = ``;
  for (let i = 0; i < 7; i++) {
    const output  = document.querySelector(".rekomen");
    const isi = tvRes[i];
    console.log(isi);
    if ( isi.media_type.includes('tv')) {
      div = cardTV(isi) 
      output .innerHTML += div;
    }
    if ( isi.media_type.includes('movie')) {
      div = cardMovie(isi) 
      output .innerHTML += div;
    }
    if ( isi.media_type.includes('person')){
     const desk = isi.known_for
     div =  pplCard(isi,desk) 
     output.innerHTML +=    div 
    }
  }
  chekString()
}

  function cardTV(isi) {
    return `<div class="box">
    <img src="https://image.tmdb.org/t/p/w185/${isi.poster_path}" alt="" class="thumbs" data-myid="${isi.id}">
    <div class="info">
    <h4 class="name">${isi.name}</h4>
    <span class="tanggal">${isi.first_air_date}</span>
    <span class="review">${isi.overview}</span>
    </div>
    </div>`;
  }

  function cardMovie(isi) {
    return `<div class="box">
    <img src="https://image.tmdb.org/t/p/w185/${isi.poster_path}" alt="" class="thumb" data-myid="${isi.id}">
    <div class="info">
    <h4 class="name">${isi.original_title}</h4>
    <span class="tanggal">${isi.release_date}</span>
    <span class="review">${isi.overview}</span>
    </div>
    </div>`;
  }
  
function chekString(){
  const judul = document.querySelectorAll('.judul')
  const rilis = document.querySelectorAll('.tanggal')
for (let i = 0; i < judul.length; i++) {
if(judul[i].textContent.includes('undefined')){
  judul[i].style.display = 'none'
}
if(rilis[i].textContent.includes('undefined')){
rilis[i].style.display = 'none'
}
}
}

  // FUNGSI REKOMENDASI TV CONTENT
  function recomendDetailsTV(Result) {
    const konten = document.querySelector(".rekomen");
      let divs = `
  <div class="box1">
  <img src="https://image.tmdb.org/t/p/w185/${Result.poster_path}" alt="" class="thumbs" data-myid="${Result.id}" ">
  <div class="info">
  <h4 class="name">${Result.name}</h4>
  <span class="chara">${Result.first_air_date}</span>
  </div>
  </div>`;
const id = Result.id
      konten.innerHTML += divs;

  }
  
  function removeLoading(){
    const loader = document.querySelector('.loader-wrapper');
    loader.classList.remove('loader-wrapper');
    loader.style.display = 'none'
  }
  








// DROPDOWN

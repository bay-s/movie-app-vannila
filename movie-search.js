// const t = localStorage.getItem("search")
// console.log(t);

function search() {
  const srch = localStorage.getItem("search");

  const judul = srch.charAt(0).toUpperCase() + srch.slice(1);
  const title = document.querySelector(".title");
  fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=0ccbee0a69447c2b1bd0090bf76b0358&query=${srch}`
  )
    .then((src) => {

      if (src.status >= 200 && src.status <= 299) {
        return src.json();
   
      } else {
        throw Error(src.statusText);
      }
    })
    .then((src) => {
      const srcResult = src.results;
      removeLoading()
      srcContentTV(srcResult) 

if(srcResult == 0){
  error(srch)
}
    })
    .catch((error) => {
      // Handle the error
      console.log(`404 ${error}`);
    });
}



try {
  search();
} catch (err) {
  console.log(err);
}

pageCards()

function error(srch) {
  const genreCard = document.querySelector(".genre-card");
  const cardErr = `
    <div class="error">
    <p class="err">Search Results for : <span class="eror">${srch}</span></p>
    <p class="errs">Sorry, but nothing matched your search terms. Please try again with some different keywords.</p>
  </div>
    `;
  genreCard.innerHTML = cardErr;
}


function card(isi) {
  return `<div class="box">
  <img src="https://image.tmdb.org/t/p/w185/${isi.poster_path}" alt="" class="thumb" data-myid="${isi.id}" data-tvid="${isi.id}">
  <div class="info">
  <h4 class="judul">${isi.title}</h4>
  <span class="tanggal">${isi.release_date}</span>
  <span class="review">${isi.overview}</span>
  </div>
  </div>`;
}

function srcContentMovie(srcResult) {
  let div = ``;
  const genreCard = document.querySelector(".genre-card");
  for (let i = 0; i < srcResult.length; i++) {
    const isi = srcResult[i];
    const id = isi.id;

    div = card(isi);
    genreCard.innerHTML += div;
  }
}

function srcContentTV(srcResult) {
  let div = ``;
  const genreCard = document.querySelector(".genre-card");
  for (let i = 0; i < srcResult.length; i++) {
    const isi = srcResult[i];
    if ( isi.media_type.includes('tv')) {
      div = cardTV(isi) 
      genreCard.innerHTML += div;
    }
    if ( isi.media_type.includes('movie')) {
      div = cardMovie(isi) 
      genreCard.innerHTML += div;
    }

  }
  chekString()
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

function cardTV(isi) {
  return `<div class="box">
  <img src="https://image.tmdb.org/t/p/w185/${isi.poster_path}" alt="" class="thumbs" data-myid="${isi.id}">
  <div class="info">
  <h4 class="judul">${isi.title}</h4>
  <h4 class="judul">${isi.name}</h4>
  <span class="tanggal">${isi.release_date}</span>
  <span class="tanggal">${isi.first_air_date}</span>
  <span class="review">${isi.overview}</span>
  </div>
  </div>`;
}

function cardMovie(isi) {
  return `<div class="box">
  <img src="https://image.tmdb.org/t/p/w185/${isi.poster_path}" alt="" class="thumb" data-myid="${isi.id}">
  <div class="info">
  <h4 class="judul">${isi.title}</h4>
  <span class="tanggal">${isi.release_date}</span>
  <span class="review">${isi.overview}</span>
  </div>
  </div>`;
}

function removeLoading() {
  const loader = document.querySelector(".lds-facebook");
  loader.classList.remove("lds-facebook");
  loader.style.display = "none";
}




function clickFunc() {
  const page = document.querySelectorAll(".pagination a");
  const content = document.querySelector(".genre-card");
  const prev = document.querySelector(".prev");
  let pos = 1;
  let posPrev = 0;
  page.forEach(e => {
    e.addEventListener('click',function(ev){
      ev.preventDefault();
      if (ev.target.classList.contains('page')) {
        content.innerHTML =
        '<div class="lds-facebook"><div></div><div></div><div></div></div>';
        const pages = parseFloat(ev.target.textContent);
        posPrev = pages;
        pos = pages;
        Pagination(pages)
      }
      if (ev.target.classList.contains("prev")) {
        content.innerHTML =
        '<div class="lds-facebook"><div></div><div></div><div></div></div>';
        pos--
        if (pos < 2) {
          pos = 1
        }
        posPrev--;
        let pages = pos;
        Pagination(pages)
      }
      if (ev.target.classList.contains("next")) {
        content.innerHTML =
        '<div class="lds-facebook"><div></div><div></div><div></div></div>';
        pos++
        posPrev++;
        const checkPrev = posPrev >= 0 ? (prev.style.display = "block") : (prev.style.display = "none");
      const pages = pos
      console.log(pos);
      Pagination(pages)
      }
    })
  })
}
clickFunc() 


// /movie/{movie_id}/images

function Pagination(pages){
  const target = localStorage.getItem("targets");
  const name = localStorage.getItem("genName");
  const srch = localStorage.getItem("search");
  fetch(`https://api.themoviedb.org/3/search/multi?api_key=0ccbee0a69447c2b1bd0090bf76b0358&query=${srch}&${target}&page=${pages}`)
  .then(pagi => pagi.json())
  .then(page => {
const tvRes = page.results
console.log(tvRes);
removeLoading();
displayPage(tvRes)
  })
}


function displayPage(tvRes){
  let div = ``;
  for (let i = 0; i < tvRes.length; i++) {
    const output  = document.querySelector('.genre-card')
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

function pplCard(isi,desk) {

  return`<div class="box">
  <img src="https://image.tmdb.org/t/p/w300/${isi.profile_path}" alt="" class="thumbz" data-myid="${isi.id}" data-myidz="${isi.id}">
  <div class="info">
  <h4 class="judul">${isi.name}</h4>
  <p class="desk">${isi.known_for_department}</p>
  </div>
  </div>`;
}

function pageBorder(){
  const page = document.querySelectorAll('.page')
for(let i = 0; i < page.length;i++){
  page[i].addEventListener('click',function(e){
    if(page[i].classList.contains('active')){
      
    }
    if (!e.target.classList.contains('active')) {
     e.target.classList.add('active')
    }
       })
}
}

 pageBorder()




async function MovieByGenre(){
    const target = localStorage.getItem("targets");
    const name = localStorage.getItem("genName");
   const movieGenre = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&with_genres=${target}`)
   removeLoading() 
const tv = await movieGenre.json()
const konten = document.querySelector(".genre-card");
const judul = document.querySelector(".juduls");
const movi = document.querySelector('.movi')
tv.results.forEach(Tv => {
  movi.innerHTML = `${tv.results.length} Movie`
  judul.innerHTML = name;
  konten.innerHTML += genreCard(Tv,name)
})
}

MovieByGenre()
pageCards()

function removeLoading() {
  const loader = document.querySelector(".lds-facebook");
  loader.classList.remove("lds-facebook");
  loader.style.display = "none";
}

function  genreCard(Tv,name){
return `
  <div class="box">
  <img src="https://image.tmdb.org/t/p/w185/${Tv.poster_path}"  class="thumb" data-myid="${Tv.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" alt="" >
  <div class="info">
  <h4 class="name">${Tv.title}</h4>
  <span class="rilis">${Tv.release_date}</span>
  <span class="review">${Tv.overview}</span>
  </div>
  </div>`;
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




async function Pagination(pages){
  const target = localStorage.getItem("targets");
  const name = localStorage.getItem("genName");
  console.log(target);
 const pageResult = await  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&with_genres=${target}&page=${pages}`)

const tvRes = await pageResult.json()
removeLoading();
tvRes.results.forEach(isi => {
  const output  = document.querySelector('.genre-card')
  output .innerHTML += PageCard1(isi)
})
}


function  PageCard1(isi){
return  `
    <div class="box">
    <img src="https://image.tmdb.org/t/p/w185/${isi.poster_path}"  class="thumb" data-myid="${isi.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" alt="" >
    <div class="info">
    <h4 class="name">${isi.title}</h4>
    <span class="rilis">${isi.release_date}</span>
    <span class="review">${isi.overview}</span>
    </div>
    </div>`;

    }
    
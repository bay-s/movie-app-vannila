




function ClickMovie(){
    const list = document.querySelectorAll('.drop-list li a');
    for(let i = 0; i < list.length; i++){
      list[i].addEventListener('click',function(e){
       if (e.target === list[i,0]) {
        window.open("movie-populer.html", "_self");
       }
       if (e.target === list[i,1]) {

        window.open("movie-nowplay.html", "_self");
    }
       if (e.target === list[i,2]) {

        window.open("movie-upcoming.html", "_self");  
       }
       if (e.target === list[i,3]) {
        // TopRated() 
        window.open("movie-top_rated.html", "_self");
       }

      })
    }
  }
  
  ClickMovie()
  


  async function Upcoming() {
   const up = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=0ccbee0a69447c2b1bd0090bf76b0358###%region=US"
    )
const UpcoResult = await up.json()
const upRes = UpcoResult.results;
const dataMovie = localStorage.setItem("topRated",JSON.stringify(upRes))
  }

function movieDetail() {
    document.addEventListener('click',function(e){
  if (e.target.classList.contains('thumb')) {
    const id = e.target.dataset.myid;
    console.log(id);
    localStorage.setItem("id", id);
    let fileDetail = window.open("movie-detail.html", "_self");  
  }
  if (e.target.classList.contains('people-movie')) {
    e.preventDefault()
    const id = e.target.dataset.myid;
    localStorage.setItem("id", id);
    let fileDetail = window.open("movie-detail.html", "_self");  
  }
  if (e.target.classList.contains('thumbs')) {
    TvDetail(e)
  }
  if (e.target.classList.contains('geres')) {
    genreDetail(e)
  }
  if(e.target.classList.contains('thumbz')){
    peopleDetail(e)
  }
    })
  };
  
  movieDetail()
  
  function TvDetail(e){
    const id = e.target.dataset.myid;
    console.log(id);
    localStorage.setItem("ids", id);
    let fileDetail = window.open("tv-detail.html", "_self");
  }
  
  function peopleDetail(e){
    const id = e.target.dataset.myid
    localStorage.setItem("peopleID",id)
    let fileDetail = window.open("people-detail.html","_self");
  }

  

  function genreDetail(e){
    const target = e.target.dataset.id;
    const name = e.target.textContent;
    localStorage.setItem("targets", target);
    localStorage.setItem("genName", name);
    window.open("movie-genre.html", "_self");
  }
  function scrollDown(){
    let y = window.scrollX;
  document.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    let x = window.scrollY;
    if (x > y) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    y = x;
  });
  }
  
  scrollDown()
  
  // SEARCH MOVIE

  const baton = document.querySelector(".baton");
  
  const searc = document.querySelector(".srcx");
  
  searc.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      click1();
    }
  });
  
  baton.addEventListener("click", click1, true);
  function click1() {

    const srch = document.querySelector(".srcx");
    localStorage.setItem("search", srch.value);
    // let fileDetail = window.open("movie-detail.html","_self");
  console.log("Tes");
    if (srch.value === "") {
      console.log("abc");
    } else {
      let fileDetail = window.open("movie-search.html", "_self");
    }
  }
  
  function click() {

    const srch = document.querySelector(".srch");
    localStorage.setItem("search", srch.value);
    // let fileDetail = window.open("movie-detail.html","_self");
  
    if (srch.value === "") {
      console.log("abc");
    } else {
      let fileDetail = window.open("movie-search.html", "_self");
    }
  }
  
  // END SEARCH

  function MovieCard(isi) {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dates = new Date(isi.release_date);
    const y = dates.getFullYear();
    const d = dates.getDate();
    const m = month[dates.getMonth()];
    let ID = isi.id;
    let rate = isi.vote_average * 10;
    const slide = document.querySelectorAll(".box");
    const content = document.querySelector(".popular");
    let div = `<div class="box">
      <img src="https://image.tmdb.org/t/p/w185/${isi.poster_path}"  alt="" class="thumb" data-myid="${ID}">
      <div class="info">
      <h4 class="judul">${isi.title}</h4>
  <span class="tanggal">${m} ${d},${y}</span>
  <span class="rate">
  <span class="rates">${rate}</span>
  </span>
      </div>
      </div>
      `;

    rating();
    content.innerHTML += div;
  }

  function rating() {
    const rates = document.querySelectorAll(".rates");
    for (let i = 0; i < rates.length; i++) {
      let angka = parseInt(rates[i].textContent);

      if (angka > 70) {
      }
      if (angka < 70) {
        rates[i].style.border = `2px solid yellow`;
      }
    }
  }

  
function TVContent(isi) {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const dates = new Date(isi.first_air_date)
    const y = dates.getFullYear()
  const d = dates.getDate()
  const m =  month[dates.getMonth()]
  const content = document.querySelector(".trend");
    let rate = isi.vote_average * 10;
    let div = `<div class="box1">
      <img src="https://image.tmdb.org/t/p/w185/${isi.poster_path}" alt="" class="thumbs" data-myid="${isi.id}">
      <div class="info">
      <h4 class="judul thumbs" data-myid="${isi.id}">${isi.name}</h4>
  <span class="tanggal">${m} ${d}, ${y}</span>
  <span class="rate">
  <span class="rates">${rate}</span>
  </span>
      </div>
      </div>`;
  
      rating()
      content.innerHTML += div;
  }
  
  

  
  
// TV DETAIL



function TV_DETAIL(){
  const id = localStorage.getItem("ids");
  fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
    )
  .then(tv => tv.json())
  .then(detil => {
BANNER(detil)
recomendDetails(detil) 
TVcast()
  })  
}


function BANNER(detil){
  const banner = document.querySelector(".banner");

  banner.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280/${detil.backdrop_path})`;

  let divs = `<div class="banner-inner">
  <img src="https://image.tmdb.org/t/p/w300/${detil.poster_path}"  alt="">
  <div class="banner-inf">
      <h1 class="jdl">${detil.name}</h1>
      <span class="slogan">${detil.tagline}</span>
      <span class="genre">Genres: </span>
      <span class="detil">Runtime: ${detil.episode_run_time[0]}m</span>
      <span class="detil">Total Episode: ${detil.number_of_episodes}</span>
      <span class="detil">Status: ${detil.status} </span>
      <span class="detil">Release Date: ${detil.first_air_date}</span>
      <div class="overview">
      <h3 class="title">Overview</h3>
         <p class="paraf">${detil.overview}</p>
      </div>
      <span class="waktu"></span>
  </div>
</div>`

banner.innerHTML = divs;
}


function recomendDetails(result) {
  const konten = document.querySelector(".rekomen");
  for (let i = 0; i < 7; i++) {
    let rek = result[i];
    let divs = `
<div class="box1">
<img src="https://image.tmdb.org/t/p/w185/${rek.poster_path}" alt="" class="thumb" data-myid="${rek.id}" ">
<div class="info">
<h4 class="name">${rek.original_title}</h4>
<h4 class="name">${rek.name}</h4>
<span class="chara">${rek.release_date}</span>
<span class="chara">${rek.first_air_date}</span>
</div>
</div>`;

    konten.innerHTML += divs;
    chekString()
  }
}

// TV CAST

function chekString(){
  const judul = document.querySelectorAll('.name')
  const rilis = document.querySelectorAll('.chara')
for (let i = 0; i < judul.length; i++) {
if(judul[i].textContent.includes('undefined')){
  judul[i].style.display = 'none'
}
if(rilis[i].textContent.includes('undefined')){
rilis[i].style.display = 'none'
}
}
}



function TVcast(){
  const id = localStorage.getItem("id");
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  )
    .then((credit) => credit.json())
    .then((credit) => {
      console.log(credit);
      for (let i = 0; i < 7; i++) {
        const cast = credit.cast[i];
        console.log(cast);
        const konten = document.querySelector(".content-right");
        konten.innerHTML += details(cast) 
      }
    });
}


function pageCards() {
  const pagi = document.querySelector(".pagination");
  pagi.insertAdjacentHTML("afterbegin", `<a href="#" class="prev"><</a> `);
  for (let i = 0; i < 10; i++) {
    const page = `<a href="#" class="page">${i + 1}</a>`;
    pagi.innerHTML += page;
    document.querySelectorAll('.page')[i,0].classList.add('active')
  }
  pagi.insertAdjacentHTML("beforeend", `<a href="#" class="next">></a> `);
  const prev = document.querySelector(".prev");
  prev.style.display = 'none'
}


function DropDown(){
  const menu = document.querySelector('.hamburger');
  menu.addEventListener('click',ClickMenu)
}
DropDown()
function ClickMenu(e){
    e.preventDefault()
    const spin = document.querySelectorAll('.spinner')
    const contain = document.querySelector('.navbar');
    for (let i = 0; i < spin.length; i++) {
        contain.classList.toggle('opens')
        console.log("Tes");
        spin[i].classList.toggle('open') 
}
}

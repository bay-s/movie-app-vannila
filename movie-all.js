function cardContent(isi) {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const dates = new Date(isi.release_date)
    const y = dates.getFullYear()
  const d = dates.getDate()
  const m =  month[dates.getMonth()]
  
    let rate = isi.vote_average * 10;
    let div = `<div class="box">
        <img src="https://image.tmdb.org/t/p/w185/${isi.poster_path}"  alt="" class="thumb" data-myid="${isi.id}">
        <div class="info">
        <h4 class="judul">${isi.title}</h4>
    <span class="tanggal">${m} ${d},${y}</span>
    <span class="rate">
    <span class="rates">${rate}</span>
    </span>
        </div>
        </div>`;
  
    const content = document.querySelector(".content");
    content.innerHTML += div;
  }
  
  
  function rating(){
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
  
   async function WATCH(){
    const tvProvRes = await fetch("https://api.themoviedb.org/3/watch/providers/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358")
const tvProvJson = await tvProvRes.json()
const provider = tvProvJson.results
for (let i = 0; i < 25; i++) {
  const el = provider[i]
  const flags = document.querySelector('.watch-logo')
  flags.innerHTML +=  cards(el)
}
  } 
  
  function cards(el){
return  `<div class="watch-box">
  <img src="https://image.tmdb.org/t/p/w45/${el.logo_path}" alt="">
  <span class="provider-name">${el.provider_name}</span>
  </div>`
  }
  
  async function providerCountry(){
    const CountryRes = await fetch("https://api.themoviedb.org/3/watch/providers/regions?api_key=0ccbee0a69447c2b1bd0090bf76b0358")
const CountryJson = await CountryRes.json()
const flags = document.querySelector('.country')
CountryJson.results.forEach(ctr => {
  flags.innerHTML += cardFlag(ctr)
});
  }
 function cardFlag(ctr){
return  `<select class="select-flag">
    <option value="${ctr.english_name}">${ctr.english_name}</option>
    <select>
    `
  }
  
  async function Genre(){
   const genreRes = await  fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=0ccbee0a69447c2b1bd0090bf76b0358")
const genrez = await genreRes.json()
genrez.genres.forEach(gen => {
  genreCard(gen)
})
  }
  

  function genreCard(gen){
    const genRe = document.querySelector('.genres')
    genRe.innerHTML +=` <a href="#" class="genre-id" data-genre="${gen.id}">${gen.name}</a>`
  }
  
  function genreDetail(e){
    const ID = e.target.dataset.genre
    const name = e.target.textContent
    localStorage.setItem("targets",ID)
    localStorage.setItem('genName',name)
    window.open("movie-genre.html", "_self");
   }  


function clickID(){
document.addEventListener('click',function(e){
if (e.target.classList.contains('genre-id')) {
  genreDetail(e)
}
if (e.target.classList.contains('thumb')) {
  movieDetail(e) 
}
if (e.target.classList.contains('thumbs')) {
  tvDetail(e) 
}
})
   }
   clickID()  
    // CLICK MOVIE DETAIL
  
  function movieDetail(e) {
    const id = e.target.dataset.myid;
    localStorage.setItem("id", id);
    let fileDetail = window.open("movie-detail.html", "_self");
  };
  
  function tvDetail(e){
    const id = e.target.dataset.myid;
    localStorage.setItem("ids", id);
    let fileDetail = window.open("tv-detail.html", "_self");
  }
  
  
  // scrooll
  
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




function TVCard(isi) {
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
  const dates = new Date(isi.first_air_date);
  const y = dates.getFullYear();
  const d = dates.getDate();
  const m = month[dates.getMonth()];
  let rate = isi.vote_average * 10;

  let div = `<div class="box">
  <img src="https://image.tmdb.org/t/p/w185/${isi.poster_path}" alt="" class="thumbs" data-myid="${isi.id}">
  <div class="info">
  <h4 class="judul">${isi.name}</h4>
<span class="tanggal">${m} ${d},${y}</span>
<span class="rate">
<span class="rates">${rate}</span>
</span>
  </div>
  </div>`;

const content = document.querySelector(".content");
content.innerHTML += div;
}

function peopleDetail(){
  document.addEventListener('click',function(e){
    if(e.target.classList.contains('thumbz')){
      const id = e.target.dataset.myid
      localStorage.setItem("peopleID",id)
      let fileDetail = window.open("people-detail.html","_self");
    }
  })
}
peopleDetail()






function removeLoading(){
  const loader = document.querySelector('.loader-wrapper');
  loader.classList.remove('loader-wrapper');
  loader.classList.add('hidden')
}


// PAGINATION


function pageCards() {
  const pagi = document.querySelector(".pagination");
  pagi.insertAdjacentHTML("afterbegin", `<a href="#" class="prev"><</a> `);
  for (let i = 0; i < 10; i++) {
    const page = `<a href="#" class="page">${i + 1}</a>`;
    pagi.innerHTML += page;
  }
  pagi.insertAdjacentHTML("beforeend", `<a href="#" class="next">></a> `);
  const prev = document.querySelector(".prev");
  prev.style.display = 'none'
  
}

function HamburgerMenu(){
const menu = document.querySelector('.hamburger');
menu.addEventListener('click',ClickMenu)
}
HamburgerMenu()
function ClickMenu(e){
    e.preventDefault()
    const spin = document.querySelectorAll('.spinner')
    const navbar = document.querySelector('.navbar');
    for (let i = 0; i < spin.length; i++) {
      navbar.classList.toggle('opens')
        console.log("Tes");
        spin[i].classList.toggle('open')
  }

}

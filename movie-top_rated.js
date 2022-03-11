if (navigator.onLine) {
    console.log("online");
  } else {
    console.log("offline");
  }
  
  pageCards();
  Genre()
  WATCH()
  providerCountry()
  
  
  function showTopRated() {
    const dataMovie = localStorage.getItem("topRated");
    const movies = JSON.parse(dataMovie);
    console.log(movies);
    for (let i = 0; i < movies.length; i++) {
      const isi = movies[i];
      console.log(isi);
  if (dataMovie ) {
        cardContent(isi);

  }
    }
  }

  async function TopRated() {
  const  topRes = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=0ccbee0a69447c2b1bd0090bf76b0358###region=US"
    )
const upRes = await topRes.json()
removeLoading()
upRes.results.forEach(isi => {
  cardContent(isi)
})
  }
  
  TopRated()
  function removeLoading(){
    const loader = document.querySelector('.lds-facebook');
    loader.classList.remove('lds-facebook');
    loader.style.display = 'none'
  }
  

async function paginationTop(pages) {
  const pageRes = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=0ccbee0a69447c2b1bd0090bf76b0358&page=${pages}`
  )
const tvRes = await pageRes.json()
  removeLoading();
tvRes.results.forEach(isi =>  {
  cardContent(isi) 
})
}

function clickFunc() {
  const page = document.querySelectorAll(".pagination a");
  const content = document.querySelector(".content");
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
        paginationTop(pages)
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
        paginationTop(pages)
      }
      if (ev.target.classList.contains("next")) {
        content.innerHTML =
        '<div class="lds-facebook"><div></div><div></div><div></div></div>';
        pos++
        posPrev++;
        const checkPrev = posPrev >= 0 ? (prev.style.display = "block") : (prev.style.display = "none");
      const pages = pos
      console.log(pos);
      paginationTop(pages)
      }
    })
  })
}
clickFunc()



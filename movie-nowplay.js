if (navigator.onLine) {
    console.log("online");
  } else {
    console.log("offline");
  }
  
  pageCards();
  Genre()
  WATCH()
  providerCountry()
  
  
  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      now_playing() 
    }
  };
  
  
  async function now_playing() {
    const up = await fetch(
         "https://api.themoviedb.org/3/movie/upcoming?api_key=0ccbee0a69447c2b1bd0090bf76b0358###%region=US"
     )
 const UpcoResult = await up.json()
 removeLoading()
 UpcoResult.results.forEach(isi => {
  cardContent(isi);
})
   }

   function removeLoading(){
    const loader = document.querySelector('.lds-facebook');
    loader.classList.remove('lds-facebook');
    loader.style.display = 'none'
  }

  async function paginationNowPlay(pages) {
    const poplar = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=0ccbee0a69447c2b1bd0090bf76b0358&page=${pages}`
    )
    const poplarRes = await poplar.json()
        removeLoading();
    poplarRes.results.forEach(isi => {
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
          paginationNowPlay(pages)
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
          paginationNowPlay(pages)
        }
        if (ev.target.classList.contains("next")) {
          content.innerHTML =
          '<div class="lds-facebook"><div></div><div></div><div></div></div>';
          pos++
          posPrev++;
          const checkPrev = posPrev >= 0 ? (prev.style.display = "block") : (prev.style.display = "none");
        const pages = pos
        console.log(pos);
        paginationNowPlay(pages)
        }
      })
    })
  }
  clickFunc()

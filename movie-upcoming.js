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
      Upcoming() 
    }
  };
  
  
  
  

  function Upcoming() {
    fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=0ccbee0a69447c2b1bd0090bf76b0358###region=US"
    )
      .then((up) => up.json())
      .then((up) => {
        const upRes = up.results;
        removeLoading()
        for (let i = 0; i < upRes.length; i++) {
          const isi = upRes[i];
console.log(isi);
          cardContent(isi) 
        }
      });
  }
  
  Upcoming()
  

  function removeLoading(){
    const loader = document.querySelector('.lds-facebook');
    loader.classList.remove('lds-facebook');
    loader.style.display = 'none'
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
  
  
  function paginationTop(pages) {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=0ccbee0a69447c2b1bd0090bf76b0358&page=${pages}`
    )
      .then((poplar) => poplar.json())
      .then((poplar) => {
        const tvRes = poplar.results;
  
        removeLoading();
        for (let i = 0; i < tvRes.length; i++) {
          const isi = tvRes[i];
          cardContent(isi) 
        }
      });
  }


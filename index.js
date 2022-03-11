
// MOVIE POPULER

async function populerMovie() {
 const popularMovie = await  fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=0ccbee0a69447c2b1bd0090bf76b0358"
  )
const poplar = await popularMovie.json()
removeLoading()
let img = []
poplar.results.forEach(isi => {
    MovieCard(isi)
    img.push(isi.backdrop_path)
    bannerCard(img)
    video(isi,img)
    Hover(img)
});
}


// TRENDING
async function trendingTV() {
  const responTrend = await fetch(
    "https://api.themoviedb.org/3/trending/tv/week?api_key=0ccbee0a69447c2b1bd0090bf76b0358"
  )
const trenz = await responTrend.json()
trenz.results.forEach(isi => {
  TVContent(isi)
});
}

function bannerCard(img){
  let poster = img;
let random = poster[Math.floor(Math.random() * poster.length)]
  const ban = document.querySelector(".bannerz")
  ban.style.background = `url(https://image.tmdb.org/t/p/w1280/${random}) no-repeat`; 
  ban.style.backgroundSize = 'cover'
 ban.classList.add('tes')
}

function removeLoading(){
  const loader = document.querySelector('.loader-wrapper');
  loader.classList.remove('loader-wrapper');
  loader.style.display = 'none'
}

//  VIDEO

async function video(isi,img) {
  randomBG(img)
  const videoRes = await fetch(
    `https://api.themoviedb.org/3/movie/${isi.id}/videos?api_key=0ccbee0a69447c2b1bd0090bf76b0358&append_to_response=videos`
  )

const vids = await videoRes.json()
const container = document.querySelector('.video-container-inner')
vids.results.forEach(videos => {
  const video = vids.results[0]
  container.innerHTML += VideoCard(video,isi)
  PlayMovie()
});
}

function VideoCard(video,isi){
  return `
  <div class="container-videos">
<div class="image-wrapper">
<img class="video-img" src="http://i3.ytimg.com/vi/${video.key}/hqdefault.jpg">
<a href="#" class="play" onclick="PlayMovie(event)" data-mykey="${video.key}"><img class="play-img"src="img1/PngItem_6391407.png" alt=""></a>
</div>
<div class="info">
  <span class="trailer">${video.name}</span>
  <span class="trailer-judul">${isi.title}</span>
</div>
  </div>
  `
}

// src="http://www.youtube.com/embed/${video.key}">
{/* <iframe class="responsive-iframe" src=""></iframe> */}
//  END VIDEO





// MODAL

function PlayMovie(e){
e.preventDefault()
  const modal = document.querySelector(".modal-video");
  const key = e.target.parentElement.dataset.mykey
  modal.innerHTML = modalz(key);
  modal.classList.remove("show");
setTimeout(() => {
    modal.classList.add("modals");
}, 100);

}

function modalz(key) {
return `<div class="box-video">
<div class="containers">
<iframe class="responsive-iframe" src="https://www.youtube.com/embed/${key}"></iframe>
</div>
</div>`
}

function randomBG(img){
  let poster = img;
let random = poster[Math.floor(Math.random() * poster.length)]
  const ban = document.querySelector(".video-container")
  ban.style.background = `url(https://image.tmdb.org/t/p/w1280/${random}) no-repeat right top`; 
}

function tutupModal() {
  const modal = document.querySelector(".modal-video");
  modal.addEventListener("click", closeModal);
}

tutupModal();
function closeModal(e) {
  e.preventDefault();
  if (e.target.classList.contains("modals")) {
    e.target.classList.remove("modals");
    const modal = document.querySelector(".modal-video");
    // modal.classList.add("show");
    modal.innerHTML = " "
  }
}

function Hover(img){
  document.addEventListener("mouseover", function(e){
    let random = img[Math.floor(Math.random() * img.length)]
    if (e.target.classList.contains('video-img')) {
      const ban = document.querySelector(".video-container")
      ban.style.background = `url(https://image.tmdb.org/t/p/w1280/${random}) 0 center no-repeat`; 
      ban.style.backgroundSize = 'cover'
      ban.style.background = ` linear-gradient(to right, rgba(var(3,37,65), 0.75) 0%, rgba(var(3,37,65), 0.75) 100%)`
    }
  });
}

// CLICK KANAN SLIDER

let cout = 0;
let counter = 0;
let couts  = 0;
const kiri = document.querySelector(".kiri");
const kanan = document.querySelector(".kanan");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const lefts = document.querySelector(".lefts");
const rights = document.querySelector(".rights");

kiri.style.display = "none";
left.style.display = "none";
lefts.style.display = "none";

  kanan.addEventListener("click", function (e) {
    const slide = document.querySelectorAll(".box");
    cout++;
    console.log("test123");
    e.preventDefault();
    
    slideshows(slide);
    if (cout > 14) {
      kanan.style.display = "none";
    }
    if (cout > 0) {
      kiri.style.display = "block";
    }
  });
  
// // CLICK KIRI

  kiri.addEventListener("click", function (e) {
    const slide = document.querySelectorAll(".box");
    cout--;
    
    e.preventDefault();
    slideshows(slide);
    if (cout < 16) {
      kanan.style.display = "block";
    }
  
    if (cout < 1) {
      kiri.style.display = "none";
    }
  });

// CLICK KANAN

right.addEventListener("click", function (e) {
  const slide = document.querySelectorAll(".box1");
  counter++;
  e.preventDefault();
  
  slideshow(slide)
  if (counter > 14) {
    right.style.display = "none";
  }
  if (counter > 0) {
    left.style.display = "block";
  }
});

// // // CLICK KIRI

left.addEventListener("click", function (e) {
  const slide = document.querySelectorAll(".box1");
  counter--;
  
  e.preventDefault();
  slideshow(slide)
  if (counter < 14) {
    right.style.display = "block";
  }

  if (counter < 1) {
    left.style.display = "none";
  }
});

// CLICK KANAN

rights.addEventListener("click", function (e) {
  const slide = document.querySelectorAll(".container-videos");
  couts++;
  e.preventDefault();
  
  slideshowz(slide)
  if ( couts > 15) {
    rights.style.display = "none";
  }
  if ( couts > 0) {
    lefts.style.display = "block";
  }
});

// // // CLICK KIRI

lefts.addEventListener("click", function (e) {
  const slide = document.querySelectorAll(".container-videos");
  couts--;
  
  e.preventDefault();
  slideshowz(slide)
  if (couts < 15) {
    rights.style.display = "block";
  }

  if ( couts < 1) {
    lefts.style.display = "none";
  }
});

function slideshows(slide) {
  slide.forEach(function (slides) {
    slides.style.transform = `translateX(-${cout * 100}%)`;
  });
}
function slideshowz(slide) {
  slide.forEach(function (slides) {
    slides.style.transform = `translateX(-${couts * 100}%)`;
  });
}
function slideshow(slide) {
  slide.forEach(function (slides) {
    slides.style.transform = `translateX(-${counter * 100}%)`;
  });
}






document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    // popularTV()
  }
};
pageCards() 
async function PopularPeople() {
  const peopleRes = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  )
const result = await peopleRes.json()
removeLoading();
result.results.forEach((isi) => {
  const known = isi.known_for;
  peopleCard(isi, known);
});
}

PopularPeople();

function peopleCard(isi, known) {
  const div = `<div class="box">
  <img src="https://image.tmdb.org/t/p/w300/${isi.profile_path}" alt="" class="thumbz" data-myid="${isi.id}" data-myidz="${known}">
  <div class="info">
  <h4 class="judul">${isi.name}</h4>
  <p class="desk"></p>
  </div>
  </div>`;
  const desk = document.querySelectorAll(".desk");
  const content = document.querySelector(".content");
  content.innerHTML += div;
  deskripsiCard(known);
}

function deskripsiCard(known) {
  const desk = document.querySelectorAll(".desk");
  for (let i = 0; i < known.length; i++) {
    const text = known[i];
    // desk[i].innerHTML += `<span class="overview">${text}</span>`
  }
}

function removeLoading() {
  const loader = document.querySelector(".lds-facebook");
  loader.classList.remove("lds-facebook");
  loader.style.display = "none";
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
        pagination(pages);
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
        pagination(pages);
      }
      if (ev.target.classList.contains("next")) {
        content.innerHTML =
        '<div class="lds-facebook"><div></div><div></div><div></div></div>';
        pos++
        posPrev++;
        const checkPrev = posPrev >= 0 ? (prev.style.display = "block") : (prev.style.display = "none");
      const pages = pos
      console.log(pos);
        pagination(pages);
      }
    })
  })
}
clickFunc()


function pagination(pages) {
  fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=0ccbee0a69447c2b1bd0090bf76b0358&page=${pages}`
  )
    .then((poplar) => poplar.json())
    .then((poplar) => {
      const tvRes = poplar.results;
      removeLoading();
      for (let i = 0; i < tvRes.length; i++) {
        const isi = tvRes[i];
        const known = isi.known_for;
        peopleCard(isi, known);
      }
    });
}








// e.preventDefault();
// if (e.target.classList.contains("page")) {
//   content.innerHTML =
//     '<div class="lds-facebook"><div></div><div></div><div></div></div>';
//   // content.innerHTML = ''
//   const pages = parseFloat(e.target.textContent);
//   posPrev = pages;
//   pos = pages;
//   pagination(pages);
// }
// if (e.target.classList.contains("prev")) {
//   content.innerHTML =
//   '<div class="lds-facebook"><div></div><div></div><div></div></div>';
//   pos--
//   if (pos < 2) {
//     pos = 1
//   }
//   posPrev--;
//   let pages = pos;
//   pagination(pages);
// }
// if (e.target.classList.contains("next")) {
//   content.innerHTML =
//   '<div class="lds-facebook"><div></div><div></div><div></div></div>';
//   pos++
//   posPrev++;
//   const checkPrev = posPrev >= 0 ? (prev.style.display = "block") : (prev.style.display = "none");
//   const pages = pos;
// console.log(pos);
// console.log(pages);
//   pagination(pages);
// }
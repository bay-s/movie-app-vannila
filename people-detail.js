async function detilPeople() {
  const id = localStorage.getItem("peopleID");
  const peopleRes = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  );
  const topCont = document.querySelector(".content-top");
  const pd = await peopleRes.json();
  removeLoading();
  profileDetail(pd);
  topCont.innerHTML = TopContent(pd);
}

detilPeople();

async function detilPeople1() {
  const id = localStorage.getItem("peopleID");
  const peopleRes = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  );
  const pd = await peopleRes.json();
  const content = document.querySelector(".content-card");
  for (let i = 0; i < 10; i++) {
    const cast = pd.cast[i];
    content.innerHTML += cardContent(cast);
  }
}

detilPeople1();

function cardContent(cast) {
  return `  <div class="box">
            <img src="https://image.tmdb.org/t/p/w185/${cast.poster_path}"  alt="" class="thumb" data-myid="${cast.id}">
            <div class="info">
            <h4 class="judul"><a href="#" class="thumb" data-myid="${cast.id}">${cast.title}</a></h4>
            </div>
            </div>`;
}

function profileDetail(pd) {
  const waktu = new Date(pd.birthday);
  const today = new Date();
  const todayY = today.getFullYear();
  const birthY = waktu.getFullYear();
  const date = todayY - birthY - 1;

  profileCard(pd, date);
}

function profileCard(pd, date) {
  const leftContainer = document.querySelector(".left-menu");
  const gender = pd.gender > 1 ? "Male" : "Female";
  let elem = ``;
  for (let i = 0; i < pd.also_known_as.length; i++) {
    const els = pd.also_known_as[i];
    elem += `<p class="info-text">${els}</p>`;
  }
  leftContainer.innerHTML += profileHTML(pd, date, gender, elem);
}

function profileHTML(pd, date, gender, elem) {
  return ` <section class="profil-pic">
    <img src="https://image.tmdb.org/t/p/w300/${pd.profile_path}" alt="">
  </section>
  <section class="person-info">
    <h3 class="title">Personal Info</h3>
  
    <div class="info-column">
      <p class="sub-title">Known For</p>
      <p class="info-text">${pd.known_for_department}</p>
    </div>
    <div class="info-column">
      <p class="sub-title">Gender</p>
      <p class="info-text">${gender}</p>
    </div>
    <div class="info-column">
    <p class="sub-title">Birthday</p>
    <p class="info-text">${pd.birthday} (${date} years old)</p>
  </div>
    <div class="info-column">
      <p class="sub-title">Place of birth</p>
      <p class="info-text">${pd.place_of_birth}</p>
    </div>
    <div class="info-column">
      <p class="sub-title"></p>
      <p class="info-text"></p>
    </div>
    <div class="info-column">
      <p class="sub-title">Also Known As</p>
     <div class="info-name">
     ${elem}
     </div>
    </div>
  
  </section>`;
}
function TopContent(pd) {
  return `   <h3 class="title-top">${pd.name}</h3>
  <div class="overview">
    <p class="title">Biography</p>
    <p class="paraf">${pd.biography}</p>
  </div>`;
}

function removeLoading() {
  const loader = document.querySelector(".loader-wrapper");
  loader.classList.remove("loader-wrapper");
  loader.style.display = " none";
}

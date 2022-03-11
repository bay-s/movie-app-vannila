



function ClickMovie(){
    const list = document.querySelectorAll('.drop-list li a');
    for(let i = 0; i < list.length; i++){
      list[i].addEventListener('click',function(e){
       if (e.target === list[i,0]) {
        POPULER() 
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
  

 function   POPULER()  {
    fetch(
       "https://api.themoviedb.org/3/movie/popular?api_key=0ccbee0a69447c2b1bd0090bf76b0358"
     )
       .then((movie) => {
         // (movie) => movie.json()
         if (movie.status == 200) {
           return movie.json();
         } else {
           console.log("err");
         }
       })
       .then((movie) => {
         const tes = movie.results;
   console.log(movie.total_pages);
         for (let i = 0; i < tes.length; i++) {
           const isiMovie = tes[i];
          const dataMovie = localStorage.setItem("movies",JSON.stringify(tes))
         }
       });
   }
   

  
  function Upcoming() {
    fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=0ccbee0a69447c2b1bd0090bf76b0358###%region=US"
    )
      .then((up) => up.json())
      .then((up) => {
        const upRes = up.results;
        console.log();
        for (let i = 0; i < upRes.length; i++) {
          const res = upRes[i];
          const dataMovie = localStorage.setItem("topRated",JSON.stringify(upRes))
        }
      });
  }
  


  
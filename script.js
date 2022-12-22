const API_KEY = 'api_key=99f0222b78a735aebdf7e104bd6f2dd4';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL+'/search/movie?'+API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        showMovies(data.results);
    })

}

function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie => {
        const {title,poster_path,vote_average,overview}=movie;
        const moviel = document.createElement('div');
        moviel.classList.add('movie');
        moviel.innerHTML=`
        <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        
        `
        main.appendChild(moviel);
        
    });
}
function getColor(vote){
    if(vote>=8){
        return 'green';
    }else if(vote>3 && vote<8){
        return 'yellow';
    }else{
        return 'red';
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchterm = search.value;
    if(searchterm){
        getMovies(SEARCH_URL+'&query='+searchterm);
    }else{
        getMovies(API_URL);
    }

})
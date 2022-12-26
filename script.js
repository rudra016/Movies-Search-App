const API_KEY = 'api_key=99f0222b78a735aebdf7e104bd6f2dd4';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL+'/search/movie?'+API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const genres =[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}];
const tagsel = document.getElementById('tags');
var selectedgenre = []
setGenre();
function setGenre(){
tagsel.innerHTML = '';
genres.forEach(genre =>{
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerHTML = genre.name;
        t.addEventListener('click',()=>{
            if(selectedgenre.length==0){
                selectedgenre.push(genre.id);
            }else{
                if(selectedgenre.includes(genre.id)){
                    selectedgenre.forEach((id,idx)=>{
                        if(id==genre.id){
                            selectedgenre.splice(idx,1);
                        }
                    })
                }else{
                    selectedgenre.push(genre.id);
                }
            }
            console.log(selectedgenre);
         getMovies(API_URL+'&with_genres='+encodeURI(selectedgenre.join(',')));
         highlightsel();
        })
        tagsel.append(t);
    })
}
function highlightsel(){
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag=>{
        tag.classList.remove('highlight');
    })
    clearbtn();
    if(selectedgenre.length!=0){
    selectedgenre.forEach(id=>{
        const highlighttag = document.getElementById(id);
        highlighttag.classList.add('highlight');
    })
}
}
function clearbtn(){
    let clearbtn = document.getElementById('clear');
    if(clearbtn){
        clearbtn.classList.add('highlight');
    }else{
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear X';
        clear.addEventListener('click',()=>{
            selectedgenre = [];
            setGenre();
            getMovies(API_URL);
        })
        tagsel.append(clear);
    }


    
}

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        if(data.results.length!==0){
            showMovies(data.results);
        }else{
            main.innerHTML=`<h1 class="noresul">No Results Found</h1>`;
        }
        
    })

}

function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie => {
        const {title,poster_path,vote_average,overview}=movie;
        const moviel = document.createElement('div');
        moviel.classList.add('movie');
        moviel.innerHTML=`
        <img src="${poster_path? IMG_URL+poster_path:"http://via.placeholder.com/1080x1500"}" alt="${title}">
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
    selectedgenre = [];
    setGenre();
    if(searchterm){
        getMovies(SEARCH_URL+'&query='+searchterm);
    }else{
        getMovies(API_URL);
    }

})

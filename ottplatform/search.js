
let carousel_div=document.getElementById('slideshow')
function carousel(){

    let images=[`https://img10.hotstar.com/image/upload/f_auto,q_90,w_1080/sources/r1/cms/prod/2959/1652959-i-aa0a71d19ae4`,`https://img10.hotstar.com/image/upload/f_auto,q_90,w_1080/sources/r1/cms/prod/9668/1649668-i-3d1bf67b1bcf`,`https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/833/1650833-i-0fe6a37d72ce`,`https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/815/1650815-i-332c354839bd`]

    
    let i=1;
    let imgElement=document.createElement('img');
    imgElement.src=images[0];
    carousel_div.append(imgElement)

    
    setInterval(function() {
        if(i===images.length){
            i=0;
        }
        imgElement.src=images[i];
        carousel_div.append(imgElement);
        i++;//
        
    }, 3000);
}

carousel();


let timerId;
// api key - 8f1967fc
async function searchMovies(){
    try{
        let movie_name=document.getElementById('movie_name').value
        let response= await fetch(`http://www.omdbapi.com/?s=${movie_name}&apikey=8f1967fc`)
        let data=await response.json();//json convert stringify to objects so that we can access the data 
        
        appendMovie(data.Search)
       

    }
    catch(error){
        console.log(error);

    }
}


function appendMovie(data){
    document.getElementById('loader_div').style.display = 'block';
    setTimeout(function () {
        document.getElementById('loader_div').style.display = 'none';
    }, 1000);

    let data_div=document.getElementById('movies');
    

    data_div.innerHTML=null;
    data_div.id="movies";


    data.forEach(function (ele) {
        let div = document.createElement("div");
    
        let p_name = document.createElement("p");
        p_name.innerHTML = `Name: ${ele.Title}`;
    
        let p_rating = document.createElement("p");
        p_rating.innerHTML = `Year: ${ele.Year}`;
    
        let img = document.createElement("img");
        img.id = 'poster';
        img.src = ele.Poster;
    
        div.append(img, p_name, p_rating);
        data_div.append(div);
    });
    
}

function debouncing(func, delay) {
    if (timerId) {
        clearTimeout(timerId);
    }

    document.getElementById('loader_div').style.display = 'block';

    timerId = setTimeout(() => {
        func();
        document.getElementById('loader_div').style.display = 'none';
    }, delay);
}


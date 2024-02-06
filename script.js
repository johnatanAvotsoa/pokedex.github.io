const searchInput = document.getElementById('search');
const loader = document.querySelector('.loader');
const btn = document.getElementById('btn') ; 
const listPokemon = document.getElementById('pokemon-list') ; 
let allPokemon = [] ; 
let tab = [];

const fetchPokemonBase = ()=>{

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(res => res.json())
      .then( (data) =>{
           data.results.forEach(pokemon => {
                fetchPokemonComplet(pokemon)
           });
      })
}

const createCards = (arr)=>{
    for(i = 0 ; i < arr.length ; i++){
        const cart = document.createElement('li') ;
        // const color = 'white';
        // cart.style.backgroundColor = color ; 
        const name = document.createElement('h1') ; 
        name.innerText = arr[i].name ; 
        const idCard = document.createElement('p'); 
        idCard.innerText = `ID ${arr[i].id}` ; 
        const img = document.createElement('img'); 
        img.src = arr[i].pic ;
        cart.appendChild(name);
        cart.appendChild(idCard); 
        cart.appendChild(img);
        listPokemon.appendChild(cart);
    }   
} 
const fetchPokemonComplet = (pokemon)=>{
    let objPokemonFull = {} ;  
    let url = pokemon.url ; 
    let name = pokemon.name ;
    fetch(url)
      .then(res => res.json())
      .then(pokeData =>{
        objPokemonFull.pic  = pokeData.sprites.front_default ; 
        objPokemonFull.type = pokeData.types[0].type.name ; 
        objPokemonFull.id  = pokeData.id ;
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        .then(res=> res.json())
        .then(data=>{
            objPokemonFull.name = data.names[4].name ; 
            allPokemon.push(objPokemonFull); 
            if(allPokemon.length === 151){
                tab = allPokemon.sort((a,b) =>{
                    return a.id - b.id ; 
                });
                createCards(tab);
                loader.style.display = "none" ; 
            }
        })
    
        })
}

const search = ()=>{
    let titleValue ;
    let allLi = document.querySelectorAll ('ul li');
    let value = searchInput.value.toUpperCase() ; 
    for(i = 0 ; i <=allLi.length ; i++){
        titleValue = allLi[i].innerText ; 
        if(titleValue.toUpperCase().indexOf(value) > -1 ){
            allLi[i].style.display = "flex" ; 
        }
        else{
            allLi[i].style.display = "none"; 
        }
    }
    console.log(allLi);
}

searchInput.addEventListener('keyup',search); 
fetchPokemonBase();



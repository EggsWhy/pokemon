const currentPokemonImg = document.getElementById('current-pokemon-img');
const currentPokemonName = document.getElementById('current-pokemon-name');
const currentPokemonHeight = document.getElementById('current-pokemon-height');

const nextPokemonImg = document.getElementById('next-pokemon-img');
const nextPokemonName = document.getElementById('next-pokemon-name');
const nextPokemonHeight = document.getElementById('next-pokemon-height');
const nextPokemonLabel2 = document.getElementById('next-pokemon-label2');

const higherBtn = document.getElementById('higher-btn');
const lowerBtn = document.getElementById('lower-btn');
const gameScore = document.getElementById('score');

let currentPokemonId;
let currentPokemonData;
let nextPokemonId;
let nextPokemonData;
let score = 0;

// generate random numebr
function generateRandomNumber(){

    currentPokemonId = Math.floor(Math.random()*906);

    do {
        nextPokemonId = Math.floor(Math.random()*906);
    } while (currentPokemonId === nextPokemonId);

}

// fetch pokemon data
async function fetchPokemon(id){

    try {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        if (!response.ok){
            throw new Error("Could not find the pokemon")
        }
        
        const data = await response.json();

        return {
            name: data['name'].charAt(0).toUpperCase() + data['name'].slice(1),
            height: `${data['height']/10}m`,
            heightActual: data['height']/10,
            image: data['sprites']['other']['official-artwork']['front_default']
        };

    }

    catch (error) {
        console.error(error);
    }

}

// function to update data
async function loadPokemon(){
    generateRandomNumber();

    currentPokemonData = await fetchPokemon(currentPokemonId);
    nextPokemonData = await fetchPokemon(nextPokemonId);

    currentPokemonImg.src = currentPokemonData.image;
    currentPokemonName.textContent = currentPokemonData.name;
    currentPokemonHeight.textContent = `"${currentPokemonData.height}"`;

    nextPokemonImg.src = nextPokemonData.image;
    nextPokemonName.textContent = nextPokemonData.name;
    nextPokemonHeight.textContent = `"${nextPokemonData.height}"`;
    nextPokemonLabel2.textContent = `metres than "${currentPokemonName.textContent}"`;
}


async function loadPokemonSecond(){

    currentPokemonData = nextPokemonData;
    higherBtn.style.display = 'inline-block';
    lowerBtn.style.display = 'inline-block';
    nextPokemonHeight.style.display = 'none';

    nextPokemonData = await fetchPokemon(Math.floor(Math.random()*906));

    currentPokemonImg.src = currentPokemonData.image;
    currentPokemonName.textContent = currentPokemonData.name;
    currentPokemonHeight.textContent = `"${currentPokemonData.height}"`;

    nextPokemonImg.src = nextPokemonData.image;
    nextPokemonName.textContent = nextPokemonData.name;
    nextPokemonHeight.textContent = `"${nextPokemonData.height}"`;
    nextPokemonLabel2.textContent = `metres than "${currentPokemonName.textContent}"`;

}




//Check answer section
document.getElementById('higher-btn').addEventListener('click', () => checkAnswer('higher'));
document.getElementById('lower-btn').addEventListener('click', () => checkAnswer('lower'));

function checkAnswer(guess){

    higherBtn.style.display = 'none';
    lowerBtn.style.display = 'none';
    nextPokemonHeight.style.display = 'block'
    nextPokemonLabel2.textContent = `metres tall`;

    let currentHeight = currentPokemonData.heightActual;
    let nextHeight = nextPokemonData.heightActual;
    
    if ( (guess === 'higher' || guess === 'lower') && nextHeight === currentHeight){
        score++;
    }

    else if (
        (guess === 'higher' && nextHeight > currentHeight) ||
        (guess === 'lower' && currentHeight > nextHeight)
    ){
        score++;
    }

    else {
        score -= 5;
    }

    gameScore.textContent = `Score: ${score}`;
    setTimeout(loadPokemonSecond, 1000);
}


// Starts the whole game

loadPokemon();
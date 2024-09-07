


// fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
//     .then(response => {
        
//         if (!response.ok){
//             throw new Error("Could not find the pokemon")
//         }

//         return response.json();
//     })
//     .then(data => console.log(data))
//     .catch(error => console.error(error))


const pokemonName = document.getElementById('pokemonName');
const pokemonId = document.getElementById('pokemonId');
const pokemonType = document.getElementById('pokemonType');
const pokemonAbilities = document.getElementById('pokemonAbilities');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonWeight = document.getElementById('pokemonWeight');

const pokemonStats = document.querySelectorAll('.pokemonStats');
console.log(pokemonStats)

const imgElement = document.getElementById('pokemonSprite');


// document.querySelectorAll('p').forEach(element => {
//     element.style.display = 'none';
// })


document.getElementById('pokemon').addEventListener('keydown', event => {
    if (event.key == 'Enter'){
        fetchData();
    }
})



async function fetchData(){
    
    try{
        
        const pokemon = document.getElementById('pokemon').value.trim().toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        if (!response.ok){
            throw new Error("Could not find the pokemon")
        }
        
        const data = await response.json();

        //Selecting Values
        const name = data['name'].charAt(0).toUpperCase() + data['name'].slice(1);
        const id = data['id'];
        const height = data['height'];
        const weight = data['weight'];
        const pokemonSprite = data['sprites']['other']['official-artwork']['front_default'];
        const types = data['types'];
        const abilities = data['abilities'];
        const stats = data['stats'];
        
        
        //Assigning values
        pokemonName.textContent = `Name: ${name}`;
        pokemonId.textContent = `ID: ${id}`;
        
        // * Types
        if (types.length==1){
            let type1 = types[0]['type']['name'].charAt(0).toUpperCase() + types[0]['type']['name'].slice(1)
            pokemonType.textContent = `Type: ${type1}`;
        }

        else if (types.length==2){
            let type1 = types[0]['type']['name'].charAt(0).toUpperCase() + types[0]['type']['name'].slice(1)
            let type2 = types[1]['type']['name'].charAt(0).toUpperCase() + types[1]['type']['name'].slice(1)

            pokemonType.textContent = `Type: ${type1}, ${type2} `;
        }

        // * Abilities
        if (abilities.length==1){
            let ability1 = abilities[0]['ability']['name'].charAt(0).toUpperCase() + abilities[0]['ability']['name'].slice(1)
            pokemonAbilities.textContent = `Ability: ${ability1}`;
        }

        else{
            let ability1 = abilities[0]['ability']['name'].charAt(0).toUpperCase() + abilities[0]['ability']['name'].slice(1)
            let ability2 = abilities[1]['ability']['name'].charAt(0).toUpperCase() + abilities[1]['ability']['name'].slice(1)

            pokemonAbilities.textContent = `Ability: ${ability1}, ${ability2} `;
        }

        pokemonHeight.textContent = `Height: ${height/10}m`;
        pokemonWeight.textContent = `Weight: ${weight/10}kg`;

        stats.forEach( (element,index) => {
            // pokemonStats[index].textContent += `${element['base_stat']}`;
            pokemonStats[index].textContent = pokemonStats[index].textContent.slice(0,-3) + `${element['base_stat']}`;
        })
        


        imgElement.src = pokemonSprite;
        imgElement.style.display = 'inline-block';

        document.querySelectorAll('p').forEach(element => {
            element.style.display = 'block';
        })

    }

    catch(error){
        console.error(error);
    }

}

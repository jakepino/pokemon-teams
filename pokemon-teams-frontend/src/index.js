const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const mainTag = document.getElementsByTagName("main")[0];

function getTrainers() {
	return fetch(TRAINERS_URL).then((response) => response.json());
}

function renderTrainers(trainer) {
	let showCard = document.createElement("div");
	showCard.className = "card";

	let nameTag = document.createElement("p");
	nameTag.innerText = trainer.name;

	let addPokemonBtn = document.createElement("button");
	addPokemonBtn.innerText = "Add Pokemon";
	addPokemonBtn.onclick = function () {
        if(trainer.pokemons.length < 6){
            addPokemon(trainer);}
         else { alert("Party is full!")}
    };
    

	let pokemonUL = getTrainerPokemon(trainer);

	showCard.append(nameTag, addPokemonBtn, pokemonUL);
	mainTag.appendChild(showCard);
}

function getTrainerPokemon(trainer) {
    let pokemonUL = document.createElement("ul");
    pokemonUL.id = trainer.id
    
    trainer.pokemons.forEach((pokemon) => {
        let pokemonLi = document.createElement("li");
        pokemonLi.id = pokemon.id
        let deleteBtn = document.createElement('button')
        deleteBtn.innerText = "Release"
        deleteBtn.onclick = function(){
            deletePokemon(pokemon)
        }
        pokemonLi.innerText = pokemon.nickname + " " + "(" + pokemon.species + ")";
        pokemonLi.appendChild(deleteBtn)
		pokemonUL.appendChild(pokemonLi);
	});
	return pokemonUL;
}

function addPokemon(trainer) {
	fetch(POKEMONS_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            "trainer_id": trainer.id,
        })
    }).then((response) =>
    response.json()).then((pokemon) => {
        renderPokemon(pokemon)
    })
}


function renderPokemon(pokemon){
    let pokemonLi = document.createElement("li");
    pokemonLi.id = pokemon.id
    let pokemonUL = document.getElementById(`${pokemon.trainer_id.toString()}`)
    let deleteBtn = document.createElement('button')
        deleteBtn.innerText = "Release"
        deleteBtn.onclick = function(){
            deletePokemon(pokemon)
        }
    pokemonLi.innerText = pokemon.nickname + " " + "(" + pokemon.species + ")";
    pokemonLi.appendChild(deleteBtn)
	pokemonUL.appendChild(pokemonLi);
}

function deletePokemon(pokemon){
    let pokemonLi = document.getElementById(`${pokemon.id.toString()}`)
    let pokemonUL = pokemonLi.parentNode
    console.log(pokemonLi.parentNode)
    fetch(POKEMONS_URL + "/" + pokemon.id, {
        method: "DELETE"
    }).then(pokemonUL.removeChild(pokemonLi))
}


function start(){getTrainers().then((trainers) => {
	trainers.forEach((trainer) => {
		renderTrainers(trainer);
	});
})};

start()
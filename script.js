const pokemonInput = document.getElementById("pokemonInput");
const pokemonInputSubmit = document.getElementById("pokemonInputSubmit");
let pokemonName = document.getElementById("pokemonName");
let pokemonImage = document.getElementById("pokemonImage");
let pokemonHeight = document.getElementById("pokemonHeight");
let pokemonWeight = document.getElementById("pokemonWeight");
let pokemonType = document.getElementById("pokemonType");
let pokemonAbility = document.getElementById("pokemonAbility");
const loading = document.getElementById("loading");


pokemonInputSubmit.addEventListener("click", async () => {

    let pokemon = pokemonInput.value;

    pokemonInput.value = "";

    if (pokemon == "" || !isNaN(pokemon)) {

        alert("Invalid Input !");
        return;
    }


    showLoading();

    try {

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

         if (response.status === 404) {
            alert("Pokemon not found !");
            return;
        }

        if (response.status === 500) {
            alert("Server error");
            return;
        }

        let data = await response.json();

        pokemonName.textContent = pokemon.charAt(0).toUpperCase() + pokemon.slice(1).toLowerCase();

        pokemonImage.src = data.sprites.front_default;

        pokemonHeight.textContent = `Height : ${data.height * 10} CM`;

        pokemonWeight.textContent = `Weight : ${data.weight / 10} KG`;

        pokemonAbility.textContent = `Ability : ${data.abilities[0].ability.name}`;

        pokemonType.textContent = `Type : ${data.types[0].type.name}`;

    }

    catch (error) {
        console.error(error);
    }

    finally {
        hideLoading();
    }

})


function showLoading() {
    loading.style.display = "block";
}

function hideLoading() {
    loading.style.display = "none";
}
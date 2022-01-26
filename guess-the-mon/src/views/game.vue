


<template>
  <div class="bg-white">
	<div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
	  <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Score </h2>

<!--       <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
		<div v-for="pokemon in pokemons" :key="pokemon.id" class="group relative">
		  <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
			<img :src="pokemon.imgUrl" :alt="pokemon.imageAlt" class="w-full h-full object-center object-cover lg:w-full lg:h-full" />
		  </div>

		  <div class="mt-4 flex justify-between pokemonName">
			<h3 class="text-sm text-gray-700">
			  {{pokemon.underScores}}
			</h3>
		  </div>

		</div>
	  </div> -->
	  <button @click="this.$forceUpdate();" class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
		Restart
	  </button>
	  <div :key="pokemon.id" class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 xl:gap-x-8 center">
		  <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
			<img :src="pokemon.imgUrl" :alt="pokemon.imageAlt" class="w-full h-full object-center object-contain" />
		  </div>
	  </div>

    <div class="pt-24 justify-between">
			<h3 class="subpixel-antialiased text-2xl text-gray-700 pokemonName tracking-[.5em]">
			  {{pokemon.guessedName}}
			</h3>
		  </div>
	</div>
  </div>
</template>

<script>
import { getPokemon, setCharAt, contains } from '../pokemon'
const pokemons = await getPokemon()
/* var pokemon = { id: 7, name: "bulbasaur", imgUrl: "https://cdn.traction.one/pokedex/pokemon/7.png", imgAlt: "squirtle Picture", guessedName: "_ _ _ _ _ _ _ _ _" } */
var i = 0;
var pokemon = pokemons[i]
var done = []
console.log(pokemon)
export default {
  setup(){
	return({
	  pokemon,
	  i,
	  pokemons,
	  done,
	})
  },
  methods:{
	keyEventHandler(e){
/* 	  if(e.key == " ")return;
	  console.log(e)
	  var nameField = document.getElementsByClassName("pokemonName")[0];
	  var search = tempName.search(e.key)
	  var text = nameField.innerHTML.replace(" ","");
	  console.log(search, this.tempName, text)
	  var innerText = "";
	  if(search != -1){
		innerText = setCharAt(text, search, e.key)
		nameField.innerHTML = innerText
		this.tempName = this.tempName.replace(e.key, " ")
	  }
	  if(this.checkIfCorrect(innerText.replace("_",""))){
		console.log("Correct Answer")
	  }
	   */
	  var currState = document.getElementsByClassName("pokemonName")[0];
	  var pokemonName = this.pokemon.name;
	  var key = e.key;

    
    if (pokemonName.includes(key))
    {
      var guessedName = currState.innerHTML;
      for (var i=0; i < pokemonName.length; i++)
      {
        if (pokemonName[i] === key)
        {
          // ugly, but it works and ideally a prototype should be added
          var temp = guessedName.split("");
          temp[i] = key;
          guessedName = temp.join("");
        }
      }
      currState.innerHTML = guessedName;
    }




    if (!currState.innerHTML.includes('_'))
    {
      // load next pokemon
	  this.i += 1
      this.pokemon = pokemons[this.i]
	  console.log(this.pokemon)
	  this.$forceUpdate();
      // maybe here we can also score++ and update the score on the page?
    }





	  /* console.log(currState, pokemonName, key) */
	  // if(!this.checkIfCorrect(currState.innerHTML)){
		//   var search = pokemonName.search(key);
		//   var search2 = contains(search, this.done);
		//   if(search!=-1 && !search2){
		// 	  currState.innerHTML = setCharAt(currState.innerHTML.replace(" ",""), search, key);
		// 	  this.done.push(search);
		//   }
	  // }
	  /* console.log(currState.innerHTML, pokemonName, key) */
	  // console.log(done)
	},
	checkIfCorrect(name){
	  var pokemonName = pokemon.name
	  if(pokemonName == name){
		this.i += 1;
		this.pokemon = pokemons[this.i];
		console.log(this.pokemon)
		this.$forceUpdate();
		return true;
	  }
	  else return false;
	}
  },
  mounted(){
	let self = this;
	window.addEventListener('keyup', function(ev) {
	  self.keyEventHandler(ev)
	})
  }
}
</script>
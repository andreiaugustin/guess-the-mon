


<template>
  <div class="bg-white">
	<div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
	  <h3 class="text-xl tracking-tight text-gray-900">High Score: {{globalHighScore}}</h3>
	  <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Score: {{currScore}}</h2>

	  <button @click="drawdiffCard()" class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
let pokemons = getPokemon()
/* var pokemon = { id: 7, name: "bulbasaur", imgUrl: "https://cdn.traction.one/pokedex/pokemon/7.png", imgAlt: "squirtle Picture", guessedName: "_ _ _ _ _ _ _ _ _" } */
var i = 0;
var pokemon = pokemons[i]
var done = []
var globalHighScore = parseInt(window.localStorage.getItem('pokemonGameHighScore')) | 0
var currScore = 0;
export default {
  setup(){
	return({
	  pokemon,
	  i,
	  pokemons,
	  done,
	  globalHighScore,
	  currScore,
	})
  },
  methods:{
	keyEventHandler(e){
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
	  if(this.i === 51){
		  this.i = 0;
		  this.pokemons = getPokemon()
		  console.log("Shuffled Cards")
	  }
	  this.i += 1
  	  if(this.globalHighScore <= this.currScore) this.globalHighScore += 1;
	  this.currScore += 1
      this.pokemon = this.pokemons[this.i]
	  document.getElementsByClassName("pokemonName")[0].innerHTML = this.pokemon.guessedName;
	  console.log(this.pokemon)
	  window.localStorage.setItem('pokemonGameHighScore',this.globalHighScore.toString())
	  this.$forceUpdate();
    }
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
	},
	drawdiffCard(){
		this.currScore = 0;
		this.i += 1;
		this.pokemon = pokemons[this.i];
		this.pokemon.guessedName = pokemons[this.i].guessedName;
		console.log(this.pokemon.name)
		this.$forceUpdate()
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
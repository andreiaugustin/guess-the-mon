


<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Score </h2>

      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="pokemon in pokemons" :key="pokemon.id" class="group relative">
          <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img :src="pokemon.imageSrc" :alt="pokemon.imageAlt" class="w-full h-full object-center object-cover lg:w-full lg:h-full" />
          </div>

          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              Here we can make a component where people can enter Pokémon name
            </h3>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
const pokemons = [
  {
    id: 1,
    name: 'Bulbasaur',
    imageSrc: 'https://img.pokemondb.net/artwork/large/bulbasaur.jpg',
    imageAlt: "Pokemon-Image",
  },
  // More Pokémons ...
]

export default {
  setup() {
    return {
      pokemons,
    }
  },
}
</script>
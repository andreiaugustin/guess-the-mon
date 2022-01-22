export class Pokemon{
    id: number;
    name: string;
    imgUrl: string;
    imgAlt: string;
    underScores: string;

    constructor(){
        this.id = 0;
        this.name = "";
        this.imgUrl = "";
        this.imgAlt = "";
        this.underScores = "";
    }
}
export function setCharAt(str:string,index:number,chr:string) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
export function contains(obj:number, list:number[]){
    for(var i=0;i<list.length;i++){
        if(list[i] === obj){
            return true;
        }
    }
    return false;
}
function getRandomOrder(order : any[]){
    var tmp, current, top = order.length;
    if (top){
        while(top--){
            current = Math.floor(Math.random() * (top + 1))
            tmp = order[current]
            order[current] = order[top]
            order[top] = tmp;
        }
    }
    return order;
}
export async function getPokemon(){
    var res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=52')
    let jsonObj = await res.json()
    let nonImageJson = jsonObj['results']
    let resArr = []
    for (let pokemon of nonImageJson) {
        var pokemonObj = new Pokemon();
        let temp = pokemon["url"].split("/")
        pokemonObj.id = parseInt(temp.at(-2))
        pokemonObj.name = pokemon.name
        pokemonObj.imgUrl = `https://cdn.traction.one/pokedex/pokemon/${pokemonObj.id}.png` 
        pokemonObj.imgAlt = `${pokemonObj.name} Picture`
        for(var i=0;i<pokemonObj.name.length;i++){
            pokemonObj.underScores = pokemonObj.underScores + "_"
        }
        pokemonObj.underScores = pokemonObj.underScores.split("").join(" ")
        resArr.push(pokemonObj)
    }
    return getRandomOrder(resArr)
}

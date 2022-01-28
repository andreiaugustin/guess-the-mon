import * as request from 'sync-request'
export class Pokemon{
    id: number;
    name: string;
    imgUrl: string;
    imgAlt: string;
    guessedName: string;

    constructor(pID:number, pName:string, pImgURL:string, pImgAlt:string, pGuessedName:string){
        this.id = pID;
        this.name = pName;
        this.imgUrl = pImgURL;
        this.imgAlt = pImgAlt;
        this.guessedName = pGuessedName;
    }
}




export function setCharAt(str:string,index:number,chr:string) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index);
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


export function getPokemon(){
    var res : any = request.default('GET','https://pokeapi.co/api/v2/pokemon?limit=52')
    let jsonObj : Object = JSON.parse(res.body)
    console.log(jsonObj)
    let nonImageJson = jsonObj['results']
    let resArr : any[] = []
    for (let pokemon of nonImageJson) {
        
        let temp = pokemon["url"].split("/")
        let id = parseInt(temp.at(-2))
        let name = pokemon.name
        let imgUrl = `https://cdn.traction.one/pokedex/pokemon/${id}.png` 
        let imgAlt = `${name} Picture`
        let guessedName = '_'.repeat(name.length);

        resArr.push(new Pokemon(id, name, imgUrl, imgAlt, guessedName));
    }
    return getRandomOrder(resArr)
}
getPokemon()
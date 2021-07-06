/**
 * A class where refers to the variable from the file backend/data.js
 * Methods:
 * ---getRandomEntry() brings a random number between 0 and the max index
 *    of the object result.
 *
 * ---searchName(name):  Using Object.keys(array).find to get the key of my object
 *
 */
export default class PdataClass {
  count?: any;
  next?: string;
  previous?: any;
  result?: {
    name: string | string[];
    url: string;
  }[];

  constructor(
    count?: any,
    next?: any,
    previous?: string,
    result?: {
      name: string;
      url: string;
    }[]
  ) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.result = result;
  }
  /**
   * @returns a random url of pokemon from the json file
   *      1.gets the max length from result[], after that, the getRandom function
   *      generates a random number between 0 and the max length of the object
   *
   *      2.using the random number we now can point towars the index number of the object
   *      to show finally the url of the pokemon.
   */
  getRandomEntry(): any {
    var lenMax = Object.keys(this.result).length - 1;
    const getRandom = () => {
      return Math.floor(Math.random() * (lenMax - 0) + 0);
    };

    return this.result[getRandom()].url;
  }

  /**
   * @param findByname this input is the name of the pokemon to be found
   * @returns the url if this was spelled properly
   * Here I use the filter method where I compared the name in the list with the input
   * if this is a match it returns the url from the object
   */
  searchName(findByname: string | string[]) {
    //just in case  this.result = PokemonList is the list with names and urls
    var urlx: string;
    this.result.filter(PokemonList => {
      if (PokemonList.name === findByname) {
        console.log(PokemonList.url);
        urlx = PokemonList.url;
        return;
      }
    });
    return urlx;
  }
}

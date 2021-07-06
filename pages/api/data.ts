/**
 * Just a Json with pokokemon DB
 */
const PokeJson = {
  count: 1118,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: null,
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/"
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/"
    },
    {
      name: "charmeleon",
      url: "https://pokeapi.co/api/v2/pokemon/5/"
    },
    {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/6/"
    },
    {
      name: "squirtle",
      url: "https://pokeapi.co/api/v2/pokemon/7/"
    },
    {
      name: "wartortle",
      url: "https://pokeapi.co/api/v2/pokemon/8/"
    },
    {
      name: "blastoise",
      url: "https://pokeapi.co/api/v2/pokemon/9/"
    },
    {
      name: "caterpie",
      url: "https://pokeapi.co/api/v2/pokemon/10/"
    },
    {
      name: "metapod",
      url: "https://pokeapi.co/api/v2/pokemon/11/"
    },
    {
      name: "butterfree",
      url: "https://pokeapi.co/api/v2/pokemon/12/"
    },
    {
      name: "weedle",
      url: "https://pokeapi.co/api/v2/pokemon/13/"
    },
    {
      name: "kakuna",
      url: "https://pokeapi.co/api/v2/pokemon/14/"
    },
    {
      name: "beedrill",
      url: "https://pokeapi.co/api/v2/pokemon/15/"
    },
    {
      name: "pidgey",
      url: "https://pokeapi.co/api/v2/pokemon/16/"
    },
    {
      name: "pidgeotto",
      url: "https://pokeapi.co/api/v2/pokemon/17/"
    },
    {
      name: "pidgeot",
      url: "https://pokeapi.co/api/v2/pokemon/18/"
    },
    {
      name: "rattata",
      url: "https://pokeapi.co/api/v2/pokemon/19/"
    },
    {
      name: "raticate",
      url: "https://pokeapi.co/api/v2/pokemon/20/"
    }
  ]
};

/****
 *end ofJust a Json with pokemon DB
 *
 */

import type { NextApiRequest, NextApiResponse } from "next";
//I import the class from a diferent file to be more organized
import PdataClass from "./PokeDbClass";

/**
 * here, I create a new object from de class, to bind the elements, the txtJson and the class
 */
const Pokedb = new PdataClass(
  PokeJson.count,
  PokeJson.next,
  PokeJson.previous,
  PokeJson.results
);
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.name) {
    console.log(req.query.name); // The url query string
    var x = req.query.name;
    res.json(Pokedb.searchName(x));
  } else {
    res.status(200).json(Pokedb.getRandomEntry());
  }
  // res.send("Hello world!");
}

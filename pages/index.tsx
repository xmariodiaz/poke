import React, { createRef, useState } from "react";
import styles from "../styles/Home.module.css";
const axios = require("axios").default;

export default function Home() {
  const [clickbar, pBar] = useState(false); // this hook to control the animation bar
  const [urlPokemonapi, setNewUrlpoke] = useState(); // this hook to control the randon pokemon box
  const [resultSearch, goSearch] = useState();

  /**
   * This function fetch the data from my local API to get the url fromde json db, after this it connects with the pokemon api
   */
  async function getRandomPoke() {
    try {
      let response = await axios.get("/api/data"); //local API to get the url
      console.log("Mario local Api: " + response.data);
      let PokeOficialApi = await axios.get(response.data); //pokemon api url
      console.log("Poke oficial " + PokeOficialApi.data.sprites.front_default);
      setNewUrlpoke(PokeOficialApi.data.sprites.front_default); // get the url of the image and set it in the DOM using the hook
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * This is the function pokesearch, this uses the input to look the word given in the api
   */
  async function pokeSearch() {
    if (myInput.current?.value) {
      try {
        /**
         * //local API+param to get the url
         * **/
        let response = await axios.get(
          "/api/data?name=" + myInput.current?.value
        );
        console.log("Search res:" + response.data);
        if (response.data) {
          /**
           * //pokemon api url
           */
          let PokeOficialApi = await axios.get(response.data);
          console.log(
            "Search Poke oficial " + PokeOficialApi.data.sprites.front_default
          );

          if (PokeOficialApi.data) {
            // get the url of the image and set it in the DOM using the hook
            goSearch(PokeOficialApi.data.sprites.front_default);
          } else {
            return "./poke.png";
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  const myInput = React.createRef<HTMLInputElement>(); //using React.createRef I bind the input with virtual react DOM

  return (
    <div className={styles.outerbox}>
      <div>
        <input placeholder="charizard" ref={myInput} />
        <button
          onClick={e => {
            pokeSearch();
          }}
        >
          Search
        </button>
      </div>
      {/*The upper Section */}
      {/*
       *finally it worked, I used the className and  I changed the name classes in the css style,
       * since we can use the selector # in Next, therefore I changed the name classes, getting rid of  (-) dashes.
       */}
      <div className={styles.horz} id="upper-horz">
        <div
          className={`${styles.vert} ${styles.upperleftvert}`}
          id="upper-left-vert"
        ></div>
        <div
          className={`${styles.vert} ${styles.upperrightvert}`}
          id="upperrightvert"
          style={{
            backgroundImage: `url(${resultSearch})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        ></div>
      </div>
      {/*The lower Section */}
      {/*
       * The proggress bar is working, I use a Css animation, to change the width from 0 to the original
       * to make this, I'm using the react hook useState. It use a Boolean variable to activate the swith.
       * In classname using the JS ternary operator, when the switch is true the animation class is added and
       * starts increasing the width, when it's false the class is just removed.
       * This is controlled by the Onclick event.
       */}
      <div className={styles.horz} id="lower-horz">
        <div
          className={`${styles.vert}  ${clickbar ? styles.animationClass : ""}`}
          id="lower-left-vert"
          onClick={() => pBar(!clickbar)}
        >
          <label>{`${clickbar ? "" : "Click me :)"}`}</label>
        </div>
        {/**In this section I draw a random pokemon once is clicked */}
        <div
          className={`${styles.vert} ${styles.lowerrightvert}`}
          onClick={getRandomPoke}
          style={{
            backgroundImage: `url(${urlPokemonapi})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        >
          <label style={{ fontSize: "12px" }}>Click me!</label>
        </div>
      </div>
    </div>
  );
}

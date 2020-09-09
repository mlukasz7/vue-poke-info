import Vue from "vue";
import Vuex from "vuex";

import { PokeApi } from "../src/utilities/PokeApi";
import { PokeColletion } from "../src/utilities/PokeCollection";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    collectedPokemons: [],
    pokemons: []
  },
  getters: {
    pokemons: state => {
      return state.pokemons;
    },
    collectedPokemons: state => {
      return state.collectedPokemons;
    }
  },
  mutations: {
    setPokemons(state, payload) {
      state.pokemons = payload;
    },
    setCollectedPokemons(state, payload) {
      state.collectedPokemons = payload;
    }
  },
  actions: {
    loadPokemons: async ({ commit }) => {
      const pokeApi = new PokeApi();
      const res = await pokeApi.getPokemons();
      let results = res.results;

      results = results?.map(el => ({
        ...el,
        id: el.url
          .replace("https://pokeapi.co/api/v2/pokemon/", "")
          .replace("/", "")
      }));

      commit("setPokemons", results);
    },
    loadCollectedPokemons: async ({ commit }) => {
      const pokeCollection = new PokeColletion();
      const collectedPokemons = await pokeCollection.collectedPokemons;

      commit("setCollectedPokemons", collectedPokemons);
    },
    addPokemonToCollection: async ({ commit }, id) => {
      const pokeCollection = new PokeColletion();
      await pokeCollection.addPokemon(id);
      const collectedPokemons = await pokeCollection.collectedPokemons;

      commit("setCollectedPokemons", collectedPokemons);
    },
    removePokemonToCollection: async ({ commit }, id) => {
      const pokeCollection = new PokeColletion();
      await pokeCollection.removePokemon(id);
      const collectedPokemons = await pokeCollection.collectedPokemons;

      commit("setCollectedPokemons", collectedPokemons);
    }
  }
});

export default store;

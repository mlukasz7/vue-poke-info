import Vue from "vue";
import Vuex from "vuex";

import { PokeApi } from "../src/utilities/PokeApi";
import { PokeColletion } from "../src/utilities/PokeCollection";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    appError: false,
    collectedPokemons: [],
    pokemons: []
  },
  getters: {
    appError: state => {
      return state.appError;
    },
    pokemons: state => {
      return state.pokemons;
    },
    collectedPokemons: state => {
      return state.collectedPokemons;
    }
  },
  mutations: {
    setAppError(state, payload) {
      state.appError = payload;
    },
    setPokemons(state, payload) {
      state.pokemons = payload;
    },
    setCollectedPokemons(state, payload) {
      state.collectedPokemons = payload;
    }
  },
  actions: {
    setAppError: ({ commit }, payload) => {
      commit("setAppError", payload);
    },
    loadPokemons: async ({ commit }) => {
      const pokeApi = new PokeApi();
      try {
        const res = await pokeApi.getPokemons();
        let results = res.results;

        results = results?.map(el => ({
          ...el,
          id: el.url
            .replace("https://pokeapi.co/api/v2/pokemon/", "")
            .replace("/", "")
        }));

        commit("setPokemons", results);
        commit("setAppError", false);
      } catch (e) {
        const results = [];

        commit("setPokemons", results);
        commit("setAppError", true);
      }
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

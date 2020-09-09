import Vue from "vue";
import Vuex from "vuex";

import { PokeApi } from "../src/utilities/PokeApi";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    collectedPokemons: [],
    pokemons: []
  },
  getters: {
    getPokemons: state => {
      return state.pokemons;
    }
  },
  mutations: {
    setPokemons(state, payload) {
      state.pokemons = payload;
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
    }
  }
});

export default store;

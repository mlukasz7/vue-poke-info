export class PokeColletion {
  collectedPokemons = [];

  constructor() {
    try {
      const collectedPokemons = localStorage.getItem("collectedPokemons");

      this.collectedPokemons = collectedPokemons
        ? JSON.parse(collectedPokemons)
        : [];
    } catch (e) {
      this.collectedPokemons = [];
    }
  }

  get collectedPokemons() {
    return this.collectedPokemons;
  }

  addPokemon(id) {
    const indexOfId = this.collectedPokemons.findIndex(
      collectedPokemonId => collectedPokemonId === id
    );

    if (indexOfId === -1) {
      this.collectedPokemons = [...this.collectedPokemons, id];

      localStorage.setItem(
        "collectedPokemons",
        JSON.stringify(this.collectedPokemons)
      );
    }
  }

  removePokemon(id) {
    const indexOfId = this.collectedPokemons.findIndex(
      collectedPokemonId => collectedPokemonId === id
    );

    if (indexOfId > -1) {
      this.collectedPokemons.splice(indexOfId, 1);

      localStorage.setItem(
        "collectedPokemons",
        JSON.stringify(this.collectedPokemons)
      );
    }
  }
}

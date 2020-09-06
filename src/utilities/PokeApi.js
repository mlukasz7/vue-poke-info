export class PokeApi {
  baseUrl = "https://pokeapi.co/api/v2/pokemon";

  async getPokemons() {
    const res = await fetch(`${this.baseUrl}?limit=400`);
    return await res.json();
  }

  async getPokemon(id) {
    const res = await fetch(`${this.baseUrl}/${id}`);
    return await res.json();
  }
}

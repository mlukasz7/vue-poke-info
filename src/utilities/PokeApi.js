export class PokeApi {
  baseUrl = "https://pokeapi.co/api/v2/pokemon";

  async getPokemons(offset = 0) {
    const res = await fetch(`${this.baseUrl}?limit=40&offset=${offset}`);
    return await res.json();
  }
}

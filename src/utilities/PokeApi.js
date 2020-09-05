export class PokeApi {
  baseUrl = "https://pokeapi.co/api/v2/pokemon";

  async getPokemons() {
    const res = await fetch(this.baseUrl);
    return await res.json();
  }
}

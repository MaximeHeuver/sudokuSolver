import {Tile} from "./tile";

export class Group {
  public tiles: Tile[] = []

  constructor() {
    this.tiles = [];
  }

  public registerTile(tile: Tile) {
    this.tiles.push(tile)
    tile.groups.push(this)
  }
}

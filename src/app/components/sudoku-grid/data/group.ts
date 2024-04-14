import {Tile} from "./tile";
import {GroupType} from "./group-type";

export class Group {
  public tiles: Tile[] = []
  public readonly type: GroupType;

  constructor(type: GroupType) {
    this.tiles = [];
    this.type = type
  }

  public registerTile(tile: Tile) {
    this.tiles.push(tile)
    tile.groups.push(this)
  }
}

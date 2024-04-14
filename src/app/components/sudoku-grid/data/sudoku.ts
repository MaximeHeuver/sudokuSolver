import {Tile} from "./tile";
import {Group} from "./group";

export class Sudoku {
  public tiles: Tile[]
  public groups: Group[]

  public nakedPairs: [Tile, Tile]

  constructor(tiles: Tile[], groups: Group[]) {
    this.tiles = tiles;
    this.groups = groups;
  }

  addNakedPairs(newTuples: [Tile, Tile][]) {

  }
}

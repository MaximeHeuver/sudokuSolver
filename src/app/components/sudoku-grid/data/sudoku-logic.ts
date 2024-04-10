 import {Sudoku} from "./sudoku";
 import {Tile} from "./tile";
 import {Group} from "./group";
 import {SimpleTile, SolvingStep} from "./solving-step";
 import {SudokuService} from "../service/sudoku.service";


 export class SudokuLogic {
  private static readonly possibleOptions: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  public static initializeSudoku(): Sudoku {
    let tiles = new Array<Tile>(81)
    let groups = new Array<Group>(27)

    for (let i = 0; i < tiles.length; i++) {
      tiles[i] = new Tile([...this.possibleOptions], i.toString())
    }

    for (let i = 0; i < groups.length; i++) {
      groups[i] = new Group();
    }

    tiles.forEach((tile, index) => {
      groups[Math.trunc(index / 9)].registerTile(tile)
      groups[Math.trunc((index % 9) + 9)].registerTile(tile)
      groups[Math.trunc(((Math.trunc(index / 27) * 3) + Math.trunc((index % 9) / 3)) + 18)].registerTile(tile)
    })

    return new Sudoku(tiles, groups)
  }

  public static mapToSimpleTiles(sudoku: Sudoku): SimpleTile[] {
    return sudoku.tiles.map(tile => {
      return new SimpleTile(tile.id, [...tile.possibleOptions])
    })
  }

  static isInputValid(affectedTile: Tile, value: string): boolean {
    return !affectedTile.groups
      .some(group => group.tiles
        .some(tile => tile.solvedValue == value))
  }

  static updateSudokuAndDocumentResult(affectedTile: Tile, input: string, sudoku: Sudoku): SolvingStep[] {
    let steps: SolvingStep[] = []

    affectedTile.setValue(input)
    affectedTile.isUsedForElimination = true;

    affectedTile.groups
      .forEach(group => group.tiles
        .filter(tile => tile.possibleOptions.length > 1)
        .forEach(tile => {
          tile.removeOption(input)
        }))

    affectedTile.groups
      .forEach(group => {
        this.possibleOptions.forEach(option => {
          let tiles = group.tiles.filter(tile => tile.possibleOptions.includes(option) && tile.possibleOptions.length > 1)

          if (tiles.length == 1) {
            tiles[0].setValue(option)
          }
        })
      });

    return steps;
  }
}

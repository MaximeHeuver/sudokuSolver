import {Sudoku} from "../data/sudoku";
import {Tile} from "../data/tile";
import {Group} from "../data/group";
import {SimpleTile, SolvingStep} from "../data/solving-step";
import {SolvingStrategy} from "../data/solving-strategy";
import {GroupType} from "../data/group-type";


export class SudokuLogic {
  private static readonly possibleOptions: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  public static initializeSudoku(): Sudoku {
    let tiles = new Array<Tile>(81)
    let groups = new Array<Group>(27)

    for (let i = 0; i < tiles.length; i++) {
      tiles[i] = new Tile([...this.possibleOptions], i.toString())
    }

    for (let i = 0; i < groups.length / 3; i++) {
      groups[i] = new Group(GroupType.Row);
      groups[i + 9] = new Group(GroupType.Column);
      groups[i + 18] = new Group(GroupType.Box);
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

  static handleManualInput(affectedTile: Tile, input: string, sudoku: Sudoku, steps: SolvingStep[]) {
    affectedTile.setValue(input)

    this.eliminatePossibleOptionsFromAdjacentTiles(affectedTile, input)

    this.documentStep(affectedTile, sudoku, SolvingStrategy.ManualInput, steps)

    this.updateSudokuAndDocumentResult(affectedTile, input, sudoku, steps);
  }

  static updateSudokuAndDocumentResult(affectedTile: Tile, input: string, sudoku: Sudoku, steps: SolvingStep[]) {
    this.checkForLastPossibleNumberAndIterate(affectedTile, input, sudoku, steps);

    this.checkForLastRemainingCellAndIterate(affectedTile, input, sudoku, steps);

    // this.documentNakedPairs(affectedTile, sudoku)
  }

  private static checkForLastPossibleNumberAndIterate(affectedTile: Tile, input: string, sudoku: Sudoku, steps: SolvingStep[]) {
    affectedTile.groups
      .forEach(group => group.tiles
        .filter(tile => tile.possibleOptions.length == 1 && !tile.isSolveDocumented)
        .forEach(tile => {
          if (tile.solvedValue) {
            this.documentStep(tile, sudoku, SolvingStrategy.LastPossibleNumber, steps)

            this.updateSudokuAndDocumentResult(tile, tile.solvedValue, sudoku, steps)
          }
        }))
  }

  private static checkForLastRemainingCellAndIterate(affectedTile: Tile, input: string, sudoku: Sudoku, steps: SolvingStep[]) {
    affectedTile.groups
      .forEach(group => {
        this.possibleOptions.forEach(option => {
          let tiles = group.tiles.filter(tile => tile.possibleOptions.includes(option) && tile.possibleOptions.length > 1)

          if (tiles.length == 1) {
            tiles[0].setValue(option)

            this.eliminatePossibleOptionsFromAdjacentTiles(tiles[0], option)

            if (tiles[0].solvedValue) {
              this.documentStep(tiles[0], sudoku, SolvingStrategy.LastRemainingCell, steps)

              this.updateSudokuAndDocumentResult(tiles[0], tiles[0].solvedValue, sudoku, steps)
            }
          }
        })
      });
  }

  private static documentNakedPairs(affectedTile: Tile, sudoku: Sudoku) {
    let newTuples: [Tile, Tile][] = [];

    affectedTile.groups.forEach(group => {
      let tuples: [Tile | undefined, Tile | undefined][] = [];

      group.tiles
        .filter(tile => tile.possibleOptions.length == 2)
        .forEach((tile, index, self) => {
          tuples.forEach((tuple, index) => {
            if (tuple[1]?.possibleOptions === tile.possibleOptions) {
              tuples.splice(index)
              return;
            }

            if (tuple[0]?.possibleOptions === tile.possibleOptions) {
              tuple[1] = tile;
              return;
            }

            tuples.push([tile, undefined])
          })
        }
      );

      tuples.forEach(tuple => {
        if (tuple[0] != undefined && tuple[1] != undefined) {
          newTuples.push([tuple[0], tuple[1]])
        }
      })
    });

    sudoku.addNakedPairs(newTuples)
  }

  private static eliminatePossibleOptionsFromAdjacentTiles(affectedTile: Tile, input: string) {
    affectedTile.groups
      .forEach(group => group.tiles
        .filter(tile => tile.possibleOptions.length > 1)
        .forEach(tile => tile.removeOption(input)));
  }

  private static documentStep(tile: Tile, sudoku: Sudoku, solvingStrategy: SolvingStrategy, steps: SolvingStep[]) {
    tile.isSolveDocumented = true;

    steps.push({
      appliedStrategy: solvingStrategy,
      state: this.mapToSimpleTiles(sudoku)
    })
  }
}

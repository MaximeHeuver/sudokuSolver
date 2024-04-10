import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SolvingStep} from "../data/solving-step";
import {SolvingStrategy} from "./solving-strategy";
import {SudokuLogic} from "../data/sudoku-logic";
import {Sudoku} from "../data/sudoku";
import {Tile} from "../data/tile";

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  public sudokuSteps$: BehaviorSubject<SolvingStep[]>

  private steps: SolvingStep[];
  private currentState: Sudoku;

  constructor() {
    this.currentState = SudokuLogic.initializeSudoku();

    this.steps = [{
      state: SudokuLogic.mapToSimpleTiles(this.currentState),
      appliedStrategy: SolvingStrategy.InitialState
    }]

    this.sudokuSteps$ = new BehaviorSubject<SolvingStep[]>(this.steps)
  }

  public pickValue(value: string, tileId: string) {
    let affectedTile = this.tryGetTile(tileId);

    this.validateInput(affectedTile, value)

    let newSteps: SolvingStep[] = SudokuLogic.updateSudokuAndDocumentResult(affectedTile, value, this.currentState)
    this.steps.concat(newSteps);

    this.mapAndEmitCurrentState()

    this.sudokuSteps$.next(this.steps)
  }

  private tryGetTile(tileId: string): Tile {
    let tile = this.currentState.tiles.find(x => x.id == tileId)

    if (!tile) {
      this.sudokuSteps$.next(this.steps)
      throw new Error(`no tile found for id: ${tileId}`)
    }

    return tile;
  }

  private validateInput(affectedTile: Tile, value: string) {
    if (!SudokuLogic.isInputValid(affectedTile, value)){
      this.sudokuSteps$.next(this.steps)
      throw new Error(`${value} is not a valid value because another group already contains it`)
    }
  }

  private mapAndEmitCurrentState() {
    let newState: SolvingStep = {
      state: SudokuLogic.mapToSimpleTiles(this.currentState),
      appliedStrategy: SolvingStrategy.ManualInput
    }

    this.steps = this.steps.concat(newState)
  }
}

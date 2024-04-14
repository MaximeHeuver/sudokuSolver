import {Sudoku} from "./sudoku";
import {SolvingStrategy} from "./solving-strategy";
import {Injectable, Input} from "@angular/core";

export class SolvingStep {
  state: SimpleTile[] = new Array(81);
  appliedStrategy: SolvingStrategy;

  constructor(appliedStrategy: SolvingStrategy) {
    this.appliedStrategy = appliedStrategy;
  }
}

export class SimpleTile {
  id: string;
  possibleOptions: string[]

  constructor(id: string, possibleOptions: string[]) {
    this.id = id;
    this.possibleOptions = possibleOptions;
  }

  get solvedValue(): string {
    if (this.possibleOptions.length == 1) {
      return this.possibleOptions[0]
    }

    return "";
  }
}

import {Group} from "./group";

export class Tile {
  public id: string
  public groups: Group[];
  public possibleOptions: string[];
  public isSolveDocumented: boolean = false;

  constructor(possibleOptions: string[], id: string) {
    this.id = id;
    this.groups = [];
    this.possibleOptions = possibleOptions
  }

  get solvedValue(): (string | undefined) {
    if (this.possibleOptions.length == 1) {
      return this.possibleOptions[0]
    }

    return undefined
  }

  public setValue(value: string) {
    this.possibleOptions = [value]
  }

  public removeOption(option: string) {
    if (this.solvedValue == option) return;

    const index = this.possibleOptions.indexOf(option);

    if (index > -1) {
      this.possibleOptions.splice(index, 1);
    }
  }
}

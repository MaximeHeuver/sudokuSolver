import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {SudokuLogic} from "./data/sudoku-logic";
import {Observable, Subject} from "rxjs";
import {Sudoku} from "./data/sudoku";
import {SudokuService} from "./service/sudoku.service";
import {SolvingStep} from "./data/solving-step";
import {Tile} from "./data/tile";

@Component({
  selector: 'app-sudoku-grid',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    NgClass
  ],
  templateUrl: './sudoku-grid.component.html',
  styleUrl: './sudoku-grid.component.scss'
})
export class SudokuGridComponent implements OnInit {
  sudokuSteps$: Observable<SolvingStep[]>

  constructor(private service: SudokuService) {
  }

  ngOnInit(): void {
    this.sudokuSteps$ = this.service.sudokuSteps$;

    this.sudokuSteps$.subscribe((test) => {
      console.log(test)
    })
  }

  handleInput(input: string, tileId: string) {
    this.service.pickValue(input, tileId)
  }

  trackByFn(index: number) {
    return index;
  }
}

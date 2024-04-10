import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SudokuGridComponent} from "./components/sudoku-grid/sudoku-grid.component";
import {SudokuService} from "./components/sudoku-grid/service/sudoku.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SudokuGridComponent],
  providers: [SudokuService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sudoku-solver';
}

import {Component, Input} from '@angular/core';
import {SolvingStep} from "../../data/solving-step";

@Component({
  selector: 'app-step-explanation',
  standalone: true,
  imports: [],
  templateUrl: './step-explanation.component.html',
  styleUrl: './step-explanation.component.scss'
})
export class StepExplanationComponent {
  @Input()
  public step: SolvingStep;
}

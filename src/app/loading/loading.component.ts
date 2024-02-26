import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  state,
  AnimationEvent,
} from '@angular/animations';

const fadeInOutAnimation = trigger('fadeInOutAnimation', [
  state('loading', style({ opacity: 1 })),
  state('finish', style({ opacity: 0 })),
  transition('loading => finish', [
    animate('0.2s')
  ]),
  transition('void => loading', [
    animate('0.5s')
  ]),
])
;


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  animations: [fadeInOutAnimation]
})
export class LoadingComponent {
  @Input({ required: true }) loading!: boolean;
  @Output() animationFinished = new EventEmitter();


  captureDoneEvent($event: AnimationEvent){
    if($event.toState === 'finish'){
      this.animationFinished.emit();
    }
  }
  
}

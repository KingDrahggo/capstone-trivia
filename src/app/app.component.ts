import { Component } from '@angular/core';
import { GameService, GameState } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  GameState = GameState; // Expose enum to template
  
  constructor(public gameService: GameService) {}

  startGame() {
    this.gameService.startGame();
  }
}

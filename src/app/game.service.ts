import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum GameState {
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
  GAMEOVER = 'GAMEOVER'
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly HIGH_SCORE_KEY = 'trivia_high_score';

  private _gameState = new BehaviorSubject<GameState>(GameState.WAITING);
  public gameState$ = this._gameState.asObservable();

  private _score = new BehaviorSubject<number>(0);
  public score$ = this._score.asObservable();

  private _highScore = new BehaviorSubject<number>(0);
  public highScore$ = this._highScore.asObservable();

  private _level = new BehaviorSubject<number>(1);
  public level$ = this._level.asObservable();

  constructor() {
    this.loadHighScore();
  }

  startGame() {
    this._score.next(0);
    this._level.next(1);
    this._gameState.next(GameState.PLAYING);
  }

  endGame() {
    this.updateHighScore();
    this._gameState.next(GameState.GAMEOVER);
  }

  resetGame() {
    this._gameState.next(GameState.WAITING);
  }

  incrementScore() {
    const currentScore = this._score.value;
    const newScore = currentScore + 1;
    this._score.next(newScore);
    
    // Increase level every 10 points
    if (newScore % 10 === 0) {
      this._level.next(this._level.value + 1);
    }
  }

  private loadHighScore() {
    const stored = localStorage.getItem(this.HIGH_SCORE_KEY);
    if (stored) {
      this._highScore.next(parseInt(stored, 10));
    }
  }

  private updateHighScore() {
    const currentScore = this._score.value;
    const currentHigh = this._highScore.value;
    if (currentScore > currentHigh) {
      this._highScore.next(currentScore);
      localStorage.setItem(this.HIGH_SCORE_KEY, currentScore.toString());
    }
  }

  getDifficulty(): 'easy' | 'medium' | 'hard' {
    const level = this._level.value;
    if (level <= 2) return 'easy';
    if (level <= 5) return 'medium';
    return 'hard';
  }
}

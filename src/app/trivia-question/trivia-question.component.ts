import { Component, OnInit, OnDestroy } from '@angular/core';
import { TriviaServiceService } from '../trivia-service.service';
import { GameService, GameState } from '../game.service';
import { Trivia } from '../trivia';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trivia-question',
  templateUrl: './trivia-question.component.html',
  styleUrls: ['./trivia-question.component.css']
})
export class TriviaQuestionComponent implements OnInit, OnDestroy {
  
  currentQuestion: Trivia | null = null;
  shuffledAnswers: string[] = [];
  questionQueue: Trivia[] = [];
  
  isLoading = false;
  hasAnswered = false;
  selectedAnswer: string | null = null;
  
  private sub: Subscription = new Subscription();

  constructor(
    private triviaService: TriviaServiceService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameService.level$.subscribe(() => {
       // Potential difficulty update handling if needed per-question, 
       // but we fetch batches so it effectively updates on next batch.
    });
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loadQuestions() {
    if (this.isLoading) return;
    this.isLoading = true;
    
    // Get difficulty based on current level (or just current state)
    const difficulty = this.gameService.getDifficulty();
    
    // Fetch a batch of 10 questions
    this.sub.add(
      this.triviaService.getTriviaQuestions(10, difficulty).subscribe({
        next: (questions) => {
          this.questionQueue.push(...questions);
          this.isLoading = false;
          
          if (!this.currentQuestion) {
            this.nextQuestion();
          }
        },
        error: (err) => {
          console.error('Failed to load questions', err);
          this.isLoading = false;
        }
      })
    );
  }

  nextQuestion() {
    if (this.questionQueue.length === 0) {
      // Emergency fetch if queue empty
      this.loadQuestions();
      return;
    }

    // Prefetch if low
    if (this.questionQueue.length < 3) {
      this.loadQuestions();
    }

    this.currentQuestion = this.questionQueue.shift()!;
    this.hasAnswered = false;
    this.selectedAnswer = null;
    
    // Shuffle answers
    const allAnswers = [
      ...this.currentQuestion.incorrect_answers, 
      this.currentQuestion.correct_answer
    ];
    this.shuffledAnswers = this.shuffleArray(allAnswers);
  }

  onSelectAnswer(answer: string) {
    if (this.hasAnswered) return;
    
    this.hasAnswered = true;
    this.selectedAnswer = answer;
    
    const isCorrect = answer === this.currentQuestion?.correct_answer;
    
    if (isCorrect) {
      this.gameService.incrementScore();
      // Delay before next question
      setTimeout(() => {
        this.nextQuestion();
      }, 1500);
    } else {
      // Game Over
      setTimeout(() => {
        this.gameService.endGame();
      }, 1500);
    }
  }

  private shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Helper to decode HTML entities (simple version)
  decodeHtml(html: string): string {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
}

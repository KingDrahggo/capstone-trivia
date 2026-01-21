import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trivia, TriviaResponse } from './trivia';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriviaServiceService {
  private baseUrl = "https://opentdb.com/api.php";

  constructor(private http: HttpClient) { }

  getTriviaQuestions(amount: number = 5, difficulty: 'easy' | 'medium' | 'hard' = 'easy'): Observable<Trivia[]> {
    const url = `${this.baseUrl}?amount=${amount}&category=9&difficulty=${difficulty}&type=multiple`;
    // Note: Category 9 is General Knowledge. We could parameterize this later if needed.
    // Or remove category to get random questions from all categories. Let's remove category for variety.
    const varietyUrl = `${this.baseUrl}?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    
    return this.http.get<TriviaResponse>(varietyUrl).pipe(
      map(response => response.results)
    );
  }
}

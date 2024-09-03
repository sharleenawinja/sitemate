import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Issue {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private apiUrl = 'http://localhost:3000/issues';

  constructor(private http: HttpClient) {}

  // Create
  createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.apiUrl, issue);
  }

  // Read
  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl);
  }

  // Update
  updateIssue(id: number, issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/${id}`, issue);
  }

  // Delete
  deleteIssue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

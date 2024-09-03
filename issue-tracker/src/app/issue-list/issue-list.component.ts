import { Component, OnInit } from '@angular/core';
import { IssueService, Issue } from '../issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  newIssue: Issue = { id: 0, title: '', description: '' };
  selectedIssue: Issue | null = null;

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.issueService.getIssues().subscribe((data) => {
      this.issues = data;
    });
  }

  createIssue(): void {
    this.issueService.createIssue(this.newIssue).subscribe((issue) => {
      this.issues.push(issue);
      this.newIssue = { id: 0, title: '', description: '' };
    });
  }

  updateIssue(issue: Issue): void {
    if (issue.id) {
      this.issueService
        .updateIssue(issue.id, issue)
        .subscribe((updatedIssue) => {
          const index = this.issues.findIndex((i) => i.id === updatedIssue.id);
          this.issues[index] = updatedIssue;
          this.selectedIssue = null;
        });
    }
  }

  deleteIssue(id: number): void {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.issues = this.issues.filter((issue) => issue.id !== id);
    });
  }

  selectIssue(issue: Issue): void {
    this.selectedIssue = { ...issue };
  }
}

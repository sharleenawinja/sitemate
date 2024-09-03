import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IssueListComponent } from './issue-list.component';

describe('IssueTrackerComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [IssueListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of issues', () => {
    component.issues = [
      { id: 1, title: 'Issue 1', description: 'Description 1' },
      { id: 2, title: 'Issue 2', description: 'Description 2' },
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const issueElements = compiled.querySelectorAll('li');
    expect(issueElements.length).toBe(2);
  });

  it('should call selectIssue when Edit button is clicked', () => {
    spyOn(component, 'selectIssue');
    component.issues = [
      { id: 1, title: 'Issue 1', description: 'Description 1' },
    ];
    fixture.detectChanges();

    const editButton = fixture.nativeElement.querySelector('button');
    editButton.click();

    expect(component.selectIssue).toHaveBeenCalledWith(component.issues[0]);
  });

  it('should call deleteIssue when Delete button is clicked', () => {
    spyOn(component, 'deleteIssue');
    component.issues = [
      { id: 1, title: 'Issue 1', description: 'Description 1' },
    ];
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelectorAll('button')[1];
    deleteButton.click();

    expect(component.deleteIssue).toHaveBeenCalledWith(1);
  });

  it('should create a new issue when form is submitted', () => {
    component.newIssue = {
      id: 5,
      title: 'New Issue',
      description: 'New Description',
    };
    spyOn(component, 'createIssue');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.createIssue).toHaveBeenCalled();
  });

  it('should update an existing issue when Edit form is submitted', () => {
    component.selectedIssue = {
      id: 1,
      title: 'Updated Issue',
      description: 'Updated Description',
    };
    spyOn(component, 'updateIssue');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelectorAll('form')[1];
    form.dispatchEvent(new Event('submit'));

    expect(component.updateIssue).toHaveBeenCalledWith(component.selectedIssue);
  });
});

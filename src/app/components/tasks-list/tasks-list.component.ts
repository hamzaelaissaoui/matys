import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface TasksFormArray {
  tasks: FormArray<FormGroup<TaskForm>>
}

interface TaskForm {
  title: FormControl<string>;
  completed: FormControl<boolean | null>
}



@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {
  public forms = new FormGroup<TasksFormArray>({} as TasksFormArray);

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {

    this.forms = this.formBuilder.group({
      tasks: this.formBuilder.array([
        new FormGroup({
          title: new FormControl<string>('', {nonNullable: true}),
          completed: new FormControl<boolean|null>(null)
        })
      ])
    })
    
  }

  public get tasks(): any {
    return this.forms.get('tasks');
  }

  public addNewTask(): void {
    this.forms.controls.tasks.push(new FormGroup({
      title: new FormControl('', {nonNullable: true}),
      completed: new FormControl<boolean | null>(null)
    }));
  }

  public onDelete(i: number): void {
    this.forms.controls.tasks.removeAt(i);
  }

  public get completedTasks(): {title: string, completed: boolean}[] {
    return this.forms.controls.tasks.controls.map(x => ({completed: x.value.completed || false, title: x.value.title || ''}))
    .filter(x=>x.completed);
  }
}

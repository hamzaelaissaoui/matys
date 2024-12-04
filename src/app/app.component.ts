import { Component } from '@angular/core';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TasksListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDoApp';
}

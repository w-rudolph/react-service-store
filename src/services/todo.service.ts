import { BehaviorSubject } from 'react-store-service';

export type TodoItem = {
  id?: string;
  name?: string;
  content?: string;
};

export class TodoService {
  list$ = new BehaviorSubject<TodoItem[]>([]);
  detail$ = new BehaviorSubject<TodoItem>({});

  todoList: TodoItem[] = [];
  todoDetail: TodoItem = {};

  addTodo(todo: TodoItem) {
    const idx = this.todoList.findIndex(t => t.id === todo.id);
    if (idx > -1) {
      this.todoList[idx] = todo;
    } else {
      this.todoList.push(todo);
    }
  }

  getTodoDetail(id: string) {
    const todo = this.todoList.find(t => t.id === id) as TodoItem;
    this.detail$.next(todo);
  }
}

export default new TodoService();

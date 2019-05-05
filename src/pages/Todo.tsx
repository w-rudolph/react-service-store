import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import todoService, { TodoItem } from '../services/todo.service';
import { connect } from 'react-store-service';

type TodoProps = {
  todoList: TodoItem[];
};

class Todo extends Component<TodoProps> {
  render() {
    const todoList = this.props.todoList;
    return (
      <div id="todo">
        <NavLink to="/todo-add">添加 Todo</NavLink>
        <hr />
        <div className="todo-list">
          {todoList.map((item: TodoItem) => {
            return (
              <div className="todo-item" key={item.id}>
                <NavLink to={`/todo-detail/${item.id}`}>
                  <span>{item.name}</span>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const injector = {
  inject: todoService.list$,
  mapToProps: (t: TodoItem[]) => ({ todoList: t })
};
export default connect([injector])(Todo);

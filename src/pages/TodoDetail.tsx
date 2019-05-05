import React, { Component } from 'react';
import { withRouter, RouteComponentProps, NavLink } from 'react-router-dom';
import todoService, { TodoItem } from '../services/todo.service';
import { connect } from 'react-store-service';

type Props = {
  todoDetail: TodoItem;
} & RouteComponentProps<any>;

type State = {
  todoDetail: TodoItem;
};

class TodoDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      todoDetail: {
        id: '',
        name: '',
        content: ''
      }
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id as string;
    todoService.getTodoDetail(id);
  }

  onSaveTodo = () => {
    const { id, name, content } = this.state.todoDetail;
    if (!name || !content) {
      return window.alert('请填写完整信息');
    }

    todoService.addTodo({
      id: id || Math.random().toString(32),
      name,
      content
    });
    window.alert('添加成功！');
    this.setState({
      todoDetail: {
        id: '',
        name: '',
        content: ''
      }
    });
  };

  componentWillReceiveProps(props: Props) {
    if (props.todoDetail) {
      this.setState({
        todoDetail: props.todoDetail
      });
    }
  }

  handleChange = (evt: Event, key: keyof (TodoItem)) => {
    const detail = this.state.todoDetail || {};
    detail[key] = (evt.target as HTMLInputElement).value;

    this.setState({
      todoDetail: detail
    });
  };

  render() {
    const todoDetail = this.state.todoDetail || {};
    return (
      <div className="todo-item">
        <div className="control">
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            value={todoDetail.name}
            onChange={(evt: any) => this.handleChange(evt, 'name')}
            autoComplete="off"
            name="name"
          />
        </div>
        <div className="control">
          <label htmlFor="content">Content</label>
          <br />
          <textarea
            value={todoDetail.content}
            onChange={(evt: any) => this.handleChange(evt, 'content')}
            name="content"
            rows={5}
            cols={30}
          />
        </div>
        <button onClick={this.onSaveTodo}>保存</button>
        <NavLink to="/">返回Todos</NavLink>
      </div>
    );
  }
}

const injector = {
  inject: todoService.detail$,
  mapToProps: (t: TodoItem) => ({ todoDetail: t })
};
export default connect([injector])(withRouter(TodoDetail));

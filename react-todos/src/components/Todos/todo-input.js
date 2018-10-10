import React from 'react';

export default class TodoInput extends React.Component {

    constructor (){
        super();
        this.state = {
            todo: ''
        };
    }

    handleChangeTodo (e){
        this.setState({ todo: e.target.value });
    }

    handleInsertTodo (e){
        const todo = this.state.todo;
        if (e.keyCode === 13) {
            if(todo.length === 0 || /^[ ]+$/.test(todo)){
                return alert('请输入不是空格的内容');
            }
            this.props.addTodo && this.props.addTodo(this.state.todo);
        }
    }

    render (){
        return (
            <div className="todo-input">
                <input 
                    autoFocus="autofocus"
                    placeholder="new todo"
                    type="text" value={this.state.todo}
                    onChange={this.handleChangeTodo.bind(this)}
                    onKeyDown={this.handleInsertTodo.bind(this)} />
            </div>
        );
    }
}
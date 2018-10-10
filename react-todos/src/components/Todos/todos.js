import React from 'react';
import TodoInput from './todo-input';
import Todo from './todo';
import './todos.css';

export default class Todos extends React.Component {

    constructor (){
        super();
        this.state = {
            todos: JSON.parse(this._todosStorage('get')),
            index: 0
        };
    }

    /**
     * 操作 todos 本地存储方法
     * @param {String} method 说明操作
     * @param {*} params 
     */
    _todosStorage (method, params){
        if (method === 'get' || method === 'remove') {                     
            let data = localStorage[method + 'Item']('REACT_TODOS_DATA');
            return data || '[]';
        }
        
        params && localStorage[method + 'Item']('REACT_TODOS_DATA', JSON.stringify(params));
    }

    // 监听数据变动 就重新存到 localstroage ```````
    componentDidUpdate (prevProps, prevState) {
        this._todosStorage('set', this.state.todos)
    }

    // 添加一项 ````````````````````````````````
    onAddTodo (content){
        const todos = this.state.todos;
        const len = todos.length;
        todos.push({
            id: len > 0 ? todos[len-1].id + 1 : 0, 
            content, 
            edit: false, 
            selectd: false
        });
        this.setState({ todos });        
    }

    /**
     * 用子组件传递过来的参数 来做对应的操作
     * @param {Number} id 唯一标识
     * @param {String} method 说明操作
     */
    onSend (id, method){
        const todos = this.state.todos;

        for (let i in todos){
            
            if (todos[i].id === id) {

                if ('delete' === method) {
                    todos.splice(i, 1);
                } else if ('selectd' === method) {
                    todos[i].selectd = !todos[i].selectd;
                } else if ('editTrue' === method) {
                    todos[i].edit = true;
                } else if (method.indexOf('editFalse') !== -1) {
                    todos[i].content = method.split('&')[1];
                    todos[i].edit = false;
                }
                break;
            }

        }

        this.setState({ todos });
    }

    // 全部选中 ``````````````````````````````
    handleSelectAll (){
        const todos = this.state.todos;
        for (let item of todos) { item.selectd = true; }
        this.setState({ todos });
    }

    // 将选中的 全部删除 ``````````````````````
    handleDelSelectAll (){
        const todos = this.state.todos.filter(item => !item.selectd)
        this.setState({ todos });
    }

    render (){
        return (
            <div className="todos">
                <h1>TODOS</h1>
                <TodoInput addTodo={this.onAddTodo.bind(this)} />
                <ul className="todo-list">
                    {this.state.todos.map((item)=> (
                        <Todo 
                        key={item.id} 
                        todo={item} 
                        send={this.onSend.bind(this)} />
                    ))}
                </ul>
                <div className="todos-footer">
                    <p className="count"><span>item {this.state.todos.length}</span></p>
                    <p className="btn">
                        <a href="javascrip:;" onClick={this.handleDelSelectAll.bind(this)}>clearComponent</a>
                        <a href="javascrip:;" onClick={this.handleSelectAll.bind(this)}>component</a>
                    </p>
                </div>
            </div>
        );
    }
}
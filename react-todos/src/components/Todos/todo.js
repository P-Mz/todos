import React from 'react';

export default class Todo extends React.Component {

    constructor (){
        super();
        this.state = {
            editContent: ''
        }
    }

    handleEditChange (e){
        this.setState({ editContent: e.target.value });
    }

    // 向父组件发送数据
    handleSend (id, method){
        if (method === 'editTrue') {
            this.setState({ editContent: this.props.todo.content });
        }
        this.props.send && this.props.send(id, method);
    }

    render (){
        const { id, content, edit, selectd } = this.props.todo;
        return (
            <li className="todo-item">
                {edit ? 
                    <p className="edit-todo">                        
                        <input 
                        type="text" 
                        value={this.state.editContent} 
                        autoFocus="autofocus"                
                        onChange={this.handleEditChange.bind(this)}
                        onBlur={this.handleSend.bind(this, id, `editFalse&${this.state.editContent}`)} />
                    </p>
                    :
                    <p 
                        onDoubleClick={this.handleSend.bind(this, id, 'selectd')}
                        className={`content ${selectd ? 'selectd' : ''}`}>
                        {content}
                    </p>
                }
                <p className="btn-wrap">                    
                    <span className="edit" onClick={this.handleSend.bind(this, id, 'editTrue')}>修改</span>
                    <span className="delete" onClick={this.handleSend.bind(this, id, 'delete')}>删除</span>
                </p>
            </li>
        );
    }
}
<template>
    <ul class="todo">
        <li v-for="(item,index) in todos" >
            <p 
                class="content"
                v-if="item.edit"                
                :class="item.select ? 'complete' : 'uncompleted'"
                @dblclick="handleChangeSelect(item.id)">
                {{ item.content }}
            </p>
            <p class="content edit" v-else>
                <input 
                    type="text" 
                    v-model="edit" 
                    @blur="handleEditBlur" 
                    @keydown.enter="handleEditBlur"
                    v-focus="!item.edit" />
            </p>
            <p class="handle" v-show="item.edit" >
                <a 
                    class="edit" 
                    @click="handleEditTodo(item.id)"
                    href="javascript: void(0);">
                    <i class="icon iconfont icon-edit"></i>
                </a>
                <a 
                    class="delete" 
                    @click="handleDeleteTodo(item.id)" 
                    href="javascript: void(0);">
                    <i class="icon iconfont icon-delete"></i>
                </a>                
            </p>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        todos: Array
    },
    data() {
        return {
            edit: '',
            editId: -1
        }
    },
    methods: {
        // 改变一个todo完成状态
        handleChangeSelect(id) {
            this.$emit('changeSelect', id);
        },
        // 删除一个todo
        handleDeleteTodo(id) {
            this.$emit('deleteTodo', id);
        },
        // 显示修改框
        handleEditTodo(id) {
            this.editId = id;
            for(let item of this.todos){
                if(item.id == id){
                    item.edit = false;
                    this.edit = item.content;
                    break;
                }
            }
        },
        // 离开焦点
        handleEditBlur() {            
            for(let item of this.todos){
                if(item.id == this.editId){
                    item.edit = true;                    
                    break;
                }
            }
            this.$emit('editTodo', {
                id: this.editId,
                content: this.edit
            });
        }
    },
    directives: {
        // 自动获取焦点
        focus: {
            inserted(el, {value}) {
                value&&el.focus();
            }
        }
    }
}
</script>

<style scoped>
.todo {
    padding: 0 10px;
}
.todo li {
    border: 1px solid #eee;
    margin: 6px 0; 
    overflow: hidden;
    box-sizing: border-box;
    padding-left: 10px;
}
.todo li p{
    line-height: 42px;
    float: left;
}

.todo li p.content {
    width: 328px;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.todo li p.content.edit {
    width: 100%;
}
.todo li p.content input {
    font-family: sans-serif;
    width: 100%;
    outline: none;
    border: none;
}
.todo li p.uncompleted{
    color: #111;
}
.todo li p.complete{
    color: #999;
    text-decoration: line-through;
}


.todo li p.handle{
    width: 100px;
    display: flex;
}
.todo li p.handle a {
    text-decoration: none;
    width: 50px;
    font-size: 12px;
    flex: 1;
    text-align: center;
}
.todo li p.handle a.edit{    
    color: #eee;
    background-color: #ff9800;
}
.todo li p.handle a.delete{   
    color: #eee;
    background-color: #FF0033;
}

</style>

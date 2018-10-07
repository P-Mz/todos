<template>
  <div class="todos-wrap">
    <h2>TODOS</h2>
    <todos-input @sendInput="onSendInput"/>
    <todos-itme 
        :todos="todos" 
        @changeSelect="onChangeSelect"
        @deleteTodo="onDeleteTodo"
        @editTodo="onEditTodo"
    />
    <div v-if="todos.length > 0" class="todos-footer">
        <span v-show="todos.length > 0">{{ todos.length }} items</span>
        <div class="btn">
            <a v-show="selectd" href="javascript: void(0);" @click="handleDeleteCompletedAll">clearComplete</a>
            <a v-show="items" href="javascript: void(0);" @click="handleCompleteAll">completeAll</a>
        </div>
    </div>
  </div>
</template>

<script>
import todo from './components/todo'
import input from './components/input'
export default {
  name: '',

  data() {
      return {
          todos: [],
          selectd: false,
          items: false
      }
  },

  components: {
    'todos-itme': todo,
    'todos-input': input    
  },

  // 初始化加载本地数据
  created() {
      const localTodos = localStorage.getItem('CHEN-TODOS');
      if(localTodos == null) return ;
      this.todos = JSON.parse(localTodos);
      this.items = this.todos.length > 0 ? true : false;
      for(let item of this.todos){
          if(item.select){
              this.selectd = true;
              break;
          }
      }        
  },  
  methods: {
      // 获取输入数据~~~~~~~~~~~~~~~~~~~
      onSendInput(content) {
          this.items = true;
          const len = this.todos.length;            
          this.todos.push({
              id: len > 0 ? this.todos[len - 1].id + 1 : 0,
              content,
              select: false,
              edit: true
          });
      },
      // 选中~~~~~~~~~~~~~~~~~~~~~~~~~~
      onChangeSelect(id) {
          for(let i=0,len=this.todos.length; i<len; i++){
              if(this.todos[i].id == id){
                  this.todos[i].select = !this.todos[i].select;
              }
          }
          // 显示移除已完成项按钮
          this.selectd = this.todos.filter(res=> res.select == true).length > 0 ? true : false;
      },
      // 删除~~~~~~~~~~~~~~~~~~~~~~~~~~
      onDeleteTodo(id) {
          this.todos = this.todos.filter(res=> res.id != id);
      },
      // 修改~~~~~~~~~~~~~~~~~~~~~~~~~~
      onEditTodo(obj) {
          const { id, content } = obj;
          for(let item of this.todos){
              if(item.id == id){
                  item.content = content;
                  item.select = false;
                  break;
              }
          }
      },
      // 全部标记为已完成~~~~~~~~~~~~~~~~~~~~~~~~~~
      handleCompleteAll() {
          this.todos.forEach(item => {
              item.select = true;
          });
          this.selectd = true;
      },
      // 删除所有完成项~~~~~~~~~~~~~~~~~~~~~~~~~~
      handleDeleteCompletedAll() {
          this.todos = this.todos.filter(res=> res.select == false);
          this.items = this.todos.length > 0 ? true : false;
          this.selectd = false;
      }
  },    
  watch: {
      // 监视 todos 变化存入 localStorage
      todos:{
          handler(curVal, oldVal) {
              localStorage.setItem('CHEN-TODOS', JSON.stringify(curVal));
          },
          deep: true
      }
  }
}
</script>

<style scoped>

.todos-wrap {
    width: 500px;
    padding: 20px;
    box-sizing: border-box;
    margin: 100px auto;
    background-color: #fff;
}
.todos-wrap h2{
    text-align: center;
    padding: 0 0 20px;
}
.todos-wrap .todos-footer {
    padding: 10px;
}
.todos-wrap .todos-footer .btn {
    float: right;
}
.todos-wrap .todos-footer .btn a,
.todos-wrap .todos-footer span {
    padding: 2px 5px;
    text-decoration: none;
    color: #aaa;
    background-color: #eee;    
}
</style>


<template>
    <div class="input">
        <input 
            type="text" 
            @keydown.enter="sendInput"
            v-model="todo" 
            placeholder="new todos"            
         />
    </div>
</template>

<script>
export default {
    data() {
        return {
            todo: ''
        }
    },
    methods: {
        sendInput (){
            if(this.todo.length <= 0 || /^[ ]+$/.test(this.todo)) {
                alert('请输入非空格的内容')
                return false;
            }
            this.$emit('sendInput', this.todo);
            this.todo = '';
        }
    }
}
</script>

<style scoped>
.input input {
    display: block;
    margin: auto;
    width: 90%;
    height: 16px;
    padding: 10px;
    font-family: sans-serif;
    outline: none;
    margin-bottom: 15px;
}
</style>

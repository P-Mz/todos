<template>
    <div id="app">
        <todos />
    </div>
</template>

<script>
import todos from './components/Todos/todos';

export default {
    name: 'app',
    
    components: { todos }
}
</script>

<style>

html,body,div,p,h1,h2,h3,h4,h5,h6,img,input,ul,li {
    margin: 0;
    padding: 0;
}
body{
    font-size: 14px;
    background-color: #eee;
}
ul li{
    list-style: none;
}
</style>

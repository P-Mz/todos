const util = require('../../utils/util.js');

Page({
    data: {
        todoText: '',
        todoData: [],
        selectAll: false,
        unCleaercomplete: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        // 获取本地存储
        let StorageTodoData = wx.getStorageSync('TODOS');
        let todoData = [];
        if (StorageTodoData){
            todoData = JSON.parse(StorageTodoData);
            this.setData({ todoData });
        }
        
        // 数数有多少 代办事项
        this._unCleaercompleteNumber();

        // 全选判断
        const ifSelectAll = todoData.filter((item) => !item.select);
        let selectAll = ifSelectAll.length == 0 ? true : false;
        this.setData({ selectAll });
    },    
    _unCleaercompleteNumber (){
        let unCleaercomplete = this.data.unCleaercomplete;
        for(const todo of this.data.todoData){
            if (!todo.select){
                unCleaercomplete ++;
            }
        }
        this.setData({ unCleaercomplete });
    },
    //  通知页面更新 在保存到本地
    _setTodoStorage(setData){
        wx.setStorage({ key: 'TODOS', data: JSON.stringify(setData.todoData) });
        this.setData(setData);
    },
    // 存储 日志
    _setLogStorage (logType, content){
        let logs = wx.getStorageSync('LOGS');
        if (logs) logs = JSON.parse(logs);
        let log = {
            logType,
            content,
            time: util.formatTime(new Date())
        }
        logs.push(log);
        wx.setStorage({ key: 'LOGS', data: JSON.stringify(logs) });
    },
    // 输入框 文本绑定 
    handleInputChange (e){
        const todoText = e.detail.value;
        this.setData({ todoText });
    },
    // 添加一条 数据
    handleAddTodo (){
        // 获取 todoData 数据
        const todoData = this.data.todoData;
        let text = this.data.todoText;

        // 在 追加一条进去
        todoData.push({ id: Math.random(), text, select: false, change: false });

        // 通知页面更新 添加新数据进来后 是没有选中的 所以就将 选中全部换成 不选中       
        this._setTodoStorage({
            todoData,
            selectAll: false,
            unCleaercomplete: this.data.unCleaercomplete + 1
        });
        this._setLogStorage('INSERT', text);
        
    },
    // 删除一条 数据
    handleRemoveTodo (e){
        // 获取 索引
        let index = e.target.dataset.index;
        // 根据 index 过滤一下 todoData
        const deleteOptionTodo = this.data.todoData.filter((item) => item.id == index);
        const todoData = this.data.todoData.filter((item) => item.id != index);
        
        let unCleaercomplete = this.data.unCleaercomplete > 0 ? this.data.unCleaercomplete -1 : 0 ;
        // 重新 通知页面更新        
        this._setTodoStorage({ todoData, unCleaercomplete });    

        // todoData 选中是全都被删除后 将全选取消
        (this.data.todoData.length == 0) && this.setData({ selectAll: false });
        
        this._setLogStorage('DELETE', deleteOptionTodo[0]['text']);

    },
    // 修改 某一条数据
    handleBlurChangeTodo(e) {
        // 获取 索引
        let index = e.target.dataset.index;
        let previousText = '';
        let currentText = e.detail.value;      
        const todoData = this.data.todoData;        

        for (const todo of todoData){
            if(todo.id === index){
                previousText = todo['text'];
                // 将 输入框隐藏 将修改的值设置给 todoData        
                todo['change'] = false;
                todo['text'] = currentText;
                break;
            }
        }        
        
        // 重新 通知页面更新
        this._setTodoStorage({ todoData });
        this._setLogStorage('UPDATE', `
            更新前: ${previousText}
            更新后: ${currentText}`
        );
    },
    // 显示修改文本框
    handleShowTodoChange(e) {
        // 获取 索引
        let index = e.target.dataset.index;
        const todoData = this.data.todoData;
        let deleteTodo = null;
        // 将 输入框全部隐藏
        for (const todo of todoData){            
            // 将当前长按的那个元素显示 输入文本框
            if(todo.id === index){
                todo['change'] = true;
            }else{
                todo['change'] = false;
            }
        }
        
        // 重新 通知页面更新        
        this._setTodoStorage({ todoData });
    },
    // 选中 表示已完成的事情
    handleSeleteTodo (e){
        // 获取 索引
        let index = e.target.dataset.index;
        // 获取 todoData
        const todoData = this.data.todoData;
        // 遍历 todoData
        for (const todo of todoData){
            // 判断 todo的id 是否等于 页面上传过来的 索引
            if (todo.id == index) todo.select = !todo.select;
        }

        // 全选判断
        const ifSelectAll = todoData.filter((item) => !item.select);
        let selectAll = ifSelectAll.length == 0 ? true : false;
       
        // 通知页面        
        this._setTodoStorage({
            todoData,
            selectAll,
            // 根据 ifSelectAll 的长度来
            unCleaercomplete: ifSelectAll.length
        });
    },
    // 选中 所有表示所有已完成
    handleSeleteAllTodo (e){
        // 获取 todoData
        const todoData = this.data.todoData;
        // 遍历 todoData 将所以 todo 里面的 select 都等于 false|true
        for (const todo of todoData) {
            todo.select = this.data.selectAll ? false : true;
        }
        // 在将 selectAll 取反
        let selectAll = !this.data.selectAll;
        // 改变未完成数 全选中就等于零 不全选中就等于 todoData.length;
        let unCleaercomplete = selectAll ? 0 : todoData.length;

        // 在通知 页面        
        this._setTodoStorage({
            todoData,
            selectAll,
            unCleaercomplete
        });
    },
    // 清除完成
    handleClearComplete (){
        const deleteTodo = this.data.todoData.filter((item) => item.select);
        const todoData = this.data.todoData.filter((item) => !item.select);

        // 通知 页面        
        this._setTodoStorage({ todoData, selectAll: false });
        
        for (const todo of deleteTodo){
            this._setLogStorage('DELETE', todo['text']);
        }
    }
})
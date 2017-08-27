
// log
var log = function() {
    console.log.apply(console, arguments);
}


// 动态插入div 替换html
//    首先提交ajax请求 删除div 标签
//    发送ajax 请求插入自制html
//
//

//  按索引分割字符串
var substr = function(s,start, end) {
    return s.slice(start, end)
}

// 实时变化可输入字数
var textNumber = function() {
    $('textarea').on('keyup', function(){
        var len = $('textarea').val().length
        if (len >= 140) {
            $(this).val(substr($(this).val(),0, 140))
            $(this).css("disabled","disabled")
        }
        $('.text-number').html(140 - len)
    })
}

// 更换头像
var changeAvatar = function() {
    // log('changeAvatar')
    $('.avatar').on('click', '.avatar-img', function(event){
        var index = $(this).index()
        // log('第几张头像',index+1)
        result = index + 1
    })
}


// 添加 头像
var bindAddImg = function() {
    $.each(imgarray, function(i,e){
        // log('element', e)
        var img = `<img class='avatar-img' src=${e} alt="" />`
        // log('测试 添加头像',img)
        $('.avatar').append(img)
    })
    log('头像加载成功--->',$('.avatar'))
}


// 点击 添加todo
var bindEventAdd = function() {
    $('.add-button').on('click', function(){
        var task = $('textarea').val()
        if (!result) {
            alert('请选择头像')
        }else {
            var img = `<img src="image/${result}.jpg" alt="" />`
            var todo = {
                img: img,
                task: task,
                time: currentTime(),
            }
            todoList.push(todo)
            insertTodos(todo)
            saveTodos()
        }
    })
}

// 删除 更新todo
var bindEventButton = function() {
    $('.todo-container').on('click', '.delete-button', function(event){
        var index = $(this).closest('.todo-cell').index()
        $(this).closest('.todo-cell').remove()
        todoList.splice(index, 1)
        saveTodos()
    })
    $('.todo-container').on('click', '.edit-button', function(event){
        var p = $(this).closest('.todo-cell').find('.todo-word')
        p.attr("contenteditable",true)
        p.focus()
    })
}


// 按下回车和失去焦点事件
var bindEventEnter = function() {
    var todoContainer = $('.todo-container')
    // 按下回车 保存todo
    todoContainer.on('keydown', '.todo-word', function(event){
        //log('按下回车')
        if (event.key === 'Enter') {
            event.preventDefault()
            event.target.blur()
            $(event.target).attr('contenteditable', false)
            var index = $(this).closest('.todo-cell').index()
            //log('失去焦点 this', $(this) )
            todoList[index].task = $(this).html()
            saveTodos()
        }
    })
    //失去焦点  保存todo
    todoContainer.on('blur', '.todo-word', function(event){
        //log('失去焦点 event.target', event.target)
        $(event.target).attr('contenteditable', false)
        $(this).closest('.todo-cell').task = $(this).html()
        saveTodos()
    })
}




// 保存todo
var saveTodos = function() {
    // log('save',todoList)
    var s = JSON.stringify(todoList)
    localStorage.todoList = s
}

// 加载todo
var loadTodos = function() {
    // log('load')
    var s = localStorage.todoList
    return JSON.parse(s)
}


// 创建todo
var temptodo = function(todo) {
    var t = `
    <div class="todo-cell">
        ${todo.img}
        <div class="todo-right">
            <p class="todo-word">${todo.task}</p>
            <div class="menu-button">
                <span class="time">${todo.time}</span>
                <!-- <button class="complete-button" type="button" >完成</button> -->
                <button class="edit-button" type="button">更新</button>
                <button class="delete-button" type="button" >删除</button>
            </div>
        </div>
    </div>
    `
    return t
}

// 插入todo
var insertTodos = function(todo) {
    var t = temptodo(todo)
    // log('插入todo-container的元素')
    $('.todo-container').append(t)
}


// 时间函数
var currentTime = function() {
    var d = new Date()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var timeString = `${month}/${date} ${hours}:${minutes}:${seconds}`
    return timeString
}


// 加载todo
var initTodos = function() {
    todoList = loadTodos()
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        insertTodos(todo)
    }
    //log('加载后的todo--->',$(".todo-container"))
}

var bindEvents = function() {
    textNumber()
    bindAddImg()
    changeAvatar()
    bindEventAdd()
    bindEventButton()
    bindEventEnter()
}

var result
// 创建todo列表
var todoList =[]
// 头像素材数组
var imgarray = ["image/1.jpg","image/2.jpg","image/3.jpg","image/4.jpg","image/5.jpg","image/6.jpg","image/7.jpg","image/8.jpg"]


var __main = function() {
    initTodos()
    bindEvents()
}
 __main()
/*



*/

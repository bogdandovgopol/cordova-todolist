var todoListArray = [];

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        // this.fetchToDoListData();
        listenToAddButtonClick();

    },

};

app.initialize();

function listenToAddButtonClick() {
    $("#addTodo").click(function () {
        var todoText = $("#todoTxt").val();
        todoListArray.push({title: todoText, done: false});
        // window.localStorage.setItem("todoList", todoListArray);

        fetchToDoListData();
    });
}

function fetchToDoListData() {
    console.log(JSON.stringify(todoListArray));
    var list = $('#todoList');

    list.empty();

    todoListArray.forEach(function (item, i) {
        var li = '<li class="item" data-id="' + i + '"><a class="item-text">' + item.title + '</a><button data-id="' + i + '">Done</button><button onclick="removeItemFromToDoList(' + i + ')">Remove</button></li>';
        list.append(li);
    })
}

function removeItemFromToDoList(index) {
    todoListArray.splice(index, 1);
    fetchToDoListData();
}

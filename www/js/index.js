let todoListStorage = window.localStorage.getItem("todoList") ?? window.localStorage.setItem("todoList", JSON.stringify([{
    title: "test",
    done: false
}]));
let todoListArray = JSON.parse(todoListStorage);

let app = {
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
        fetchToDoListData();
        listenToAddButtonClick();

    },

};

app.initialize();

function listenToAddButtonClick() {
    $("#addTodo").click(function () {
        var todoText = $("#todoTxt").val();
        todoListArray.push({title: todoText, done: false});
        window.localStorage.setItem("todoList", JSON.stringify(todoListArray));

        fetchToDoListData();
    });
}

function fetchToDoListData() {
    let list = $('#todoList');

    list.empty();

    todoListArray.forEach(function (item, i) {

        let done = "not-done";
        let doneBtn = '<button class="btn btn-success ml-1 mt-sm-1" onclick="markAsDone(' + i + ')">Done</button>';
        let removeBtn = '<button class="btn btn-danger ml-1 mt-sm-1" onclick="removeItemFromToDoList(' + i + ')">Remove</button>';

        //check if item is already done
        if (item.done === true) {
            done = "done";
            doneBtn = "";
        }

        //action button group
        let actionBtns = '<div class="text-center">' + doneBtn + removeBtn + '</div>';

        //create list item and append
        let li = '<li class="list-group-item d-flex justify-content-between align-items-center item">' +
            '<a class="item-text ' + done + '">' + item.title + '</a>' +
            actionBtns +
            '</li>';
        list.append(li);
    })
}

function removeItemFromToDoList(index) {
    todoListArray.splice(index, 1);
    window.localStorage.setItem("todoList", JSON.stringify(todoListArray));
    fetchToDoListData();
}

function markAsDone(index) {
    todoListArray[index].done = true;
    window.localStorage.setItem("todoList", JSON.stringify(todoListArray));
    fetchToDoListData();
}

//variables
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
        displayToDoList();
        listenToAddButtonClick();
    },

};

app.initialize();

function listenToAddButtonClick() {
    $("#addTodo").click(function () {
        //get input value
        var todoText = $("#todoTxt").val();
        //push value to the array
        todoListArray.push({title: todoText, done: false});
        //save array to the local storage
        window.localStorage.setItem("todoList", JSON.stringify(todoListArray));

        //re-render todoList items
        displayToDoList();
    });
}

function displayToDoList() {
    //get html todoList
    let list = $('#todoList');

    //make sure list is empty by emptying it
    list.empty();

    //check if todoList array is empty
    if (todoListArray.length < 1) {
        //create placeholder list item
        let li = '<li class="list-group-item text-center">' +
            '<span class="item-text">List is empty</span>' +
            '</li>';

        //append to the list
        list.append(li);
        return;
    }

    //fetch through todoList array
    todoListArray.forEach(function (item, i) {

        //UI elements
        let done = "not-done";
        let doneBtn = '<button class="btn btn-success ml-1 mt-sm-1" onclick="markAsDone(' + i + ')"><i class="fas fa-check"></i></button>';
        let removeBtn = '<button class="btn btn-danger ml-1 mt-sm-1" onclick="removeItemFromToDoList(' + i + ')"><i class="fas fa-times"></i></button>';

        //check if item is already done
        if (item.done === true) {
            done = "done";
            doneBtn = "";
        }

        //action button group
        let actionBtns = '<div class="text-center">' + doneBtn + removeBtn + '</div>';

        //create list item
        let li = '<li class="list-group-item d-flex justify-content-between align-items-center item">' +
            '<span class="item-text ' + done + '">' + item.title + '</span>' +
            actionBtns +
            '</li>';

        //append to the list
        list.append(li);
    })
}

function removeItemFromToDoList(index) {
    navigator.notification.confirm(
        'Are you sure you want to remove this item?',
        function (buttonIndex) {
            onRemoveConfirm(index, buttonIndex);
        },
        'Remove Item',
        ['Yes', 'No']
    );
}

function onRemoveConfirm(itemIndex, buttonIndex) {
    if (buttonIndex === 1) {
        //remove 1 item from list
        todoListArray.splice(itemIndex, 1);

        //save new array to the local storage
        window.localStorage.setItem("todoList", JSON.stringify(todoListArray));

        //re-render todoList items
        displayToDoList();
    }
}

function markAsDone(index) {
    //edit item and save to the local storage
    todoListArray[index].done = true;
    window.localStorage.setItem("todoList", JSON.stringify(todoListArray));

    //re-render todoList items
    displayToDoList();
}

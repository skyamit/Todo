
class Todo{
    constructor(val, stat){
        this.val = val;
        this.stat = stat;
    }
}

var arr = [new Todo("first Task",false),new Todo("Second Task",false),new Todo("Third Task",true),new Todo("Fourth Task",true), new Todo("Fifth Task",false),new Todo("Sixth Task",true)];
var input = document.getElementById("input");
var todos = document.getElementById("todos");
var update = document.getElementsByName("update");
var deletee = document.getElementsByName("delete");
var taskcount = document.getElementById("taskcount");

var all = document.getElementById("all");
var uncomplete = document.getElementById("uncomplete");
var completed = document.getElementById("completed");

var curr = 0;

callAll();


function getAll(){
    curr = 0;
    callAll();
}

function getDone(){
    curr = 1;
    callAll();
}

function getPending(){
    curr = 2;
    callAll();
}

function getD(){
    if(arr.length === 0){
        todos.innerHTML = '<div class="center red">'+
                            '<h4>No Task Available</h4>'+
                        '</div>';
    }
    else{
        todos.innerHTML = "";
        for(var e=arr.length-1; e>=0; e--){
            if(!arr[e].stat)
                continue;

            var image = '<img name="update" src="/images/circle.png" class="icon1 update" id="'+e+'"/>';
            if(arr[e].stat){
                image ='<img name="update" src="/images/circletick.png" class="icon1 update" id="'+e+'"/>';
            }
            var todo = '<div class="oneTodo bg">'+
                            '<div class="left">'+
                            image+
                            '<h5>'+arr[e].val+'</h5>'+
                            '</div>'+
                            '<div class="right">'+
                            '<img name="delete" src="/images/cancel.png" class="icon1 delete" id="'+e+'"/>'+
                            '</div>'+
                        '</div>';
            todos.innerHTML += todo;
        }
    }
}

function getP(){
    if(arr.length === 0){
        todos.innerHTML = '<div class="center red">'+
                            '<h4>No Task Available</h4>'+
                        '</div>';
    }
    else{
        todos.innerHTML = "";
        for(var e=arr.length-1; e>=0; e--){
            if(arr[e].stat)
                continue;

            var image = '<img name="update" src="/images/circle.png" class="icon1 update" id="'+e+'"/>';
            if(arr[e].stat){
                image ='<img name="update" src="/images/circletick.png" class="icon1 update" id="'+e+'"/>';
            }
            var todo = '<div class="oneTodo bg">'+
                            '<div class="left">'+
                            image+
                            '<h5>'+arr[e].val+'</h5>'+
                            '</div>'+
                            '<div class="right">'+
                            '<img name="delete" src="/images/cancel.png" class="icon1 delete" id="'+e+'"/>'+
                            '</div>'+
                        '</div>';
            todos.innerHTML += todo;
        }
    }
}

function getA(){
    if(arr.length === 0){
        todos.innerHTML = '<div class="center red">'+
                            '<h4>No Task Available</h4>'+
                        '</div>';
    }
    else{
        todos.innerHTML = "";
        for(var e=arr.length-1; e>=0; e--){
            var image = '<img name="update" src="/images/circle.png" class="icon1 update" id="'+e+'"/>';
            if(arr[e].stat){
                image ='<img name="update" src="/images/circletick.png" class="icon1 update" id="'+e+'"/>';
            }
            var todo = '<div class="oneTodo bg">'+
                            '<div class="left">'+
                            image+
                            '<h5>'+arr[e].val+'</h5>'+
                            '</div>'+
                            '<div class="right">'+
                            '<img name="delete" src="/images/cancel.png" class="icon1 delete" id="'+e+'"/>'+
                            '</div>'+
                        '</div>';
            todos.innerHTML += todo;
        }
    }
}


function add(){
    if(input.value === ""){
        return;
    }
    t = new Todo(input.value, false);
    arr.push(t);
    input.value = "";
    callAll();
}

function completeAll(){
    for(var i=0; i<arr.length; i++){
        arr[i].stat = true;
    }
    callAll();
}

function clearCompleted(){
    var newArr = [];
    for(var i=0; i<arr.length; i++){
        if(!arr[i].stat)
            newArr.push(arr[i]);
    }
    arr = newArr;
    callAll();
}

function getTaskLeft(){
    var count = 0;
    for(var i of arr){
        if(i.stat == false)
            count++;
    }
    taskcount.innerText = count+" Tasks left";
}


function deleteTodo(e){
    var newArr = [];
    for(var i=0; i<arr.length; i++){
        if(i != e)
            newArr.push(arr[i]);
    }
    arr = newArr;
}

todos.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        var document = e.target;
        deleteTodo(document.id);
        callAll();
    }

    if(e.target.classList.contains('update')) {
        var document = e.target;
        if(arr[document.id].stat == true){
            document.src = "/images/circle.png";
            arr[document.id].stat = false;
        }
        else{
            document.src = "/images/circletick.png";
            arr[document.id].stat = true;
        }
        callAll();
    }
});

function callAll(){
    if(curr == 0){
        getA();
        all.classList.add("bold");
        completed.classList.remove("bold");
        uncomplete.classList.remove("bold");
    }
    if(curr == 1){
        getD();
        completed.classList.add("bold");
        all.classList.remove("bold");
        uncomplete.classList.remove("bold");
    }
    if(curr == 2){
        getP();
        uncomplete.classList.add("bold");
        all.classList.remove("bold");
        completed.classList.remove("bold");
    }

    getTaskLeft();
}
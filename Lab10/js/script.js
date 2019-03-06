/*eslint-env global*/

//GLOBAL VARIABLES
var storage;
var list = "";
var task; 
var tasks = [];
/* you have to store tasks in an array (not directly) into Web Storage */

//GET DOM ELEMENTS
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};
//DISPLAY TASK LIST
function displayTaskList() {
    "use strict";
    //IF THERE ARE NO TASKS IN TASKS ARRAY, CHECK STORAGE
    if (tasks.length === 0) {
        //GET TASKS FROM STORAGE OR EMPTY STRING
        storage = localStorage.getItem("tasks") || ""; //give me the tasks array that exists within storage, but if it is empty, give me nothing
        console.log(storage);
        
        if (storage.length > 0) {
            tasks = storage.split("|");
        }
    }
    //IF THERE ARE TASKS IN THE ARRAY, SORT AND CREATE TASKS STRING
    if (tasks.length > 0) {
        tasks.sort();
        list = tasks.join("\n");
    }
    //DISPLAY TASK LIST
    $("task_list").value = list;
}

//ADD A TASK
function addToTaskList() {
    "use strict";
    //taking the value of the task text box and storing it into our variable called task
    task = $("task");
    if (task.value === "") {
        window.alert("Please enter a task.");
    } else {
        //ADD TASK TO ARRAY AND ADD TO LOCAL STORAGE
        tasks.push(task.value);
        localStorage.tasks = tasks.join("|"); //to join tasks with a | (pipe)
        task.value = "";
        displayTaskList();
    }
}


//CLEAR TASK LIST
function clearTaskList() {
    "use strict";
    tasks.length = 0;
    localStorage.tasks = "";
    $("task_list").value = "";
}

//WIRE UP EVENT HANDLERS AND DISPLAY TASK LIST
window.addEventListener("load", function () {
    "use strict";
    $("add_task").addEventListener("click", addToTaskList);//see html for string p/u
    $("clear_tasks").addEventListener("click", clearTaskList);
    displayTaskList();
});

let submit = document.querySelector(".input span") ;
let input = document.querySelector("input")
let taskContainer = document.querySelector(".list")

let arrayOfTasks =[];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}


getDataFromLocalStorage()

input.onkeyup= function(e){
  if(e.key==="Enter"){
    submit.click()
  }
}


submit.onclick = function(){
  if(input.value !==""){
    addTaskToArray(input.value)
    input.value ="";
  }

}

function addTaskToArray(taskText){
  let task = {
    id:Date.now(),
    title:taskText,
    completed:false
  }
  arrayOfTasks.push(task);
  addElementToPage(arrayOfTasks)
  addDataToLocalStorageFrom(arrayOfTasks);
}


function addElementToPage(arrayOfTasks){
  taskContainer.innerHTML = "";
  arrayOfTasks.forEach((task)=>{
    let div = document.createElement("div")
    div.className="task";
    if(task.completed){
      div.className="task check";
    }
    div.setAttribute("data-id",task.id)

    let trueSpan = document.createElement("span");

    trueSpan.className = "true";

    let falseSpan = document.createElement("span");

    falseSpan.className = "false";

    let text = document.createTextNode(task.title)

    trueSpan.innerHTML = `<i class="fa-solid fa-check"></i>`;
    falseSpan.innerHTML = `<i class="fa-solid fa-trash"></i>`;


    div.appendChild(text);
    div.appendChild(trueSpan);
    div.appendChild(falseSpan);
    taskContainer.appendChild(div);

  })
}

taskContainer.onclick = function(e){
  if(e.target.classList.contains("false")){
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.classList.add("trash");
    setTimeout(() => {
    e.target.parentElement.remove();
    }, 500);
  }
  if(e.target.classList.contains("true")){
    e.target.parentElement.classList.toggle("check");
    toggleStatusTaskWith(e.target.parentElement.getAttribute("data-id"))
  }
  
}




function  addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage(){
  let data =  window.localStorage.getItem("tasks")
  if(data){
    let task = JSON.parse(data)
    addElementToPage(task)
  }
}

function deleteTaskWith(taskId){
  arrayOfTasks = arrayOfTasks.filter((task)=>task.id != taskId)
  addDataToLocalStorageFrom(arrayOfTasks)
}


function toggleStatusTaskWith(taskId){
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
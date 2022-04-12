const new_task = document.querySelector(".newlist")
const new_list = document.querySelector(".middle")
const filters = document.querySelectorAll(".ul li a")
const task = document.querySelector(".text")
const active = document.querySelector("#active")
const complete = document.querySelector("#completed")
const selectall = document.querySelector(".selectall")
const clearcompleted = document.querySelector(".clearcompleted")
const bottom = document.querySelector(".bottom")

let todos = JSON.parse(localStorage.getItem("list_task"))
document.querySelector("#active").addEventListener('click', function() {
    showtodolist("active")
})
document.querySelector("#all").addEventListener('click', function() {
    showtodolist("all")
})
document.querySelector("#completed").addEventListener('click', function() {
    showtodolist("completed")
})

function count_active() {
    let count = todos.length
    let count_check = 0
    todos.forEach(data => {
        if (data.complete === "completed") {
            count -= 1
            count_check += 1
        }
    })
    document.querySelector("strong").innerHTML = count
    if (count == 0 && count_check == 0) {
        bottom.setAttribute("style", "display: none")
        selectall.setAttribute("style", "display: none")
    } else {
        bottom.removeAttribute("style", "display: none")
        selectall.removeAttribute("style", "display: none")
    }
}

function showtodolist(event) {
    let html = "";
    if (todos) {
        todos.forEach((data, id) => {
            let iscomplete = data.complete
            if (iscomplete === "completed") {
                iscomplete = "checked"
            } else {
                iscomplete = ""
            }
            if (event === data.complete || event === "all") {
                html += `
              <div class="to-do">
                <input type="text" class="text ${iscomplete}" id = "${id}" value = "${data.task}" ondblclick = "editlist(this)" readonly>
                <input type="checkbox" class="checkbox" id = "${id}" ${iscomplete} onclick = "checkstatus(this)" >
                <button class="delete" onclick = "deletelist()">Delete</button>
              </div>`
            }
        })
        new_list.innerHTML = html
        count_active()
    }
}

showtodolist("all");

selectall.addEventListener('click', function() {
    if (selectall.classList.contains("all") === false) {
        todos.forEach(data => {
            data.complete = "completed";
        })
        selectall.classList.add("all");
    } else {
        todos.forEach(data => {
            data.complete = "active";
        })
        selectall.classList.remove("all");
    }
    localStorage.setItem("list_task", JSON.stringify(todos));
    showtodolist("all")
    count_active()
})

function checkstatus(selectask) {
    let task_check = selectask.parentElement.firstElementChild;
    if (selectask.checked) {
        task_check.classList.add("checked");
        todos[selectask.id].complete = "completed";
        count_active()
    } else {
        task_check.classList.remove("checked");
        todos[selectask.id].complete = "active";
        count_active()
    }
    localStorage.setItem("list_task", JSON.stringify(todos))
}

function deletelist(index) {
    let localitem = JSON.parse(localStorage.getItem("list_task"))
    todos.splice(index, 1)
    localStorage.setItem("list_task", JSON.stringify(todos))
    showtodolist("all")

}

function editlist(e) {
    let edit = e.parentElement.firstElementChild
    edit.removeAttribute("readonly", "readonly")
    edit.addEventListener('mouseout', function() {
        edit.setAttribute("readonly", "readonly")
        if (edit.value.trim() === "") {
            alert("please fill the edit")
        } else {
            todos[e.id].task = edit.value
        }
        localStorage.setItem("list_task", JSON.stringify(todos))
    })
}

clearcompleted.addEventListener('click', function() {
    const todos2 = todos.filter(todo => (todo.complete !== 'completed'));
    todos = todos2;
    localStorage.setItem("list_task", JSON.stringify(todos))
    showtodolist("all")
})

new_task.addEventListener('keyup', function(event) {
    let input_value = new_task.value.trim()
    if (event.key == "Enter" && input_value == "") {
        alert("please fill in task input")
    } else if (event.key === "Enter" && input_value !== "") {
        if (!todos) {
            todos = []
        }
        let list_todo = {
            task: input_value,
            complete: "active",
        }
        todos.push(list_todo)
        localStorage.setItem("list_task", JSON.stringify(todos))
        new_task.value = "";
        showtodolist("all");
    }
})
const input = document.querySelector("#newlist");
const new_list = document.querySelector(".middle");
const container = document.querySelector(".container");
const class_input = ["text", "complete", "checkbox"]
const id_input = ["check", "checked"]

function rmattb() {
    new_input.removeAttribute("style");
    new_button.removeAttribute("style");
    new_checkbox.removeAttribute("style");
}

function newsubmit() {
    const list = input.value;
    if (list === "") {
        alert("Bạn hãy nhập công việc cần làm");
        return;
    }
    // creat new div
    const new_div = document.createElement("div");
    new_div.classList.add("to-do");
    new_list.appendChild(new_div);

    // creat new input
    const new_input = document.createElement("input");
    new_input.classList.add(class_input[0]);
    new_input.setAttribute("id", id_input[0]);
    new_input.type = class_input[0];
    new_input.value = list;
    new_input.setAttribute("readonly", "readonly");
    new_div.appendChild(new_input);

    // creat new input checkbox
    const new_checkbox = document.createElement("input");
    new_checkbox.type = class_input[2]
    new_checkbox.classList.add(class_input[2]);
    new_div.appendChild(new_checkbox);

    // creat new button
    const new_button = document.createElement("button");
    new_button.classList.add("delete");
    new_div.appendChild(new_button);
    new_button.innerText = "Del";

    input.value = "";

    //amount of todo
    var count = document.querySelectorAll("#check");
    document.querySelector("strong").innerHTML = count.length;
    document.querySelector(".bottom").setAttribute("style", "display: inline-block");

    // remove todo
    new_button.addEventListener('click', removelist);

    function removelist() {
        new_list.removeChild(new_div);
        var newcount = document.querySelectorAll(".to-do");
        document.querySelector("strong").innerHTML = newcount.length;
        if (newcount.length == 0) {
            document.querySelector(".bottom").setAttribute("style", "display: none");
        }
    }

    // edit todo
    new_input.addEventListener('dblclick', function() {
        new_input.removeAttribute("readonly");
    });
    new_input.addEventListener('mouseout', function() {
        new_input.setAttribute("readonly", "readonly");
    });

    // clear todo completed
    document.querySelector(".clearcompleted").addEventListener('click', function() {
        if (new_input.classList[1] == class_input[1] && new_input.id == id_input[1]) {
            document.querySelector(".middle").removeChild(new_div)
        }
        var newcount = document.querySelector(".to-do");
        if (newcount.length == 0) {
            document.querySelector(".bottom").setAttribute("style", "display: none");
        }
    });

    // tick todo not complete or completed
    new_checkbox.addEventListener('click', function() {
        if (new_input.classList[0] === class_input[0] && new_input.id === id_input[0]) {
            new_input.setAttribute("id", id_input[1])
            new_input.classList.add(class_input[1]);
            new_checkbox.checked = true;
        } else if (new_input.classList[1] === class_input[1] && new_input.id === id_input[1]) {
            new_input.setAttribute("id", id_input[0]);
            new_input.classList.remove(class_input[1]);
            new_checkbox.checked = false;
        }
        var todo_done = document.querySelectorAll("#check");
        document.querySelector("strong").innerHTML = todo_done.length;

    });

    // show all todo
    document.querySelector("#all").addEventListener('click', function() {
        console.log(typeof(new_input.removeAttribute("style")))
        new_input.removeAttribute("style");
        new_button.removeAttribute("style");
        new_checkbox.removeAttribute("style");
    });

    // show todo active
    document.querySelector("#active").addEventListener('click', function() {
        if (new_input.classList[1] === class_input[1] && new_input.id === id_input[1]) {
            new_input.setAttribute("style", "display: none");
            new_button.setAttribute("style", "display: none");
            new_checkbox.setAttribute("style", "display: none");
        }
        if (new_input.classList[0] === class_input[0] && new_input.id === id_input[0]) {
            new_input.removeAttribute("style");
            new_button.removeAttribute("style");
            new_checkbox.removeAttribute("style");
        }
    });

    // show todo complete
    document.querySelector("#completed").addEventListener('click', function() {
        if (new_input.classList[0] === class_input[0] && new_input.id === id_input[0]) {
            new_input.setAttribute("style", "display: none");
            new_button.setAttribute("style", "display: none");
            new_checkbox.setAttribute("style", "display: none");
        }
        if (new_input.classList[1] === class_input[1] && new_input.id === id_input[1]) {
            new_input.removeAttribute("style");
            new_button.removeAttribute("style");
            new_checkbox.removeAttribute("style");
        }
    });
    let count_checked = document.querySelectorAll("input[checkbox]:checked").length
    document.querySelector(".choseall").addEventListener('click', function() {
        const task_num = document.querySelectorAll(".to-do")
        if (count_checked == task_num.length) {
            new_input.setAttribute("id", id_input[0]);
            new_input.classList.remove(class_input[1]);
            new_checkbox.checked = false
            count_checked = 0;
            document.querySelector("strong").innerHTML = task_num.length
            return
        }
        new_input.setAttribute("id", id_input[1]);
        new_input.classList.add(class_input[1]);
        new_checkbox.checked = true
        count_checked = document.querySelectorAll(".to-do").length
        document.querySelector("strong").innerHTML = 0
    })
}
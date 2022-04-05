const input = document.querySelector("#newlist");
const new_list = document.querySelector(".middle");
const container = document.querySelector(".container");

function newsubmit() {
    const list = input.value;
    if (list === "") {
        alert("Bạn hãy nhập công việc cần làm");
        return;
    }
    // Tao mot div moi
    const new_div = document.createElement("div");
    new_div.classList.add("to-do");
    new_list.appendChild(new_div);

    // Tao mot input moi
    const new_todo = document.querySelector(".to-do");
    var new_input = document.createElement("input");
    new_input.classList.add('text');
    new_input.type = 'text';
    new_input.value = list;
    new_input.setAttribute("readonly", "readonly");
    new_div.appendChild(new_input);

    // Tao mot button moi
    const new_button = document.createElement("button");
    new_button.classList.add("delete");
    new_div.appendChild(new_button);
    new_button.innerText = "X";

    input.value = "";

    //in ra so luong todolist
    var count = document.querySelectorAll(".to-do");
    document.querySelector("strong").innerHTML = count.length;
    document.querySelector(".bottom").setAttribute("style", "display: inline-block");

    // su kien xoa todolist
    new_button.addEventListener('click', removelist);

    function removelist() {
        new_list.removeChild(new_div);
        var newcount = document.querySelectorAll(".to-do");
        document.querySelector("strong").innerHTML = newcount.length;
        if (newcount.length == 0) {
            document.querySelector(".bottom").setAttribute("style", "display: none");
        }
    }

    // edit todolist
    new_input.addEventListener('dblclick', function() {
        new_input.removeAttribute("readonly");
    });
    new_input.addEventListener('mouseout', function() {
        new_input.setAttribute("readonly", "readonly");
    });

    // xoa tat cac cac list
    document.querySelector(".clearall").addEventListener('click', function() {
        document.querySelector(".middle").removeChild(new_div);
        document.querySelector(".bottom").setAttribute("style", "display: none");
    });

    // kiem tra list hoan thanh hay chua
    new_input.addEventListener('click', function() {
        if (new_input.classList == "text") {
            new_input.classList.replace("text", "complete");
            new_button.classList.replace("delete", "active");
        } else {
            new_input.classList.replace("complete", "text");
            new_button.classList.replace("active", "delete");
        }
    });
}
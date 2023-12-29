document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});
const fetchData = async () => {
    const response = await fetch(`/api/v1/todos`);
    const todos = await response.json();
    renderTodo(todos);
};
const renderTodo = (data) => {
    let tasks = document.getElementById("tasks");
    const dataRender = data.reverse().slice(0, 5)
    tasks.innerHTML = "";
    let renderHTML = ""
    dataRender.forEach(todo => {
        if (todo.completed == true) {
            renderHTML += `
            <div id=${todo.id}>
                <span class="small text-secondary">Content</span>
                <p style="text-decoration: line-through;">${todo.title}</p>
  
                <span class="options">
                    <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                    <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
                </span>
            </div>
        `;
        } else {
            renderHTML += `
            <div id=${todo.id}>
                <span class="small text-secondary">Content</span>
                <p >${todo.title}</p>
  
                <span class="options">
                    <i onClick="editTask(${todo.id})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                    <i onClick="deleteTask(${todo.id});createTasks()" class="fas fa-trash-alt"></i>
                </span>
            </div>
        `;
        }
    });

    tasks.innerHTML += renderHTML


    let pendingTasks = 0
    dataRender.forEach(todo => {
        if (todo.completed == false) {
            pendingTasks += 1
        }
    })
    document.querySelector(".pending-task").innerHTML = `You have ${pendingTasks} pending tasks`
}

const addNewTask = document.getElementById("addNew")

addNewTask.addEventListener('click', () => {
    const newContent = document.querySelector(".newContent").value

    if (newContent == "") {
        alert("Nội dung không được để trống")
    } else {
        const data = {
            "userId": 10,
            "id": 185,
            "title": newContent,
            "completed": false
        }
        postData("/api/v1/todos", data)
            .then(response => {
                alert('Thêm todo thành công');
                window.location.href = "/";
            })
            .catch(error => {
                console.error('Error adding question:', error);
            });
    }
})

const deleteTask = (id) => {
    deleteData(id)
        .then(response => {
            alert('Đã xoá todo');
            window.location.href = "/";
        })
        .catch(error => {
            console.error('Error adding question:', error);
        });
}
const postData = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}
const deleteData = (id) => {
    return fetch(`/api/v1/todos//${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

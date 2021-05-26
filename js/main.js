var service = new TaskList();
var validation = new Validation();



getEle = id => {
    return document.getElementById(id);
}

addTask = (item) => {
    let content = '';
    content += `
        <li>
            <span id="tittle"> ${item.textTodo} </span>

            <div class="buttons">
                <button class="remove" onclick="deleteTask('${item.id}')">
                    <i class="fa fa-trash-alt"></i>
                </button>
                
                <button class="complete" onclick="changeStatus('${item.id}')">
                 <i class="far fa-check-circle" style = "font-size: 1rem" id></i>
                    <i class="fas fa-check-circle" style="color: #25b99a; font-size: 1rem;"></i>
                </button>
            </div>
        </li>
        `

    return content;
}

createList = (arr) => {

    let contentTodo = '';
    let contentCompleted = '';

    let todoList = arr.filter((item) => {
        return item.status != 'completed';
    })


    if (todoList.length === 0) {
        getEle('todo').innerHTML = '';
    } else {
        todoList.map((item) => {

            contentTodo += addTask(item);
            getEle('todo').innerHTML = contentTodo;

        })
    }

    let completedList = arr.filter((item) => {
        return item.status === 'completed';
    })

    if (completedList.length === 0) {
        getEle('completed').innerHTML = "";
    } else {
        completedList.map((item) => {

            contentCompleted += addTask(item);
            getEle('completed').innerHTML = contentCompleted;

        })
    }
}


showListTask = () => {
   
    service.getListTaskApi()
        .then(result => {;
            createList(result.data);
        })
        .catch(error => {
            console.log(error)
        });
}

showListTask();



deleteTask = _id => {

    service.deleteTaskApi(_id)
        .then(() => {

            showListTask();

        })
        .catch(error => {
            console.log(error)
        });
}

addNewTask = (_task) => {

    service.addTaskApi(_task)
        .then(result => {

            showListTask();

        })
        .catch(error => {
            console.log(error)
        });

}

getEle('addItem').addEventListener('click', () => {

    let _textTodo = getEle('newTask').value;
    let _status = 'todo';

    let _task = new Task("", _textTodo, _status);


    let checkEmpty = validation.isEmpty(_textTodo);
    if (!checkEmpty) return;


    service.getListTaskApi()
        .then(result => {

            let checkNameShake = validation.isNameSake(_textTodo, result.data);
            if (!checkNameShake) return;
            addNewTask(_task);

        })
        .catch(error => {
            console.log(error);
        });

    getEle('newTask').value = '';
})

getEle('newTask').addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        getEle('addItem').click();
    }
})

getTaskById = _id => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            service.getTaskById(_id)
                .then((result) => {
                    resolve(result.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }, 1000)
    })
}


async function changeStatus(_id) {

    let task = await getTaskById(_id);

    if (task.status === 'todo') {
        task.status = 'completed';
    } else {
        task.status = 'todo';
    }

    service.updateTask(task)
        .then((result) => {
            
            showListTask();
        })
        .catch(error => {
            console.log(error)
        })

}


function TaskList(){
    this.listTask = [];

    TaskList.prototype.getListTaskApi = () => {

        return axios({
            url: "https://5fd46f2be9cda40016f5bf01.mockapi.io/api/todo",
            method: "GET",
        });
    }

    TaskList.prototype.deleteTaskApi = _id => {

        return axios({
            url: `https://5fd46f2be9cda40016f5bf01.mockapi.io/api/todo/${_id}`,
            method: "DELETE",
        });
    }

   
    TaskList.prototype.getTaskById = _id => {

        return axios({
            url: `https://5fd46f2be9cda40016f5bf01.mockapi.io/api/todo/${_id}`,
            method: "GET",
        });
    }

    TaskList.prototype.updateTask = task => {

        return axios({
            url: `https://5fd46f2be9cda40016f5bf01.mockapi.io/api/todo/${task.id}`,
            method: "PUT",
            data: task,
        });


    }


    TaskList.prototype.addTaskApi = newTask => {
        return axios({
            url: `https://5fd46f2be9cda40016f5bf01.mockapi.io/api/todo/`,
            method: "POST",
            data: newTask,
        });
    }

    

}


const { CreateTaskRequest, EditTaskRequest, DeleteTaskRequest, Task, Empty, Status } = require('./task_pb.js');
const { TaskServiceClient } = require('./task_grpc_web_pb.js');

const PORT = 8080;
const client = new TaskServiceClient('http://' + window.location.hostname + `:${PORT}`, null, null);

const form = document.getElementById('task-form');
const refreshButton = document.getElementById('refresh-button');
const tasksList = document.getElementById('task-list');
const sampleButton = document.getElementById('sample-data-button');
const editButton = document.getElementById('edit-button');
const deleteButton = document.getElementById('delete-button');
const cancelButton = document.getElementById('cancel-button');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalStatus = document.getElementById('modal-status');
const editModalStatus = document.getElementById('edit-modal-status');
const editButtonConfirm = document.getElementById('edit-button-confirm');
const editButtonCancel = document.getElementById('cancel-button-edit');
const deleteButtonConfirm = document.getElementById('delete-button-confirm');
const cancelButtonDelete = document.getElementById('cancel-button-delete');

let sampleIdx = 0;
const sampleTasks = [
    {
        title: "Network Physical Layer",
        description: "Understand the foundational aspects of the physical layer in networking, including transmission media, signal encoding, and physical topologies.",
        status: "OPEN"
    },
    {
        title: "Data Link Layer",
        description: "Explore the functions and protocols operating at the data link layer, such as framing, error detection, and MAC addressing.",
        status: "IN_PROGRESS"
    },
    {
        title: "Ethernet Switch Configuration. Virtual Networks. Link Aggregation",
        description: "Configure Ethernet switches, implement virtual networks for segmentation, and utilize link aggregation for improved bandwidth and redundancy.",
        status: "DONE"
    },
    {
        title: "Interaction between Network Layer and Data Link Layer. ARP Protocol",
        description: "Investigate the interaction between the network and data link layers, focusing on Address Resolution Protocol (ARP) for mapping IP addresses to MAC addresses.",
        status: "DONE"
    },
    {
        title: "IPv4 Protocol. Static Routing. VLSM Addressing",
        description: "Dive into IPv4 addressing, subnetting, and Variable Length Subnet Masking (VLSM), along with static routing configurations.",
        status: "IN_PROGRESS"
    },
    {
        title: "Advanced Static Routing. ICMP Protocol. Proxy-ARP Mechanism",
        description: "Explore advanced static routing techniques, ICMP protocol for network diagnostics, and the Proxy-ARP mechanism for proxying ARP requests.",
        status: "OPEN"
    },
    {
        title: "DHCP Protocol",
        description: "Master the Dynamic Host Configuration Protocol (DHCP) for automatic IP address allocation and network parameter distribution.",
        status: "OPEN"
    },
    {
        title: "Dynamic Routing. RIP Protocol",
        description: "Implement dynamic routing protocols such as RIP (Routing Information Protocol) for automatic route updates and network convergence.",
        status: "IN_PROGRESS"
    },
    {
        title: "Basics of IPv6. Basics of Transport Layer",
        description: "Gain an introductory understanding of IPv6 addressing and features, along with an overview of the functions of the transport layer in data transmission.",
        status: "DONE"
    }
];
let currentTask = null;

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const task = {title, description, status};
    createTaskHandler(task);
    form.reset();

});
refreshButton.addEventListener('click', (e) => {
    e.preventDefault();
    getAllTasksHandler();
});
sampleButton.addEventListener('click', (e) => {

    e.preventDefault();
    if (sampleIdx >= sampleTasks.length) {
        alert('No more sample tasks available!')
        return;
    }

    const sampleTask = sampleTasks[sampleIdx];
    sampleIdx += 1;

    document.getElementById('title').value = sampleTask.title;
    document.getElementById('description').value = sampleTask.description;
    document.getElementById('status').value = sampleTask.status;

});

// main modal
editButton.addEventListener('click', () => {
    $('#main-modal').modal('hide');
    $('#edit-modal').modal('show');
});
deleteButton.addEventListener('click', () => {
    $('#main-modal').modal('hide');
    $('#delete-modal').modal('show');
});
cancelButton.addEventListener('click', () => {
    $('#main-modal').modal('hide');
});

// edit modal
editButtonConfirm.addEventListener('click', () => {

    if (editModalStatus.value !== getStatus(currentTask.getStatus())) {
        $('#edit-modal').modal('hide');
        editTaskHandler(editModalStatus.value)
        getAllTasksHandler();
    }
    else {
        alert('Changes not detected')
    }

})
editButtonCancel.addEventListener('click', () => {
    $('#edit-modal').modal('hide');
});

// delete modal
deleteButtonConfirm.addEventListener('click', () => {
    $('#delete-modal').modal('hide');
    deleteTaskHandler();
    getAllTasksHandler();

});
cancelButtonDelete.addEventListener('click', () => {
    $('#delete-modal').modal('hide');
});

function createCard(task){

    const card = document.createElement('div');
    card.className = 'card';
    card.style.minWidth = '40rem';

    const content = document.createElement('div');
    content.className = 'content';

    const header = document.createElement('div');
    header.className = 'header';
    header.textContent = task.getTitle();

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = getStatus(task.getStatus());

    const description = document.createElement('div');
    description.className = 'description';
    description.textContent = task.getDescription();

    const options = document.createElement('div');
    options.className = 'options';
    options.style.position = 'absolute';
    options.style.top = '0.5rem';
    options.style.right = '0';

    const dotsIcon = document.createElement('i');
    dotsIcon.className = 'ellipsis vertical icon';
    dotsIcon.style.cursor = 'pointer';
    dotsIcon.onclick = () => {
        currentTask = task;
        openTaskModal(task);
    }

    card.append(content)
    content.appendChild(header);
    content.appendChild(meta);
    content.appendChild(description);
    options.appendChild(dotsIcon);
    content.appendChild(options);

    return card;

}

function preload() {
    getAllTasksHandler();
}

function getStatus(value) {
    switch (value) {
        case Status.OPEN:
            return 'OPEN';
        case Status.IN_PROGRESS:
            return 'IN PROGRESS';
        case Status.DONE:
            return 'DONE';
        default:
            return 'null';
    }
}

function openTaskModal() {

    const task = currentTask;
    modalTitle.textContent = task.getTitle();
    modalDescription.textContent = task.getDescription();
    modalStatus.textContent = getStatus(task.getStatus());
    $('#main-modal').modal('show');

}

function getEnumFromValue(value) {
    switch (value) {
        case 'OPEN':
            return Status.OPEN;
        case 'IN_PROGRESS':
            return Status.IN_PROGRESS;
        case 'IN PROGRESS':
            return Status.IN_PROGRESS;
        case 'DONE':
            return Status.DONE;
        default:
            return Status.OPEN;
    }
}

// handlers
function createTaskHandler(task){

    const { title, description, status } = task;

    const newTask = new Task();
    newTask.setTitle(title);
    newTask.setDescription(description);
    newTask.setStatus(getEnumFromValue(status));

    const createTaskRequest = new CreateTaskRequest();
    createTaskRequest.setTask(newTask)

    client.createTask(createTaskRequest, {}, (err, createTaskResponse) => {
        if (err) {
            console.log(`Unexpected error for createTask: code = ${err.code}` +
                `, message = "${err.message}"`);
        } else {
            const message = createTaskResponse.getMessage()
            alert(message)
            console.log(message)
        }
    });
}
function getAllTasksHandler() {

    tasksList.innerHTML = '';

    const stream = client.getAllTasks(new Empty(), {});
    stream.on('data', (task) => {
        const card = createCard(task);
        tasksList.appendChild(card);
    });

    stream.on('end', () => {
        console.log('Server has no more data')
    });

}
function editTaskHandler(newStatus) {

    const task = currentTask;
    const editTaskRequest = new EditTaskRequest();
    editTaskRequest.setTitle(task.getTitle());
    editTaskRequest.setStatus(getEnumFromValue(newStatus));

    client.editTask(editTaskRequest, {}, (err, editTaskResponse) => {
        if (err) {
            console.log(`Unexpected error for editTask: code = ${err.code}` +
                `, message = "${err.message}"`);
        } else {
            const message = editTaskResponse.getMessage();
            console.log(message)
        }
    });

}
function deleteTaskHandler() {

    const deleteTaskRequest = new DeleteTaskRequest();
    deleteTaskRequest.setTitle(currentTask.getTitle());

    client.deleteTask(deleteTaskRequest, {}, (err, deleteTaskResponse) => {
        if (err) {
            console.log(`Unexpected error for deleteTask: code = ${err.code}` +
                `, message = "${err.message}"`);
        } else {
            const message = deleteTaskResponse.getMessage();
            alert(message);
            console.log(message);
        }
    });
}

preload()


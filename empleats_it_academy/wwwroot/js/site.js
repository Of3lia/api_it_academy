const uri = 'api/employees';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addSurnameTextbox = document.getElementById('add-surname');
    const addJobTextbox = document.getElementById('add-job');
    const addSalaryTextbox = document.getElementById('add-salary');

    const item = {
        name: addNameTextbox.value.trim(),
        surname: addSurnameTextbox.value.trim(),
        job: addJobTextbox.value.trim(),
        salary: parseFloat(addSalaryTextbox.value)
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addSurnameTextbox.value = '';
            addJobTextbox.value = '';
          //  addSalaryTextbox.value = 0;
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-surname').value = item.surname;
    document.getElementById('edit-job').value = item.job;
    document.getElementById('edit-salary').value = item.salary;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('edit-name').value.trim(),
        surname: document.getElementById('edit-surname').value.trim(),
        job: document.getElementById('edit-job').value.trim(),
        salary: parseFloat(document.getElementById('edit-salary').value)
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let idTextNode = document.createTextNode(item.id);
        td1.appendChild(idTextNode);

        let td2 = tr.insertCell(1);
        let name = document.createTextNode(item.name);
        td2.appendChild(name);

        let td3 = tr.insertCell(2);
        let surname = document.createTextNode(item.surname);
        td3.appendChild(surname);

        let td4 = tr.insertCell(3);
        let job = document.createTextNode(item.job);
        td4.appendChild(job);

        let td5 = tr.insertCell(4);
        let salary = document.createTextNode(item.salary);
        td5.appendChild(salary);

        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);

        let td7 = tr.insertCell(6);
        td7.appendChild(deleteButton);
    });

    todos = data;
}
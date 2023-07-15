function getUserList() {
    let usersList = [];
    if (localStorage.getItem("usersList") !== null) {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }

    return usersList;
}

function showData() {
    const usersList = getUserList();

    let html = "";
    usersList.forEach((user, index) => {
        html += `
                <tr>
                    <td>${user.nombres}</td>
                    <td>${user.apellidos}</td>
                    <td>${user.edad}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="deleteData(${index})">Eliminar</button>
                        <button onclick="editData(${index})">Editar</button>
                    </td>
                </tr>
                `
    });
    document.querySelector('table tbody').innerHTML = html;
}

document.onload = showData()

function addData(event) {
    event.preventDefault();
    let nombres = document.querySelector('#nombres').value;
    let apellidos = document.querySelector('#apellidos').value;
    let edad = document.querySelector('#edad').value;
    let email = document.querySelector('#email').value;

    if (nombres === "" || apellidos === "" || edad === "" || email === "") return;

    const usersList = getUserList();

    usersList.push({ nombres, apellidos, edad, email })
    localStorage.setItem("usersList", JSON.stringify(usersList))
    showData()

    document.querySelector('#nombres').value = ""
    document.querySelector('#apellidos').value = ""
    document.querySelector('#edad').value = ""
    document.querySelector('#email').value = ""
}

function editData(index) {
    document.getElementById('add-btn').style.display = 'none';
    document.getElementById('edit-btn').style.display = 'block';

    const usersList = getUserList();


    document.querySelector('#nombres').value = usersList[index].nombres;
    document.querySelector('#apellidos').value = usersList[index].apellidos;
    document.querySelector('#edad').value = usersList[index].edad;
    document.querySelector('#email').value = usersList[index].email;

    document.getElementById('edit-btn').onclick = function () {
        usersList[index].nombres = document.querySelector('#nombres').value
        usersList[index].apellidos = document.querySelector('#apellidos').value
        usersList[index].edad = document.querySelector('#edad').value
        usersList[index].email = document.querySelector('#email').value

        localStorage.setItem("usersList", JSON.stringify(usersList));
        showData();

        document.querySelector('#nombres').value = ""
        document.querySelector('#apellidos').value = ""
        document.querySelector('#edad').value = ""
        document.querySelector('#email').value = ""

        document.getElementById('add-btn').style.display = 'block';
        document.getElementById('edit-btn').style.display = 'none';
    }
}

function deleteData(index) {
    const usersList = getUserList();
    usersList.splice(index);
    localStorage.setItem("usersList", JSON.stringify(usersList));
    showData();
}
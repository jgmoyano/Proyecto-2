function showData(){
    let usersList;
    if(localStorage.getItem("usersList") === null){
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    let html = "";
    usersList.forEach((user, index) => {
        html += `<li>${user.name} ${user.email}<button onclick="deleteData(${index})">Eliminar</button><button onclick="editData(${index})">Editar</button></li>`
    });
    document.querySelector('ul').innerHTML = html;
}

document.onload = showData()

function addData(event){
    event.preventDefault();
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;

    if (name === "" || email === "") return;

    let usersList;
    if(localStorage.getItem("usersList") === null){
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    usersList.push({name, email})
    localStorage.setItem("usersList", JSON.stringify(usersList))
    showData()

    document.querySelector('#name').value = ""
    document.querySelector('#email').value = ""
}

function editData(index){
    document.getElementById('add-btn').style.display = 'none';
    document.getElementById('edit-btn').style.display = 'block';

    let usersList;
    if(localStorage.getItem("usersList") === null){
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    document.querySelector('#name').value = usersList[index].name;
    document.querySelector('#email').value = usersList[index].email;

    document.getElementById('edit-btn').onclick = function (){
        usersList[index].name = document.querySelector('#name').value
        usersList[index].email = document.querySelector('#email').value

        localStorage.setItem("usersList", JSON.stringify(usersList));
        showData();
        document.querySelector('#name').value = ""
        document.querySelector('#email').value = ""

        document.getElementById('add-btn').style.display = 'block';
        document.getElementById('edit-btn').style.display = 'none';
    }
}
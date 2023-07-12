const userList = document.querySelector('.user-list');
const addUserForm = document.querySelector('.add-user-form');
const userName = document.getElementById('userName');
const pass = document.getElementById('passWord');
const email = document.getElementById('email');
const btnSubmit = document.querySelector('.btn');

let output = `
    <tr>
        <th scope="col">STT</th>
        <th scope="col">UserName</th>
        <th scope="col">Password</th>
        <th scope="col">Email</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
    </tr>`;

const url = 'http://localhost:3000/user';

//GET
const renderUser = (users) =>{
    users.forEach(user => {
        output += `
        <tr>
            <th scope="row" class="user-id">${user.id}</th>
            <td class"user-userName">${user.userName}</td>
            <td class="user-pass">${user.pass}</td>
            <td class="user-email">@${user.email}</td>
            <td data-id=${user.id}><button href="#" class="btn btn-success" id="edit-user">Edit</button></td>
            <td data-id=${user.id}><button href="#" class="btn btn-danger" id="delete-user">Delete</button></td>
        </tr>
        `
    });
    userList.innerHTML = output;
}

fetch(url)
    .then(res => res.json())
    .then(data=>renderUser(data))

// Create - Insert: POST
addUserForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(userName.value === '' || pass.value === '' || email.value === ''){
        alert('Không để trống các trường');
    }else{
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName.value,
                pass: pass.value,
                email: email.value
            })
        })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderUser(dataArr);
        })
        userName.value === '';
        pass.value === '';
        email.value === '';
    }
});

//Edit and Delete
userList.addEventListener('click', (e) => {
    e.preventDefault();
    let editBtn = e.target.id == 'edit-user';
    let delBtn = e.target.id == 'delete-user';

    //Edit
    if(editBtn){
        let idEdit = e.target.parentElement.dataset.id;
        fetch(`${url}/${idEdit}`,{
            method: 'GET',
        })
        .then(res => res.json())
        .then(data=>{
            userName.value = data.userName;
            pass.value = data.pass;
            email.value = data.email;
        })
    }
    btnSubmit.addEventListener('click', (e)=>{
        e.preventDefault()
        if(userName.value === '' || pass.value === '' || email.value === ''){
            alert('Không để trống các trường')
        }else{
            fetch(`${url}/${id}`,{
                method: 'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    userName: userName.value,
                    pass: pass.value,
                    email: email.value
                })
            })
            .then(res => res.json())
            .then(() => location.reload())
        }
    })
    //Delete
    let id = e.target.parentElement.dataset.id;
    if(delBtn){
        fetch(`${url}/${id}`,{
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(() => location.reload())
    }
})
const userList = document.querySelector('user-list');
let output = '';

const url = 'http://localhost:3000/user';

fetch(url)
    .then(res => res.json())
    .then(data=>{
        data.forEach(user => {
            output += `
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td><button type="submit" class="btn btn-primary">Edit</button></td>
                <td><button type="submit" class="btn btn-danger">Delete</button></td>
            </tr>
            `
        });
        userList.innerHTML = output;
    })
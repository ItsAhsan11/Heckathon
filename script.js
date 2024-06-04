// Array to store users
let users = [];

// Function to generate a unique ID
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to render the user table
function renderUserTable() {
    let tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = ''; 
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let row = tbody.insertRow();
        let emailCell = row.insertCell(0);
        let passwordCell = row.insertCell(1);
        let idCell = row.insertCell(2);
        let registrationDateCell = row.insertCell(3);
        let statusCell = row.insertCell(4);
        let titleCell = row.insertCell(5);
        let descriptionCell = row.insertCell(6);
        let actionsCell = row.insertCell(7);

        emailCell.textContent = user.email;
        passwordCell.textContent = user.password;
        idCell.textContent = user.id;
        registrationDateCell.textContent = user.registrationDate;
        statusCell.textContent = user.status;
        titleCell.textContent = user.title;
        descriptionCell.textContent = user.description;

        let updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = function() { updateUser(i); };
        actionsCell.appendChild(updateButton);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = function() { deleteUser(i); };
        actionsCell.appendChild(deleteButton);
    }
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let existingUser = users.find(function(user) { return user.email === email; });

    if (existingUser) {
        Toastify({
            text: "User already exists!",
            duration: 3000,
            gravity: "top",
            position: "left",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast();
        return;
    }

    if (password.length < 6) {
        Toastify({
            text: "Password must be at least 6 characters long!",
            duration: 3000,
            gravity: "top",
            position: "left",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast();
        return;
    }

    let newUser = {
        email: email,
        password: password,
        id: generateUniqueId(),
        registrationDate: new Date().toLocaleString(),
        status: 'Active',
        title: title,
        description: description
    };

    users.push(newUser);
    renderUserTable();
    document.getElementById('registerForm').reset(); 
    Toastify({
        text: "The user is successfully registered!",
        duration: 3000,
        gravity: "top",
        position: "left",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
});

document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('signInEmail').value;
    let password = document.getElementById('signInPassword').value;
    let user = users.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (user){
        document.getElementById('nav-content').innerText = 'Logged in as: ' + user.email;
        Toastify({
            text: "Welcome dear user",
            duration: 3000,
            gravity: "top",
            position: "left",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    } else {
        Toastify({
            text: "Invalid password or email",
            duration: 3000,
            gravity: "top",
            position: "left",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast();
    }
});

function updateUser(i) {
    let user = users[i];
    let newEmail = prompt('Enter new email:', user.email);
    let newPassword = prompt('Enter new password:', user.password);
    let newStatus = prompt('Enter new status:', user.status);
    let newTitle = prompt('Enter new title:', user.title);
    let newDescription = prompt('Enter new description:', user.description);

    if (newEmail && newPassword && newStatus && newTitle && newDescription) {
        users[i] = { ...user, email: newEmail, password: newPassword, status: newStatus, title: newTitle, description: newDescription };
        renderUserTable();
    } else {
        alert('All fields are required.');
    }
}

function deleteUser(i) {
    users.splice(i, 1); 
    renderUserTable();
}

function readUserDetails() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    alert('Email: ' + email + '\nPassword: ' + password + '\nTitle: ' + title + '\nDescription: ' + description);
}

let readButton = document.createElement('button');
readButton.type = 'button'; 
readButton.textContent = 'Read User Details';
readButton.onclick = readUserDetails;
document.getElementById('registerForm').appendChild(readButton);


renderUserTable();

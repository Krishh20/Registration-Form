function validateForm() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const dob = new Date(document.getElementById('dob').value);
    const checkbox = document.getElementById('checkbox').checked;

    // Check if fields are empty
    if (!username || !email || !password || !dob || !checkbox) {
        alert('Please fill out all fields correctly.');
        return false;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Date of birth validation
    const startDate = new Date('1967-11-09');
    const endDate = new Date('2004-11-09');
    if (dob < startDate || dob > endDate) {
        alert('Age must be between 18 to 55.');
        return false;
    }


    addToTable(username, email, password, dob.toLocaleDateString(), checkbox);


    document.getElementById('registrationForm').reset();

    return false;
}

function addToTable(name, email, password, dob, acceptedTerms) {
    const tableBody = document.getElementById('userData');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td class="border border-gray-800 p-2 text-white">${name}</td>
        <td class="border border-gray-800 p-2 text-white">${email}</td>
        <td class="border border-gray-800 p-2 text-white">${password}</td>
        <td class="border border-gray-800 p-2 text-white">${dob}</td>
        <td class="border border-gray-800 p-2 text-white">${acceptedTerms ? 'Yes' : 'No'}</td>
    `;

    tableBody.appendChild(row);


    storeInLocalStorage(name, email, password, dob, acceptedTerms);
}

function storeInLocalStorage(name, email, password, dob, acceptedTerms) {
    const userData = {
        name,
        email,
        password,
        dob,
        acceptedTerms
    };


    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];


    existingUsers.push(userData);


    localStorage.setItem('users', JSON.stringify(existingUsers));
}

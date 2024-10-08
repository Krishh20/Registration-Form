let userForm = document.getElementById("registrationForm");

const retieveEntries = () => {
    let entries = localStorage.getItem('userEntries');
    return entries ? JSON.parse(entries) : [];
};

const displayEntries = () => {
    let entries = retieveEntries();
    const tbleEntries = entries.map((entry) => {
        const name = `<td class='border border-gray-800 p-2 text-white'>${entry.FullName}</td>`;
        const email = `<td class='border border-gray-800 p-2 text-white'>${entry.email}</td>`;
        const password = `<td class='border border-gray-800 p-2 text-white'>${'*'.repeat(entry.password.length)}</td>`; // Hide password
        const dob = `<td class='border border-gray-800 p-2 text-white'>${entry.dob}</td>`;
        const acceptTerms = `<td class='border border-gray-800 p-2 text-white'>${entry.acceptTerms ? 'Yes' : 'No'}</td>`;
        return `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
    }).join('\n');

    const table = `<table class='table-auto w-full mt-4'>
        <tr>
            <th class='border border-gray-800 p-2 text-white'>Name</th>
            <th class='border border-gray-800 p-2 text-white'>Email</th>
            <th class='border border-gray-800 p-2 text-white'>Password</th>
            <th class='border border-gray-800 p-2 text-white'>Dob</th>
            <th class='border border-gray-800 p-2 text-white'>Accepted terms?</th>
        </tr>${tbleEntries}
    </table>`;

    let details = document.getElementById('user-entries');
    details.innerHTML = table;
};

const saveUserForm = (event) => {
    event.preventDefault();
    const FullName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;

    // Age validation
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const monthDiff = new Date().getMonth() - birthDate.getMonth();
    if (age < 18 || age > 55 || (age === 18 && monthDiff < 0) || (age === 55 && monthDiff > 0)) {
        document.getElementById('dob').style.border = '1px solid red';
        return alert("Age must be between 18 and 55");
    } else {
        document.getElementById('dob').style.border = 'none';

        const entry = {
            FullName,
            email,
            password,
            dob,
            acceptTerms
        };

        let userEntries = retieveEntries();
        userEntries.push(entry);
        localStorage.setItem("userEntries", JSON.stringify(userEntries));
        displayEntries();
        userForm.reset();
    }
};

userForm.addEventListener('submit', saveUserForm);
displayEntries();





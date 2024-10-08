let userForm = document.getElementById("registrationForm");
var userEntries=[];

let errors=[]
const retieveEntries = ()=>{
    let entries = localStorage.getItem('userEntries')
    if(entries){
        entries=JSON.parse(entries)
    }else{
        entries=[]
    }
    return entries
}
const displayEntries = ()=>{
let entries=retieveEntries()
const tbleEntries = entries.map((entry)=>{
const name = `<td class='border border-gray-800 p-2 text-white'>${entry.FullName}</td>`
const email = `<td class='border border-gray-800 p-2 text-white'>${entry.email}</td>`
const password = `<td class='border border-gray-800 p-2 text-white'>${entry.password}</td>`
const dob = `<td class='border border-gray-800 p-2 text-white'>${entry.dob}</td>`
const acceptTerms = `<td class='border border-gray-800 p-2 text-white'>${entry.acceptTerms}</td>`
const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`
return row

}).join('\n')
const table =` <table class='table-auto w-full'>
    <tr>
    <th class='border border-gray-800 p-2 '>Name </th>
    <th class='border border-gray-800 p-2'>Email </th>
    <th class='border border-gray-800 p-2 '>Password </th>
    <th class='border border-gray-800 p-2 '>Dob </th>
    <th class='border border-gray-800 p-2 '>Accepted terms? </th>
    </tr>${tbleEntries}
</table>`
let details = document.getElementById('user-entries')
details.innerHTML=table
}

const saveUserForm = (event)=>{
event.preventDefault();
const FullName = document.getElementById('name').value
const email = document.getElementById('email').value
const password = document.getElementById('password').value
const dob = document.getElementById('dob').value
const acceptTerms = document.getElementById('acceptTerms').checked
var currentYear = new Date().getFullYear();
var birthYear = dob.split("-");
let year=birthYear[0]
var age = currentYear-year
console.log({age,currentYear,birthYear})
if(age < 18 || age > 55){
    document.getElementById('dob').style='border:1px solid red'
  return  alert("Age must be between 18 and 55")

}else{
    document.getElementById('dob').style='border:none'

    const entry ={
        FullName,
        email,
        password,
        dob,
        acceptTerms
     }
     userEntries=retieveEntries()
     userEntries.push(entry);
     localStorage.setItem("userEntries",JSON.stringify(userEntries))
    displayEntries()
    registrationForm.reset()

}

}
registrationForm.addEventListener('submit',saveUserForm)
displayEntries()




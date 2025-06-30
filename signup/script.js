const data = [
    { name: "sam", pass: "1234" },
    { name: "admin", pass: "admin" }
];

// Helper function to handle form submission
function handleFormSubmit(e, formId) {
    e.preventDefault();
    
    // Clear previous error messages
    const existingError = document.querySelector(`#${formId} .error-message`);
    if (existingError) {
        existingError.remove();
    }
    
    // Get form values
    const username = document.getElementById(`name-${formId.split('-')[1]}`).value;
    const password = document.getElementById(`pass-${formId.split('-')[1]}`).value;
    
    // Find user
    const userFound = data.find(user => user.name === username);
    
    // Create error element
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    
    if (userFound) {
        if (userFound.pass === password) {
            alert(`Hello ${userFound.name}! Login successful.`);
            return;
        } else {
            errorElement.textContent = "Password is incorrect!";
        }
    } else {
        errorElement.textContent = "User does not exist!";
    }
    
    // Insert error message
    const form = document.getElementById(formId);
    const submitButton = form.querySelector('button[type="submit"]');
    form.insertBefore(errorElement, submitButton);
}

// Add event listeners to all forms
document.getElementById('login-classic').addEventListener('submit', (e) => handleFormSubmit(e, 'login-classic'));
document.getElementById('login-glass').addEventListener('submit', (e) => handleFormSubmit(e, 'login-glass'));
document.getElementById('login-dark').addEventListener('submit', (e) => handleFormSubmit(e, 'login-dark'));
document.getElementById('login-modern').addEventListener('submit', (e) => handleFormSubmit(e, 'login-modern'));

/* let data = [{name : "sam", pass : "1234"},{name : "admin", pass : "admin"}]

function onSubmit(e){
    e.preventDefault()
    let Uname = document.getElementById("name").value
    let Upass = document.getElementById("pass").value
    let userFound = data.find(user => user.name === Uname)
    const element = document.getElementById("login")
    const child = document.getElementById("button");
    const err = document.createElement("p")
    err.id = "errmsg"
    err.style.color = "red"
    if(userFound){
        console.log("user found", userFound)
        if(userFound.pass === Upass){
            console.log("user password correct, proceed to login")
            alert(`Hello ${userFound.name}`)
        }
        else{
            const node = document.createTextNode("Password is incorrect!!");
            err.appendChild(node);
            element.insertBefore(err, child);
        }
    }
    else{
        const node = document.createTextNode("User Does not exist");
        err.appendChild(node);
        element.insertBefore(err, child);
    }
    console.log(Uname)
} */
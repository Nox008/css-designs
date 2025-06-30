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

// Special behavior for Royal login
function handleRoyalSubmit(e) {
    e.preventDefault();
    
    const existingError = document.querySelector('#login-royal .error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const username = document.getElementById('name-royal').value;
    const password = document.getElementById('pass-royal').value;
    
    const userFound = data.find(user => user.name === username);
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    
    if (userFound) {
        if (userFound.pass === password) {
            alert(`Welcome to the palace, Your Majesty ${userFound.name}! 👑`);
            // Add royal sparkle effect
            createSparkles(document.querySelector('.login-card.royal'));
            return;
        } else {
            errorElement.textContent = "The royal guards deny entry! ⚔️";
        }
    } else {
        errorElement.textContent = "Unknown to the realm! 🏰";
    }
    
    const form = document.getElementById('login-royal');
    const submitButton = form.querySelector('button[type="submit"]');
    form.insertBefore(errorElement, submitButton);
}

// Special behavior for Neon Cyberpunk login
function handleNeonSubmit(e) {
    e.preventDefault();
    
    const existingError = document.querySelector('#login-neon .error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const username = document.getElementById('name-neon').value;
    const password = document.getElementById('pass-neon').value;
    
    // Add glitch effect during validation
    const card = document.querySelector('.login-card.neon');
    card.style.animation = 'neon-glitch 0.5s ease-in-out';
    
    setTimeout(() => {
        card.style.animation = 'neon-pulse 2s ease-in-out infinite alternate';
        
        const userFound = data.find(user => user.name === username);
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        
        if (userFound) {
            if (userFound.pass === password) {
                alert(`Access granted, ${userFound.name}. Welcome to the matrix. ⚡`);
                return;
            } else {
                errorElement.textContent = "ACCESS DENIED - Invalid credentials! 🚫";
            }
        } else {
            errorElement.textContent = "USER NOT FOUND in database! 💀";
        }
        
        const form = document.getElementById('login-neon');
        const submitButton = form.querySelector('button[type="submit"]');
        form.insertBefore(errorElement, submitButton);
    }, 500);
}

// Special behavior for Nature login
function handleNatureSubmit(e) {
    e.preventDefault();
    
    const existingError = document.querySelector('#login-nature .error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const username = document.getElementById('name-nature').value;
    const password = document.getElementById('pass-nature').value;
    
    const userFound = data.find(user => user.name === username);
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    
    if (userFound) {
        if (userFound.pass === password) {
            alert(`Welcome back to nature, ${userFound.name}! 🌿 The forest remembers you.`);
            // Add growing leaves effect
            createLeaves(document.querySelector('.login-card.nature'));
            return;
        } else {
            errorElement.textContent = "The trees whisper of wrong secrets! 🍃";
        }
    } else {
        errorElement.textContent = "Unknown to Mother Earth! 🌍";
    }
    
    const form = document.getElementById('login-nature');
    const submitButton = form.querySelector('button[type="submit"]');
    form.insertBefore(errorElement, submitButton);
}

// Special behavior for Cartoon login
function handleCartoonSubmit(e) {
    e.preventDefault();
    
    const existingError = document.querySelector('#login-cartoon .error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const username = document.getElementById('name-cartoon').value;
    const password = document.getElementById('pass-cartoon').value;
    
    // Add bounce effect
    const card = document.querySelector('.login-card.cartoon');
    card.style.animation = 'cartoon-bounce 0.6s ease';
    
    const userFound = data.find(user => user.name === username);
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    
    if (userFound) {
        if (userFound.pass === password) {
            alert(`Woohoo! ${userFound.name} is ready for adventure! 🎨✨`);
            return;
        } else {
            errorElement.textContent = "Oops! Wrong password, buddy! 😅";
        }
    } else {
        errorElement.textContent = "Who's that? New character unlocked? 🎭";
    }
    
    const form = document.getElementById('login-cartoon');
    const submitButton = form.querySelector('button[type="submit"]');
    form.insertBefore(errorElement, submitButton);
}

// Create sparkle effect for royal login
function createSparkles(container) {
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle-float 2s ease-out forwards';
        container.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 2000);
    }
}

// Create leaves effect for nature login
function createLeaves(container) {
    const leaves = ['🍃', '🌿', '🍀'];
    for (let i = 0; i < 8; i++) {
        const leaf = document.createElement('div');
        leaf.innerHTML = leaves[Math.floor(Math.random() * leaves.length)];
        leaf.style.position = 'absolute';
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.top = '100%';
        leaf.style.fontSize = Math.random() * 15 + 12 + 'px';
        leaf.style.pointerEvents = 'none';
        leaf.style.animation = 'leaf-rise 3s ease-out forwards';
        container.appendChild(leaf);
        
        setTimeout(() => leaf.remove(), 3000);
    }
}

// Add CSS animations for effects
const style = document.createElement('style');
style.textContent = `
    @keyframes neon-glitch {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-2px); }
        20% { transform: translateX(2px); }
        30% { transform: translateX(-1px); }
        40% { transform: translateX(1px); }
        50% { transform: translateX(-2px); }
        60% { transform: translateX(2px); }
        70% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
        90% { transform: translateX(-2px); }
    }
    
    @keyframes sparkle-float {
        0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0); 
        }
        50% { 
            opacity: 1; 
            transform: translateY(-10px) scale(1.2); 
        }
        100% { 
            opacity: 0; 
            transform: translateY(-40px) scale(0.8); 
        }
    }
    
    @keyframes leaf-rise {
        0% { 
            opacity: 0; 
            transform: translateY(0) rotate(0deg); 
        }
        50% { 
            opacity: 1; 
            transform: translateY(-30px) rotate(180deg); 
        }
        100% { 
            opacity: 0; 
            transform: translateY(-60px) rotate(360deg); 
        }
    }
`;
document.head.appendChild(style);

// Add event listeners to all forms
document.getElementById('login-classic').addEventListener('submit', (e) => handleFormSubmit(e, 'login-classic'));
document.getElementById('login-glass').addEventListener('submit', (e) => handleFormSubmit(e, 'login-glass'));
document.getElementById('login-dark').addEventListener('submit', (e) => handleFormSubmit(e, 'login-dark'));
document.getElementById('login-modern').addEventListener('submit', (e) => handleFormSubmit(e, 'login-modern'));

// Add special event listeners for new themed logins
document.getElementById('login-royal').addEventListener('submit', handleRoyalSubmit);
document.getElementById('login-neon').addEventListener('submit', handleNeonSubmit);
document.getElementById('login-nature').addEventListener('submit', handleNatureSubmit);
document.getElementById('login-cartoon').addEventListener('submit', handleCartoonSubmit);

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
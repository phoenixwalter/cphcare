let loggedIn = localStorage.getItem('?loggedIn');
if (loggedIn == "true"){
    document.getElementById("logIn-btn").classList.add("hide");
    document.getElementById("logOut-btn").classList.remove("hide");
    document.getElementById("username").innerHTML = localStorage.getItem('username');
}
else{
    document.getElementById("logIn-btn").classList.remove("hide");
    document.getElementById("logOut-btn").classList.add("hide");
    document.getElementById("username").innerHTML = '';
}
document.getElementById("logOut").addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('?loggedIn', "false");
    localStorage.setItem('username', undefined);
    window.location.href = window.location.href;
    location.reload();
    location.reload();
});

let chat = document.getElementById("message-container");
chat.scrollTop = chat.scrollHeight;

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
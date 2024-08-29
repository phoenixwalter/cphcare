// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFzGGFYMhhWVKIBxCtWbJWoRWMy8Eu3hk",
    authDomain: "cph-care-38cc7.firebaseapp.com",
    databaseURL: "https://cph-care-38cc7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cph-care-38cc7",
    storageBucket: "cph-care-38cc7.appspot.com",
    messagingSenderId: "139782131174",
    appId: "1:139782131174:web:8e8779d64facd572cbda27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Declaring Database & ref
const db = getDatabase();
const dbref = ref(db);

// ACCOUNT FORM
// Account validations
function validateSignUp(){
    if (validateName("sign-up") && validateEmail() && validatePassword("sign-up") && validatePasswordConfirm()){
        return true;
    }
}
function validateLogIn(){
    if (validateName("log-in") && validatePassword("log-in")){
        return true;
    }
}

function validateName(type){
    if (type === "sign-up"){
        const nameErr = document.getElementById("signUp-nameErr");
        const value = document.getElementById("signUp-name").value;
        const container = document.getElementById("signUp-name-c");
        if (value.length == " "){
            nameErr.innerHTML = "Username is required.";
            container.setAttribute("style", "margin-bottom: 40px!important;");
            return false;
        }
        if (value.length > 15){
            nameErr.innerHTML = "Username must be less than 15 charaters.";
            container.setAttribute("style", "margin-bottom: 40px!important;");
            return false;
        }
        if (value.length < 4){
            nameErr.innerHTML = "Username must be not less than 4 charaters.";
            container.setAttribute("style", "margin-bottom: 40px!important;");
            return false;
        }
        let checkUser;
        get(child(dbref, 'users/' + value)).then((snapshot)=>{
            if (snapshot.val() != null){
                nameErr.innerHTML = "Username already taken.";
                container.setAttribute("style", "margin-bottom: 40px!important;");
                return false;
            }
        })
        nameErr.innerHTML = "";
        container.setAttribute("style", "margin-bottom: 0;")
        return true;
    }
    else if (type === "log-in"){
        const nameErr = document.getElementById("logIn-nameErr");
        const value = document.getElementById("logIn-name").value;
        const container = document.getElementById("logIn-name-c");
        if (value.length == " "){
            nameErr.innerHTML = "Username is required.";
            container.setAttribute("style", "margin-bottom: 40px!important;");
            return false;
        }
        nameErr.innerHTML = "";
        container.setAttribute("style", "margin-bottom: 0;")
        return true;
    }
}
function validateEmail(){
    const emailErr = document.getElementById("signUp-emailErr");
    const value = document.getElementById("signUp-email").value;
    const container = document.getElementById("signUp-email-c");
    if (value.length == " "){
        emailErr.innerHTML = "Email is required";
        container.setAttribute("style", "margin-bottom: 40px!important;");
        return false;
    }
    if (!value.match(/^[A-Za-z\._0-9]*[@]{1}[@gmail.com]{9}/)){
        emailErr.innerHTML = "Email is invalid.";
        container.setAttribute("style", "margin-bottom: 40px!important;");
        return false;
    }
    get(child(dbref, 'emails')).then((snapshot)=>{
        let emails = snapshot.val();
        if (emails === null){
            emailErr.innerHTML = "";
            container.setAttribute("style", "margin-bottom: 0;");
            return true;
        }
        else{
            emails.forEach((email) => {
                if (email == value){
                    emailErr.innerHTML = "An account with this email already exists.";
                    container.setAttribute("style", "margin-bottom: 40px!important;");
                    return false;
                }
                emailErr.innerHTML = "";
                container.setAttribute("style", "margin-bottom: 0;")
                return true;
            });
        }
    });
    emailErr.innerHTML = "";
    container.setAttribute("style", "margin-bottom: 0;");
    return true;        
}
function validatePassword(type){
    if (type === "sign-up"){
        const passwordErr = document.getElementById("signUp-passwordErr");
        const value = document.getElementById("signUp-password").value;
        const container = document.getElementById("signUp-password-c");
        if (value.length == " "){
            passwordErr.innerHTML = "Password is required";
            container.setAttribute("style", "margin-bottom: 40px!important;");
            return false;
        }
        if (value.length < 6){
            passwordErr.innerHTML = "Password must be at least 8 characters."
            container.setAttribute("style", "margin-bottom: 40px!important;");
            return false;
        }
        passwordErr.innerHTML = "";
        container.setAttribute("style", "margin-bottom: 0;")
        return true;
    }
    else if (type === "log-in"){
        const passwordErr = document.getElementById("logIn-passwordErr");
        const value = document.getElementById("logIn-password").value;
        const container = document.getElementById("logIn-password-c");
        if (value.length == " "){
            passwordErr.innerHTML = "Password is required";
            container.setAttribute("style", "margin-bottom: 40px!important;");
            return false;
        }
        passwordErr.innerHTML = "";
        container.setAttribute("style", "margin-bottom: 0;")
        return true;
    }
}
function validatePasswordConfirm(){
    const passwordConfirmErr = document.getElementById("signUp-passwordConfirmErr");
    const value = document.getElementById("signUp-passwordConfirm").value;
    const password = document.getElementById("signUp-password").value;
    const container = document.getElementById("signUp-passwordConfirm-c");
    if (value.length == " "){
        passwordConfirmErr.innerHTML = "Password confirmation is required."
        container.setAttribute("style", "margin-bottom: 40px!important;");
        return false;
    }
    if (value !== password){
        passwordConfirmErr.innerHTML = "Password is not the same."
        container.setAttribute("style", "margin-bottom: 40px!important;");
        return false;
    }
    passwordConfirmErr.innerHTML = "";
    container.setAttribute("style", "margin-bottom: 0;")
    return true;
}
const signUpInputs = document.querySelectorAll(".signUp-input");
signUpInputs.forEach((input) => {
    input.addEventListener('change', validateSignUp)
});
const logInInputs = document.querySelectorAll(".logIn-input");
logInInputs.forEach((input) => {
    input.addEventListener('change', validateLogIn)
});

// Saving New Account Info in Database
document.getElementById("signUp").addEventListener('click', function(e){
    // checking if submission is vaild
    if (validateSignUp()){
        // saving data
        e.preventDefault();
        let signupName = document.getElementById("signUp-name").value;
        let signupEmail = document.getElementById("signUp-email").value;
        let signupPassword = document.getElementById("signUp-password").value;  
        set(ref(db, 'users/' + signupName),{
            username: signupName,
            email: signupEmail,
            password: signupPassword
        });
        get(child(dbref, 'emails')).then((snapshot)=>{
            let emails = snapshot.val();
            if (emails === null){
                set(ref(db, 'emails/'),[signupEmail]);
            }
            else{
                emails.push(signupEmail);
                set(ref(db, 'emails/'),emails);
            }
        });

        // changing account state
        localStorage.setItem('?loggedIn', "true");
        localStorage.setItem('username', signupName);
        window.alert("Sign up was successful!");
        setTimeout(() => window.location.reload(), 1000);
    }
})
document.getElementById("logIn").addEventListener('click', (e) => {
    e.preventDefault();
    let loginName = document.getElementById("logIn-name").value;
    if (validateLogIn()){
        const name = document.getElementById("logIn-name").value;
        const passwordInput = document.getElementById("logIn-password").value;
        const logInErr = document.getElementById("logIn-Err");
        get(child(dbref, 'users/' + name)).then((snapshot)=>{
            const data = snapshot.val();
            if (data === null){
                logInErr.style.display = "block";
                setTimeout(() => logInErr.style.display = "none", 3000);
                console.log("false");
                return false;
            }
            else if (data.password !== passwordInput){
                logInErr.style.display = "block";
                setTimeout(() => logInErr.style.display = "none", 3000);
                console.log("false");
                return false;
            }
            else{
                localStorage.setItem('?loggedIn', "true");
                localStorage.setItem('username', loginName);
                window.location.reload();
            }
        });    
    }
});

// Sending anonymous message from contact
if (document.getElementById("send-message-contact") !== null){
    document.getElementById("send-message-contact").addEventListener('click', (e)=>{
        e.preventDefault();
        let message = document.getElementById("message").value;
        let messageErr = document.getElementById("messageErr");
        let container = document.getElementById("message-c");
        if (message.length == " "){
            messageErr.innerHTML = "Message is required";
            container.setAttribute("style", "margin-bottom: 40px!important;");
            return false;
        }
        if (message.length < 25){
            messageErr.innerHTML = `Message must be at least 25 characters. ${25-message.length} more.`;
            container.setAttribute("style", "margin-bottom: 40px!important;");
            return false;
        }
        else{
            messageErr.innerHTML = "";
            container.setAttribute("style", "margin-bottom: 0px;");
            get(child(dbref, 'messages')).then((snapshot)=>{
                let messages = snapshot.val();
                if (messages === null){
                    set(ref(db, 'messages/'),[document.getElementById("message").value]);
                }
                else{
                    messages.push(document.getElementById("message").value);
                    set(ref(db, 'emails/'),messages);
                }
            });
            window.alert("Thank you for contacting us!")
            setTimeout(window.location.reload(), 1000);
        }
    });
}

// Managing messaeges
// sending messages
document.getElementById("send-message").addEventListener('click', (e) => {
    e.preventDefault();
    if (localStorage.getItem('?loggedIn') == "true"){
        const msgInput = document.getElementById("msg-input");
        if (msgInput.value != ''){
            get(child(dbref, 'users/' + localStorage.getItem('username'))).then((snapshot)=>{
                const msg = document.getElementById("msg-input").value;
                let userData = snapshot.val();
                if (userData.messages === undefined){
                    userData.messages = ['p' + msg];
                    set(ref(db, 'users/' + localStorage.getItem('username')),userData);
                }
                else{
                    userData.messages.push('p' + msg);
                    set(ref(db, 'users/' + localStorage.getItem('username')),userData);
                }
            });
            let chat = document.getElementById("message-container");
            chat.scrollTop = chat.scrollHeight;
            setTimeout(() => document.getElementById("msg-input").value = '', 3000);
            setTimeout(renderMessages, 3000);        
        }
    }
    // fix = update the whole user object
    else{
        document.getElementById("msg-alert").style.display = 'inline-block';
        setTimeout(() => document.getElementById("msg-alert").style.display = 'none', 3000);
    }
});
// rendering messages after sent
function renderMessages(){
    const msgContainer = document.getElementById("message-container");
    get(child(dbref, 'users/' + localStorage.getItem('username'))).then((snapshot)=>{
        const userData = snapshot.val();
        let msgCollection = userData.messages;
        if (msgCollection !== undefined){
            let msgString = ``;
            let msgIndex = 1;
            let msgClass = "";
            msgCollection.forEach(msg => {
                if(msgIndex <= 1){
                    msgClass = "mt-auto";
                }
                else{
                    msgClass = "";
                }
                if (msg.slice(0, 1) == 'p'){
                    msgString += `<li class="message-p ${msgClass}"><span>${msg.slice(1)}</span></li>`;
                }
                else{
                    msgString += `<li class="message-d ${msgClass}"><span>${msg}</span></li>`;
                }
                msgIndex++;
            });
            msgContainer.innerHTML = msgString;
        }
    });
}
// rendering messages on load
if (localStorage.getItem('?loggedIn') == "true"){
    setInterval(renderMessages, 100);
}

// saving data in database
if (localStorage.getItem('appointment-form') !== null){
    get(child(dbref, 'users/' + localStorage.getItem('username'))).then((snapshot)=>{
        let userData = snapshot.val();
        userData.appointment = JSON.parse(localStorage.getItem('appointment-form'));
        set(ref(db, 'users/' + localStorage.getItem('username')),userData);
        localStorage.removeItem('appointment-form');
    });
}
function updateLocalStorage(){
    if (localStorage.getItem("?loggedIn") == "true"){
        get(child(dbref, 'users/' + localStorage.getItem('username'))).then((snapshot)=>{
            let userData = snapshot.val();
            if (userData.appointment === undefined){
                localStorage.setItem('?haveAppointment', "false");
            }
            else{
                localStorage.setItem('?haveAppointment', "true");
                localStorage.setItem('apmtData', JSON.stringify(userData.appointment));
            }
        });
    }
    else{
        localStorage.setItem('?haveAppointment', "false");
    }    
}
setInterval(updateLocalStorage, 1000);
let chat = document.getElementById("message-container");
chat.scrollTop = chat.scrollHeight;

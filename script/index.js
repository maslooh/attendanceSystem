import { doesObjectExist, pushToLocalStorage } from "./generic.js"
import {redirect} from "./userIdentifier.js"
import { user } from "./opjectsFactory.js"
//==========================page elements====================================
let registerBtn = document.getElementById("register")
let signInBtn = document.getElementById("signin")
let userNameBox =document.getElementById("userName")
let passwordBox = document.getElementById("password")
let rememberUser = document.getElementById("remember")
let forgotBtn = document.getElementById("forgot")
let submitBtn = document.getElementById("submit")
let errorMsg = document.getElementById("error")
let form = document.forms[0]


//=============================events======================================
//check on remember me cookie to automaticaly login
window.addEventListener("load",function () {
    let cookie = window.localStorage.getItem("cookie")
    if (cookie != null) {
        //switch
        redirect(cookie, "Password")
    }
})

registerBtn.addEventListener("click", function () {
    window.location = "./register.html"
})

signInBtn.addEventListener("click", function () {
    window.location = "./index.html"
})

form.addEventListener("submit", function (e) {
    //************case of correct credentials***************
    e.preventDefault()
    if (doesObjectExist("users","Username",userNameBox.value) && doesObjectExist("users","Password",passwordBox.value))
    {
        if (rememberUser.checked)//set a cookie*********
        {
            window.localStorage.setItem("cookie", passwordBox.value)
        }
        window.localStorage.setItem("currentuser", userNameBox.value)
        redirect(userNameBox.value)
    }
    //************case of incorrect credentials***************
    else
    {
        errorMsg.innerText = `Wrong username or password.`
        errorMsg.style.visibility="visible"
    }
})
//=================================test============================
    // let admin = new user("ahmed", "admin", "address.value", "50", "admin@yahoo.com", "admin", "admin", "admin")
    // let security = new user("ahmed", "security", "address.value", "35", "security@yahoo.com", "security", "security","security")
    // let employee = new user("ahmed", "employee", "address.value", "26", "emp@yahoo.com","employee","employee")
    // pushToLocalStorage('users', admin)
    // pushToLocalStorage('users', security)
    // pushToLocalStorage('users', employee)
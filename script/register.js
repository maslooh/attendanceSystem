import { isnamevalid ,pushToLocalStorage ,doesObjectExist,registerationEmail} from "./generic.js"
import { confirmation } from "./opjectsFactory.js"
//===================page elements==================
let registerBtn = document.getElementById("register")
let signInBtn = document.getElementById("signin")
let firstName = document.getElementById("fname")
let lastName = document.getElementById("lname")
let email=document.getElementById("email")
let address = document.getElementById("address")
let age = document.getElementById("age")
let submitBtn = document.getElementById("submit")
let errorMsg = document.getElementById("error")
let form = document.forms[0]
//====================end of page elements============

//====================events================================================
registerBtn.addEventListener("click", function () {//redirect to register bage
    window.location = "./register.html"
    
})

signInBtn.addEventListener("click", function () {//redirect to login bage
    window.location="./index.html"
})

form.addEventListener("submit", function (e) {//validathion and submission
    e.preventDefault()
    if (isnamevalid(firstName.value) && isnamevalid(lastName.value)) {//valid input******
        errorMsg.style.visibility = "hidden"
        if(!(doesObjectExist('confirmation',"Email",email.value)||doesObjectExist('users',"Email",email.value))){//check if email already exists 
            let newRequist = new confirmation(firstName.value, lastName.value, address.value, age.value, email.value)
            pushToLocalStorage('confirmation', newRequist)
            registerationEmail(firstName.value, email.value)
            errorMsg.style.visibility="visible"
            errorMsg.innerText = `A rgisteration Email has been sent to you,
            please check your Email.`
        } else {
            errorMsg.style.visibility="visible"
            errorMsg.innerText = "Email already exists!"
        }
    } else {//invalid input********************
        errorMsg.style.visibility = "visible"
        errorMsg.innerText="Please enter valid data"
    }
})
//=======================end of events========================
//=======================functions============================



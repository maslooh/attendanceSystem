import {
    valueGetter, getIndex, sendEmail,
    generateRandom, pushToLocalStorage,deleteObj,logout
} from "./generic.js";
import { tableFromObject ,getLateReport,getExcuseReport} from "./reports.js";
import { user,userFromRequist,attendance2} from "./opjectsFactory.js";
//============================================================
let currentuser=window.localStorage.getItem('currentuser')
let contentContainer = document.getElementById("tableBox")
let logoutbtn = document.getElementById("logout")
let allempbtn = document.getElementById("all-employees")
let fullBtn = document.getElementById("full-report")
let lateBtn = document.getElementById("late-report")
let excuseBtn = document.getElementById("excuse-report")
let empBreifBtn = document.getElementById("employee-brief")
//============================================================

window.addEventListener("load", function () {
    //adding confirmation requists to admin page===================================
    let confirmList = JSON.parse(window.localStorage.getItem("confirmation"))
    for (let i in confirmList) {
        let confirmCard=`
        <div class="confirm">
            <h3 class="name">${confirmList[i]["Fname"]} ${confirmList[i]["Lname"]}</h3>
            <div class="address">${confirmList[i]["Address"]}</div>
            <div class="email">${confirmList[i]["Email"]}</div>
            <div class="age">${confirmList[i]["Age"]}</div>
            <input type="button" value="confirm" class="confirmbtn">
            <input type="button" value="deny" class="denybtn">
        </div>`
        $(".notifications").append(confirmCard)
        let confirm = document.getElementsByClassName("confirmbtn")
        let deny = document.getElementsByClassName("denybtn")
        confirm[i].addEventListener("click", confirmRequist)
        deny[i].addEventListener("click",denyReqist)
    }
//adding user name and title to the page===================================================
    let currentuser=window.localStorage.getItem("currentuser")
    let name = valueGetter(currentuser, "Username", "First Name", "users")
                +" "+ valueGetter(currentuser, "Username", "Last Name", "users")
    let title = valueGetter(currentuser, "Username", "Title", "users")
    $("#name").text(name)
    $("#title").text(title)
})//end of load event***************

logoutbtn.addEventListener("click",logout)

empBreifBtn.addEventListener('click', function () {
    document.getElementById("tableBox").innerHTML = ''
    let userlist = JSON.parse(window.localStorage.getItem("users"))
    let table = new tableFromObject(userlist,"Password","Username")
    table.appendHeader()
    table.appendTable(document.getElementById("tableBox"))
    table.appendData()
    table.addSorting()
})

allempbtn.addEventListener('click',function () {
    document.getElementById("tableBox").innerHTML = ''
    let userlist = JSON.parse(window.localStorage.getItem("users"))
    let table = new tableFromObject(userlist,"Email","Address","Password","Age","Title  ")
    table.appendHeader()
    table.appendTable(document.getElementById("tableBox"))
    table.appendData()
    table.addSorting()
})
fullBtn.addEventListener("click",function () {
    document.getElementById("tableBox").innerHTML = ''
    let attendanceList = JSON.parse(window.localStorage.getItem("attendance"))
    let table = new tableFromObject(attendanceList)
    table.appendHeader()
    table.appendTable(document.getElementById("tableBox"))
    table.appendData()
    table.addSorting()
})

lateBtn.addEventListener("click",function () {
    contentContainer.innerHTML = ``
    contentContainer.appendChild(getLateReport(currentuser))
})

excuseBtn.addEventListener("click",function () {
    contentContainer.innerHTML = ``
    contentContainer.appendChild(getExcuseReport(currentuser))
})
//=============================================================================
function confirmRequist () {
    let randomUsername = generateRandom(4, "@iti")
    let randomPassword = generateRandom(8)
    let requistEmail = $(this).siblings(".email").text()
    let requistIndex = getIndex(requistEmail, "Email", "confirmation")
    let requistList = JSON.parse(window.localStorage.getItem("confirmation"))
    let newUser = userFromRequist(requistList[requistIndex], randomUsername, randomPassword)
    deleteObj("confirmation",requistIndex)//deleting the requist from localstorage confirmation
    pushToLocalStorage("users", newUser)//adding the requist from localstorage users
    //sending confirmation email===========================================================
    let message = `user confirmed,your username:${randomUsername} & password:${randomPassword}`
    sendEmail($(this).siblings(".name").text(),requistEmail,message)
    $(this).parent().remove()
}

function denyReqist() {
    let requistEmail = $(this).siblings(".email").text()
    let requistIndex=getIndex(requistEmail,"Email","confirmation")
    deleteObj("confirmation", requistIndex)//deleting the requist from localstorage confirmation
    //sending denial email================================
    let message = `we are sorry,your registeration denied`
    sendEmail($(this).siblings(".name").text(),requistEmail,message)
    $(this).parent().remove()
}
//================================test==================================
    // let user1 = new attendance('test11')
    // let user2 = new attendance('test12')
    // let user3 = new attendance('test13')
    // let user4 = new attendance('test14')
    // let user5 = new attendance('test15')
    // let user6 = new attendance('test16')
    // let user7 = new attendance('test17')
    // pushToLocalStorage('attendance', user1)
    // pushToLocalStorage('attendance', user2)
    // pushToLocalStorage('attendance', user3)
    // pushToLocalStorage('attendance', user4)
    // pushToLocalStorage('attendance', user5)
    // pushToLocalStorage('attendance', user6)
    // pushToLocalStorage('attendance', user7)



import {
    valueGetter, getIndex, sendEmail,
    generateRandom, pushToLocalStorage,deleteObj,logout,doesObjectExist
} from "./generic.js";
import { tableFromObject,getDailyReport } from "./reports.js";
import { user,userFromRequist,attendance} from "./opjectsFactory.js";
//============================================================
let currentuser=window.localStorage.getItem('currentuser')
let logoutbtn = document.getElementById("logout")
let dailyReportBTn = document.getElementById("dailyReportBtn")
let monthlyReportBtn = document.getElementById("monthlyReportBtn")
let attendancePgBtn = document.getElementById("attendancePgBtn")
let contentContainer = document.getElementById("content")
let attendancePgContent =`<div id="errorMsg"></div>
                        <div>
                        <span>enter username:&nbsp;</span>
                        <input type="text" id="usernameBox">
                        </div>
                        <input type="button" value="confirm attendance" id="confirmBtn">`
//==================================event listeners==================================================
window.addEventListener("load", function () {
    setTimerToDeparture()
//adding user name and title to the page===================================================
    let currentuser=window.localStorage.getItem("currentuser")
    let name = valueGetter(currentuser, "Username", "First Name", "users")
                +" "+ valueGetter(currentuser, "Username", "Last Name", "users")
    let title = valueGetter(currentuser, "Username", "Title", "users")
    console.log(name)
    $("#name").text(name)
    $("#title").text(title)
})//end of load event***************

logoutbtn.addEventListener("click", logout)

attendancePgBtn.addEventListener("click", function () {
    contentContainer.innerHTML = attendancePgContent
    let confirmBtn = document.getElementById("confirmBtn")
    let usernameBox = document.getElementById("usernameBox")
    let errorMsg = document.getElementById("errorMsg")
    confirmBtn.addEventListener('click',attendanceProvider)
})

dailyReportBTn.addEventListener('click', function () {
    contentContainer.innerHTML = ``
    contentContainer.appendChild(getDailyReport(currentuser))
})
//=============================end of event listiners===================================================
/**this function checks if the user attendance has been entered today *///bad
function attendanceCheck(_username) {
    let today = new Date().toLocaleDateString()
    let attendanceList = JSON.parse(window.localStorage.getItem("attendance"))
    for (let i in attendanceList){
        if (attendanceList[i]["date"] == today && attendanceList[i]["attendance"] == _username)
            return true
    }
    return false
}

/**this function  adds departure time to the attendance object*///good
function addDeparture(_username) {
    let today = new Date().toLocaleDateString()
    let attendanceList = JSON.parse(window.localStorage.getItem("attendance"))
    for (let i in attendanceList) {
        if (attendanceList[i]["date"] == today && attendanceList[i]["Username"] == _username)
        {
            attendanceList[i]["departure"] =new Date().toLocaleTimeString()
            console.log(attendanceList[i]["departure"])
            window.localStorage.setItem("attendance",JSON.stringify(attendanceList))
        }
    }
}
/**this function adds attendance and departure after validating*/
function attendanceProvider() {
    let username = usernameBox.value
    if (doesObjectExist("users", 'Username', username)) {//check username correct or not
        if (attendanceCheck(username)) {//check if attendance for user is already input
            addDeparture(username)
            errorMsg.innerText = `departure confirmed.`
        } else {
            errorMsg.innerText = `attendance confirmed.`
            let userAttendance = new attendance(username)
            usernameBox.value = ''
            pushToLocalStorage("attendance", userAttendance)
        }
        
    } else {
        errorMsg.style.visibility = 'visible'
        errorMsg.innerText = `username is incorrect.`
    }
}

/**this function sets a timer untill 3.30pm 
 * then sets all unset departure time to 3.30pm even if it is past 3.30pm  */
function setTimerToDeparture() {
    if (getDepartureTime('15:30:00') <= 0)
        setDefaultDeparture('3:30:00 PM')
    else {
        setTimeout(setDefaultDeparture
            , getDepartureTime('15:30:00'));
    }
}

/** this function sets all unset departure time to a certain departure 
 * time in 12 format example(3:30:00 PM)*/ 
function setDefaultDeparture(departurTime='3:30:00 PM') {
        let today = new Date().toLocaleDateString()
        let attendanceList = JSON.parse(window.localStorage.getItem("attendance"))
        for (let i in attendanceList) {
            if (attendanceList[i]["departure"] =='--:--:--'&&attendanceList[i]["attendance"] !='--:--:--')
            {
                attendanceList[i]["departure"] =departurTime
                window.localStorage.setItem("attendance",JSON.stringify(attendanceList))
            }
        }
}
/**this function adds all absent employees at the end of the day */
function addAbsentEmp() {
    let attendanceList = JSON.parse(window.localStorage.getItem("attendance"))
    let employees = JSON.parse(window.localStorage.getItem("users"))
    let today = new Date().toLocaleDateString()
    employees.forEach(emp => {
        let flag=0
        attendanceList.forEach(att => {
            if (att.date == today && emp.Username == att.Username)
                flag=1
        });
        if (flag == 0)
        {
            let newAbsentEmb=
        }
    });
    
}
/**this function retuens milliseconds until a certain time (in 24 format)(hr:min:sec) */
function getDepartureTime(untill) {
    untill=untill.split(':')
    let now = new Date()
    let departureTime = new Date()
    departureTime.setHours(untill[0], untill[1], untill[2])
    return (departureTime-now)
}
// empBreifBtn.addEventListener('click', function () {
//     document.getElementById("content").innerHTML = ''
//     let userlist = JSON.parse(window.localStorage.getItem("users"))
//     let table = new tableFromObject(userlist,"Password","Username")
//     table.appendHeader()
//     table.appendTable(document.getElementById("content"))
//     table.appendData()
//     table.addSorting()
// })

// allempbtn.addEventListener('click',function () {
//     document.getElementById("content").innerHTML = ''
//     let userlist = JSON.parse(window.localStorage.getItem("users"))
//     let table = new tableFromObject(userlist,"Email","Address","Password","Age","Title  ")
//     table.appendHeader()
//     table.appendTable(document.getElementById("content"))
//     table.appendData()
//     table.addSorting()
// })
// fullBtn.addEventListener("click",function () {
//     document.getElementById("content").innerHTML = ''
//     let attendanceList = JSON.parse(window.localStorage.getItem("attendance"))
//     let table = new tableFromObject(attendanceList)
//     table.appendHeader()
//     table.appendTable(document.getElementById("content"))
//     table.appendData()
//     table.addSorting()
// })
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



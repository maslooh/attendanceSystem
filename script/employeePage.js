import {valueGetter, getIndex, sendEmail,generateRandom, pushToLocalStorage,deleteObj,logout,doesObjectExist,msToTime} from "./generic.js";
import { tableFromObject,getDailyReport,getMonthlyReport } from "./reports.js";
import { user,userFromRequist, attendance2} from "./opjectsFactory.js";
//============================================================
let currentuser=window.localStorage.getItem('currentuser')
let logoutbtn = document.getElementById("logout")
let dailyReportBTn = document.getElementById("dailyReportBtn")
let monthlyReportBtn = document.getElementById("monthlyReportBtn")
let contentContainer = document.getElementById("tableBox")
//==================================event listeners==================================================
window.addEventListener("load", function () {
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

dailyReportBTn.addEventListener('click', function () {
    contentContainer.innerHTML = ``
    contentContainer.appendChild(getDailyReport(currentuser))
})
monthlyReportBtn.addEventListener("click",function () {
    contentContainer.innerHTML = ``
    contentContainer.appendChild(getMonthlyReport(currentuser))
})
//=============================end of event listiners===================================================
